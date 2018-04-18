using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Reservations;

namespace tr3am.Data
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly List<Reservation> _items;
        private readonly IUsersRepository _usersRepository;
        private readonly IDevicesRepository _devicesRepository;

        public ReservationsRepository(IUsersRepository usersRepository, IDevicesRepository devicesRepository)
        {
            _usersRepository = usersRepository;
            _devicesRepository = devicesRepository;
            _items = new List<Reservation>();
        }
        public List<ReservationDTO> GetAll(bool showAll = false)
        {
            RefreshReservations();
            if (showAll)
            {
                return _items.Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }
            else
            {
                return _items.Where(x =>
                        x.Status == Status.CheckedIn && x.Status == Status.Pending && x.Status == Status.OverDue)
                    .Select(Mapper.Map<Reservation, ReservationDTO>)
                    .ToList();
            }
        }

        public List<ReservationDTO> GetByDeviceId(int id, bool showAll = false)
        {
            RefreshReservations();
            if (showAll)
            {
                return _items.Where(x => x.Id == id).Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }
            else
            {
                return _items
                    .Where(x => x.Id == id && (x.Status == Status.CheckedIn || x.Status == Status.OverDue ||
                                               x.Status == Status.Pending))
                    .Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }

        }

        public void Create(ReservationRequest request)
        {
            int id = _items.Any() ? _items.Max(x => x.Id) : 1;
            UserDTO userDto = _usersRepository.GetById(request.User);
            FullDeviceDTO deviceDto = _devicesRepository.GetById(request.Device);
            Reservation reservation = new Reservation
            {
                Id = id,
                User = Mapper.Map<UserDTO,User>(userDto),
                Status = request.Status,
                Device = Mapper.Map<FullDeviceDTO, Device>(deviceDto),
                From = request.From,
                To = request.To,
            };
        }

        public void Update(int id, ReservationRequest request)
        {
            Reservation reservation = _items.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                throw new InvalidReservationException();
            }

            reservation.User = Mapper.Map<UserDTO, User>(_usersRepository.GetById(request.User));
            reservation.Status = request.Status;
            reservation.Device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(request.Device));
            reservation.From = request.From;
            reservation.To = request.To;
        }

        public void Delete(int id)
        {
            Reservation reservation = _items.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                throw new InvalidReservationException();
            }
            else
            {
                _items.Remove(reservation);
            }
        }

        private void RefreshReservations()
        {
            DateTime now = DateTime.Now;
            TimeSpan fifteenMinutes = new TimeSpan(0, 15, 0);
            foreach(Reservation x in _items)
            {
                if (x.Status == Status.Pending)
                {
                    if (x.From - now >= fifteenMinutes)
                    {
                        
                        x.Status = Status.Expired;
                    }
                }
                else if (x.Status == Status.CheckedIn)
                {
                    if (x.To >= now)
                    {
                        x.Status = Status.OverDue;
                    }
                }
            }
        }
    }
}

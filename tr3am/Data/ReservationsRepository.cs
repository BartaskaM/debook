﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Enums;
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
            _items = new List<Reservation>
            {
                new Reservation()
                {
                    Id = 1,
                    Status = Status.Pending,
                    User = Mapper.Map<UserDTO,User>(_usersRepository.GetById(1)),
                    Device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(1)),
                    From = DateTime.UtcNow.AddHours(2),
                    To = DateTime.UtcNow.AddHours(3),
                },
                new Reservation()
                {
                    Id = 2,
                    Status = Status.Pending,
                    User = Mapper.Map<UserDTO,User>(_usersRepository.GetById(2)),
                    Device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(1)),
                    From = DateTime.UtcNow.AddHours(4),
                    To = DateTime.UtcNow.AddHours(5),
                },
                new Reservation()
                {
                    Id = 1,
                    Status = Status.Completed,
                    User = Mapper.Map<UserDTO,User>(_usersRepository.GetById(1)),
                    Device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(1)),
                    From = DateTime.UtcNow.Subtract(new TimeSpan(2, 0, 0)),
                    To = DateTime.UtcNow.Subtract(new TimeSpan(1, 0, 0)),
                }
            };
        }

        public ReservationDTO GetById(int id)
        {
            Reservation reservation = _items.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                throw new InvalidReservationException();
            }

            return Mapper.Map<Reservation, ReservationDTO>(reservation);
        }

        public List<ReservationDTO> GetAll(bool showAll)
        {
            RefreshReservations();
            if (showAll)
            {
                return _items.Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }
            else
            {
                return _items.Where(x =>
                        x.Status == Status.CheckedIn || x.Status == Status.Pending || x.Status == Status.OverDue)
                    .Select(Mapper.Map<Reservation, ReservationDTO>)
                    .ToList();
            }
        }

        public List<ReservationDTO> GetByDeviceId(int id, bool showAll)
        {
            RefreshReservations();
            if (showAll)
            {
                return _items.Where(x => x.Device.Id == id).Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }
            else
            {
                return _items
                    .Where(x => x.Device.Id == id && (x.Status == Status.CheckedIn || x.Status == Status.OverDue ||
                                               x.Status == Status.Pending))
                    .Select(Mapper.Map<Reservation, ReservationDTO>).ToList();
            }

        }

        public int Create(ReservationRequest request, bool booking)
        {
            int id = _items.Any() ? _items.Max(x => x.Id) + 1 : 1;
            Device device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(request.Device.Value));
            DateTime roundFrom = booking ? request.From : RoundTime(request.From);
            DateTime roundTo = RoundTime(request.To);
            CheckIfDateAvailable(request.From, request.To, device);
            UserDTO userDto = _usersRepository.GetById(request.User.Value);
            Reservation reservation = new Reservation
            {
                Id = id,
                User = Mapper.Map<UserDTO, User>(userDto),
                Status = request.Status,
                Device = device,
                From = roundFrom,
                To = roundTo,
            };
            _items.Add(reservation);
            return id;
        }

        public void Update(int id, ReservationRequest request)
        {
            Reservation reservation = _items.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                throw new InvalidReservationException();
            }

            Device device = Mapper.Map<FullDeviceDTO, Device>(_devicesRepository.GetById(request.Device.Value));
            CheckIfDateAvailable(request.From, request.To, device);
            reservation.User = Mapper.Map<UserDTO, User>(_usersRepository.GetById(request.User.Value));
            reservation.Status = request.Status;
            reservation.Device = device;
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
            DateTime now = DateTime.UtcNow;
            TimeSpan fifteenMinutes = new TimeSpan(0, 15, 0);
            foreach (Reservation x in _items)
            {
                if (x.Status == Status.Pending)
                {
                    var z = now - x.From;
                    if (now - x.From > fifteenMinutes)
                    {

                        x.Status = Status.Expired;
                    }
                }
                else if (x.Status == Status.CheckedIn)
                {
                    if (x.To <= now)
                    {
                        x.Status = Status.OverDue;
                    }
                }
            }
        }

        private DateTime RoundTime(DateTime date)
        {
            TimeSpan fifteenMinutes = new TimeSpan(0, 15, 0);
            return new DateTime((date.Ticks + fifteenMinutes.Ticks / 2) / fifteenMinutes.Ticks * fifteenMinutes.Ticks);
        }

        private void CheckIfDateAvailable(DateTime from, DateTime to, Device device)
        {
            DateTime now = DateTime.UtcNow;
            if (from.Add(TimeSpan.FromMinutes(1)) < now)
            {
                throw new PastDateException();
            }

            if (from > to)
            {
                throw new NegativeDateException();
            }
            var items = _items.Where(x => x.Device.Id == device.Id &&
                                          (x.Status == Status.CheckedIn || x.Status == Status.OverDue ||
                                           x.Status == Status.Pending));
            foreach (var reservation in items)
            {
                if (CheckIfDateIsWithinReservation(from, reservation) ||
                    CheckIfDateIsWithinReservation(to, reservation) ||
                    CheckIfReservationIsWithinDates(from, to, reservation))
                {
                    throw new UsedDateException();
                }
            }
        }
        private bool CheckIfDateIsWithinReservation(DateTime date, Reservation reservation)
        {
            TimeSpan fifteenMinutes = new TimeSpan(0, 15, 0);
            return reservation.To > date && (reservation.From - fifteenMinutes) < date;
        }
        private bool CheckIfReservationIsWithinDates(DateTime from, DateTime to, Reservation reservation)
        {
            return reservation.To < to && reservation.From > from;
        }
    }
}

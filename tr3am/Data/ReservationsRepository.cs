using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Reservations;

namespace tr3am.Data
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly List<Reservation> _items;

        public ReservationsRepository()
        {
            _items = new List<Reservation>();
        }
        public List<ReservationDTO> GetAll(bool showAll = false)
        {
            return _items.Where(x =>
                    x.Status == Status.CheckedIn && x.Status == Status.Pending && x.Status == Status.OverDue)
                .Select(x => new ReservationDTO
                {
                    Id = x.Id,
                })
                .ToList();
        }

        public ReservationDTO GetByDeviceId(int id)
        {
            throw new NotImplementedException();
        }

        public void Create(ReservationRequest request)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, ReservationRequest request)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}

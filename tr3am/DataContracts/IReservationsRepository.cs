using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Offices;
using tr3am.DataContracts.Requests.Reservations;

namespace tr3am.DataContracts
{
    public interface IReservationsRepository
    {
        List<ReservationDTO> GetAll(bool showAll);
        ReservationDTO GetByDeviceId(int id);
        void Create(ReservationRequest request);
        void Update(int id, ReservationRequest request);
        void Delete(int id);
    }
}

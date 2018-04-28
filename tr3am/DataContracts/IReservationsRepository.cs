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
        Task<IEnumerable<ReservationDto>> GetAll(bool showAll = false);
        Task<ReservationDto> GetById(int id);
        Task<IEnumerable<ReservationDto>> GetByDeviceId(int id, bool showAll = false);
        Task<int> Create(ReservationRequest request, bool booking);
        Task Update(int id, ReservationRequest request);
        Task Delete(int id);
    }
}

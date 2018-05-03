using System.Collections.Generic;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Events;

namespace tr3am.DataContracts
{
    public interface IEventsRepository
    {
        Task<IEnumerable<EventDto>> GetAll(int page, int pageSize);
        Task<EventDto> GetById(int id);
        Task<int> Create(EventItemRequest request);
        Task Update(int id, EventItemRequest request);
        Task Delete(int id);
    }
}
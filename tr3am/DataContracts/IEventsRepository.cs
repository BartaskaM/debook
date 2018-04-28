using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Events;

namespace tr3am.DataContracts
{
    public interface IEventsRepository
    {
        Task<IEnumerable<EventDto>> GetAll();
        Task<EventDto> GetById(int id);
        Task<int> Create(EventItemRequest request);
        Task Update(int id, EventItemRequest request);
        Task Delete(int id);
    }
}
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
        List<Event> GetAll();
        EventDTO GetById(int id);
        int Create(EventItemRequest request);
        void Update(int id, EventItemRequest request);
        void Delete(int id);
    }
}
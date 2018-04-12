using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.Requests.Events;

namespace tr3am.DataContracts
{
    interface IEventsRepository
    {
        List<EventItem> GetAll();
        EventItem GetById(int id);
        EventItem Create(EventsItemRequest request);
        void Update(int id, EventsItemRequest request);
        void Delete(int id);
    }
}

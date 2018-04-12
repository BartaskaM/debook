using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.DataContracts
{
    interface IEventsRepository
    {
        List<EventItem> GetAll();
        EventItem GetById(int id);
        EventItem Create(OfficeItemRequest request);
        void Update(int id, OfficeItemRequest request);
        void Delete(int id);
    }
}

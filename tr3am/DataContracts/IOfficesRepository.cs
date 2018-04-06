using System.Collections.Generic;
using tr3am.Data.Entities;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.DataContracts
{
    public interface IOfficesRepository
    {
        List<OfficeItem> GetAll ();
        OfficeItem GetById (int id);
        OfficeItem Create (OfficeItemRequest request);
        void Update (int id, OfficeItemRequest request);
        void Delete (int id);
    }
}

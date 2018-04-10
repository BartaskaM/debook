using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.DataContracts
{
    interface IDevicesRepository
    {
        List<SmallDeviceItem> GetAll();
        FullDeviceItem GetById(int id);
        FullDeviceItem Create(CreateDeviceItemRequest request);
        void Update(int id, UpdateDeviceItemRequest request);
        void Delete(int id);
    }
}

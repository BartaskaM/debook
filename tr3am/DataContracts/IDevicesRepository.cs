using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.DataContracts
{
    public interface IDevicesRepository
    {
        List<ShortDeviceDTO> GetAll();
        FullDeviceDTO GetById(int id);
        int? Create(CreateDeviceItemRequest request);
        string Update(int id, UpdateDeviceItemRequest request);
        void Delete(int id);
    }
}

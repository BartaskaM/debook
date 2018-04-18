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
        void Create(CreateDeviceRequest request);
        void Update(int id, UpdateDeviceRequest request);
        void Delete(int id);
    }
}

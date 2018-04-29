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
        Task<IEnumerable<ShortDeviceDTO>> GetAll();
        Task<FullDeviceDTO> GetById(int id);
        Task<int> Create(CreateDeviceRequest request);
        Task Update(int id, UpdateDeviceRequest request);
        Task Delete(int id);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.DataContracts
{
    public interface IDevicesRepository
    {
        Task<IEnumerable<ShortDeviceDto>> GetAll(int userId);
        Task<FullDeviceDto> GetById(int id, int userId);
        Task<int> Create(CreateDeviceRequest request);
        Task Update(int id, UpdateDeviceRequest request);
        Task Delete(int id);
    }
}

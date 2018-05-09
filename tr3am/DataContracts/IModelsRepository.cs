using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Models;

namespace tr3am.DataContracts
{
    public interface IModelsRepository
    {
        Task<IEnumerable<ModelDto>> GetAll();
        Task<ModelDto> GetById(int id);
        Task<int> Create(ModelItemRequest request);
        Task Update(int id, ModelItemRequest request);
        Task Delete(int id);
    }
}

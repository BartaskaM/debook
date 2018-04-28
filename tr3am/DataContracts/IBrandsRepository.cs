using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Brands;

namespace tr3am.DataContracts
{
    public interface IBrandsRepository
    {
        Task<IEnumerable<BrandDto>> GetAll();
        Task<BrandDto> GetById(int id);
        Task<int> Create(BrandItemRequest request);
        Task Update(int id, BrandItemRequest request);
        Task Delete(int id);
    }
}

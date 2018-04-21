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
        List<BrandDTO> GetAll();
        BrandDTO GetById(int id);
        int Create(BrandItemRequest request);
        void Update(int id, BrandItemRequest request);
        void Delete(int id);
    }
}

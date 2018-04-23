﻿using System.Collections.Generic;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.DataContracts
{
    public interface IOfficesRepository
    {
        Task<List<OfficeDTO>> GetAll();
        Task<OfficeDTO> GetById(int id);
        Task<int> Create(OfficeItemRequest request);
        Task Update(int id, OfficeItemRequest request);
        Task Delete(int id);
    }
}

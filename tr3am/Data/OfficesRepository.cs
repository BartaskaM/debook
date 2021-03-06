﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.Data
{
    public class OfficesRepository : IOfficesRepository
    {
        private readonly AppDbContext _dbContext;

        public OfficesRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<OfficeDto>> GetAll()
        {
            return await _dbContext.Offices
                .AsNoTracking()
                .Select(x => Mapper.Map<Office, OfficeDto>(x))
                .ToListAsync();
        }

        public async Task<OfficeDto> GetById(int id)
        {
            var item = await _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            return Mapper.Map<Office, OfficeDto>(item);
        }

        public async Task<int> Create(OfficeItemRequest request)
        {
            var newItem = new Office
            {
                Country = request.Country,
                City = request.City,
                Address = request.Address,
                Lat = request.Lat,
                Lng = request.Lng,
            };

            if (await OfficeExists(newItem))
            {
                throw new DuplicateOfficeException();
            }

            _dbContext.Offices.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task<bool> OfficeExists(Office office)
        {
            var item = await _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x =>
                x.Country == office.Country &&
                x.City == office.City &&
                x.Address == office.Address);

            if (item != null)
            {
                return true;
            }

            return false;
        }

        public async Task Update(int id, OfficeItemRequest request)
        {
            var item = await _dbContext.Offices.
                FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            item.Country = request.Country;
            item.City = request.City;
            item.Address = request.Address;
            item.Lat = request.Lat;
            item.Lng = request.Lng;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _dbContext.Offices
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
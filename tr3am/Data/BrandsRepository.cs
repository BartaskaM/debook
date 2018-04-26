using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Brands;

namespace tr3am.Data
{
    public class BrandsRepository : IBrandsRepository
    {
        private readonly AppDbContext _dbContext;

        public BrandsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<BrandDTO>> GetAll()
        {
            return await _dbContext.Brands
                .Include(x => x.Models)
                .Select(x => Mapper.Map<Brand, BrandDTO>(x))
                .ToListAsync();
        }

        public async Task<BrandDTO> GetById(int id)
        {
            var item = await _dbContext.Brands
                .Include(x => x.Models)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            return Mapper.Map<Brand, BrandDTO>(item);
        }

        public async Task<int> Create(BrandItemRequest request)
        {
            var newItem = new Brand
            {
                BrandName = request.BrandName,
                Image = request.Image,
            };

            if (await BrandExists(newItem))
            {
                throw new DuplicateBrandException();
            }

            _dbContext.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task<bool> BrandExists(Brand brand)
        {
            var result = await _dbContext.Brands
                .FirstOrDefaultAsync(x => 
                x.BrandName == brand.BrandName ||
                x.Image == brand.Image);

            if (result != null)
            {
                return true;
            }

            return false;
        }

        public async Task Update(int id, BrandItemRequest request)
        {
            var item = await _dbContext.Brands
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            item.BrandName = request.BrandName;
            item.Image = request.Image;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = _dbContext.Brands
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidBrandException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }

    }
}

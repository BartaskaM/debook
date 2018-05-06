using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Models;

namespace tr3am.Data
{
    public class ModelsRepository : IModelsRepository
    {
        private readonly AppDbContext _dbContext;

        public ModelsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ModelDto>> GetAll()
        {
            return await _dbContext.Models
                .AsNoTracking()
                .Include(x => x.Brand)
                .Select(x => Mapper.Map<Model, ModelDto>(x))
                .ToListAsync();
        }

        public async Task<ModelDto> GetById(int id)
        {
            var item = await _dbContext.Models
                .AsNoTracking()
                .Include(x => x.Brand)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidModelException();
            }

            return Mapper.Map<Model, ModelDto>(item);
        }

        public async Task<int> Create(ModelItemRequest request)
        {
            var brand = _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);

            await Task.WhenAll(brand);
            if (brand.Result == null)
            {
                throw new InvalidBrandException();
            }

            var newItem = new Model
            {
                BrandId = brand.Result.Id,
                Name = request.Name,
            };
            if (await ModelExists(newItem))
            {
                throw new DuplicateModelException();
            }
            _dbContext.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, ModelItemRequest request)
        {
            var item = await _dbContext.Models
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidModelException();
            }

            var brand = _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);

            await Task.WhenAll(brand);
            if (brand.Result == null)
            {
                throw new InvalidBrandException();
            }

            item.BrandId = brand.Result.Id;
            item.Name = request.Name;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _dbContext.Models
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidModelException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> ModelExists(Model model)
        {
            var item = await _dbContext.Models
                .AsNoTracking()
                .FirstOrDefaultAsync(x =>
                x.Name == model.Name &&
                x.BrandId == model.BrandId);

            if (item != null)
            {
                return true;
            }

            return false;
        }
    }
}

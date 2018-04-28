﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Data
{
    public class DevicesRepository : IDevicesRepository
    {
        private readonly AppDbContext _dbContext;

        public DevicesRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ShortDeviceDto>> GetAll(int userId)
        {
            return await _dbContext.Devices
                .AsNoTracking()
                .Include(x => x.Office)
                .Include(x => x.User)
                .Include(x => x.Brand)
                .Include(x => x.Model)
                .Include(x => x.Reservations)
                .Where(x => x.Active)
                .Select(x => Mapper.Map<Device, ShortDeviceDto>(x, opt => opt.Items.Add("UserId", userId)))
                .ToListAsync();
        }

        public async Task<FullDeviceDto> GetById(int id)
        {
            var item = await _dbContext.Devices
                .AsNoTracking()
                .Include(x => x.Office)
                .Include(x => x.User)
                .Include(x => x.Brand)
                .Include(x => x.Model)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidDeviceException();
            }

            return Mapper.Map<Device, FullDeviceDto>(item);
        }

        public async Task<int> Create(CreateDeviceRequest request)
        {
            var office = _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);

            var brand = _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);

            var model = _dbContext.Models
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.ModelId);

            await Task.WhenAll(new Task[] { office, brand, model });
            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }
            if (brand.Result == null)
            {
                throw new InvalidBrandException();
            }
            if (model.Result == null)
            {
                throw new InvalidModelException();
            }

            var newItem = new Device
            {
                BrandId = brand.Result.Id,
                ModelId = model.Result.Id,
                Available = true,
                Active = true,
                Image = request.Image,
                Name = request.Name,
                UserId = null,
                IdentificationNum = request.IdentificationNum.Value,
                SerialNum = request.SerialNum,
                OS = request.OS,
                Description = request.Description,
                Purchased = request.Purchased,
                Vendor = request.Vendor,
                TaxRate = request.TaxRate,
                OfficeId = office.Result.Id,
            };

            _dbContext.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, UpdateDeviceRequest request)
        {
            var item = await _dbContext.Devices
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidDeviceException();
            }

            User user = null;
            if (request.UserId != null)
            {
                user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
                if (user == null)
                {
                    throw new InvalidUserException();
                }
            }

            var office = _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);

            var brand = _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);

            var model = _dbContext.Models
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.ModelId);

            await Task.WhenAll(new Task[] { office, brand, model });
            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }
            if (brand.Result == null)
            {
                throw new InvalidBrandException();
            }
            if (model.Result == null)
            {
                throw new InvalidModelException();
            }

            item.BrandId = brand.Result.Id;
            item.ModelId = model.Result.Id;
            item.Available = request.Available;
            item.Active = request.Active;
            item.Image = request.Image;
            item.Name = request.Name;
            item.UserId = user?.Id; // user != null ? user.Id : null (Auto VS offer/fix)
            item.IdentificationNum = request.IdentificationNum;
            item.SerialNum = request.SerialNum;
            item.OS = request.OS;
            item.Description = request.Description;
            item.Purchased = request.Purchased;
            item.Vendor = request.Vendor;
            item.TaxRate = request.TaxRate;
            item.OfficeId = office.Result.Id;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _dbContext.Devices
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidDeviceException();
            }

            item.Active = false;
        }
    }
}

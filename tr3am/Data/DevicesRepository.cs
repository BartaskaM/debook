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

        public async Task<IEnumerable<ShortDeviceDTO>> GetAll()
        {
            return await _dbContext.Devices
                .AsNoTracking()
                .Include(x => x.Office)
                .Include(x => x.User)
                .Include(x => x.Brand)
                .Include(x => x.Model)
                .Where(x => x.Active)
                .Select(x => Mapper.Map<Device, ShortDeviceDTO>(x)).ToListAsync();
        }

        public async Task<FullDeviceDTO> GetById(int id)
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

            return Mapper.Map<Device, FullDeviceDTO>(item);
        }

        public async Task<int> Create(CreateDeviceRequest request)
        {
            var office = await _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            var brand = await _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);
            if (brand == null)
            {
                throw new InvalidBrandException();
            }

            var model = await _dbContext.Models
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.ModelId);
            if (model == null)
            {
                throw new InvalidModelException();
            }

            var newItem = new Device
            {
                BrandId = brand.Id,
                ModelId = model.Id,
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
                OfficeId = office.Id,
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

            var office = await _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            var brand = await _dbContext.Brands
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.BrandId);
            if (brand == null)
            {
                throw new InvalidBrandException();
            }

            var model = await _dbContext.Models
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.ModelId);
            if (model == null)
            {
                throw new InvalidModelException();
            }

            item.BrandId = brand.Id;
            item.ModelId = model.Id;
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
            item.OfficeId = office.Id;

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

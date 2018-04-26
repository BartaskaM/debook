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
using tr3am.DataContracts.Requests.Events;


namespace tr3am.Data
{
    public class EventsRepository : IEventsRepository
    {
        private readonly AppDbContext _dbContext;

        public EventsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<EventDTO>> GetAll()
        {
            return await _dbContext.Events
                .Select(x => Mapper.Map<Event,EventDTO>(x))
                .ToListAsync();
        }

        public async Task<EventDTO> GetById(int id)
        {
            var item = await _dbContext.Events
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidEventException();
            }

            return Mapper.Map<Event, EventDTO>(item);
        }

        public async Task<int> Create(EventItemRequest request)
        {
            var office = await _dbContext.Offices
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            var device = await _dbContext.Devices
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);
            if (device == null)
            {
                throw new InvalidDeviceException();
            }
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
            if (user == null)
            {
                throw new InvalidUserException();
            }

            var newItem = new Event
            {
                Action = request.Action,
                DeviceId = device.Id,
                OfficeId = office.Id,
                UserId = user.Id,
                CreatedOn = request.Date_time,
            };

            _dbContext.Events.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, EventItemRequest request)
        {
            var item = await _dbContext.Events
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidEventException();
            }

            var office = await _dbContext.Offices
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            var device = await _dbContext.Devices
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);
            if (device == null)
            {
                throw new InvalidDeviceException();
            }
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
            if (user == null)
            {
                throw new InvalidUserException();
            }

            item.Action = request.Action;
            item.DeviceId = device.Id;
            item.OfficeId = office.Id;
            item.UserId = user.Id;
            item.CreatedOn = request.Date_time;

            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _dbContext.Events
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidEventException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
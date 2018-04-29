using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<EventDto>> GetAll()
        {
            return await _dbContext.Events
                .AsNoTracking()
                .Include(x => x.Office)
                .Include(x => x.User)
                .Include(x => x.Device)
                .Select(x => Mapper.Map<Event, EventDto>(x))
                .ToListAsync();
        }

        public async Task<EventDto> GetById(int id)
        {
            var item = await _dbContext.Events
                .AsNoTracking()
                .Include(x => x.Office)
                .Include(x => x.User)
                .Include(x => x.Device)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidEventException();
            }

            return Mapper.Map<Event, EventDto>(item);
        }

        public async Task<int> Create(EventItemRequest request)
        {
            var office = _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);

            var device = _dbContext.Devices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);
            

            var user = _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);

            await Task.WhenAll(office, device, user);
            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }
            if (device.Result == null)
            {
                throw new InvalidDeviceException();
            }
            if (user.Result == null)
            {
                throw new InvalidUserException();
            }

            var newItem = new Event
            {
                Action = request.Action,
                DeviceId = device.Result.Id,
                OfficeId = office.Result.Id,
                UserId = user.Result.Id,
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

            var office = _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);

            var device = _dbContext.Devices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);


            var user = _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);

            await Task.WhenAll(office, device, user);
            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }
            if (device.Result == null)
            {
                throw new InvalidDeviceException();
            }
            if (user.Result == null)
            {
                throw new InvalidUserException();
            }

            item.Action = request.Action;
            item.DeviceId = device.Result.Id;
            item.OfficeId = office.Result.Id;
            item.UserId = user.Result.Id;
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
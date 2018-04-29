using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using static tr3am.DataContracts.Constants.Time;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Enums;
using tr3am.DataContracts.Requests.Reservations;
using Microsoft.EntityFrameworkCore;

namespace tr3am.Data
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly AppDbContext _dbContext;

        public ReservationsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ReservationDto>> GetAll(bool showAll)
        {
            await RefreshReservations();

            if (showAll)
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Include(x => x.User)
                    .Select(x => Mapper.Map<Reservation, ReservationDto>(x))
                    .ToListAsync();
            }
            else
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Include(x => x.User)
                    .Where(x =>
                        x.Status == Status.CheckedIn || x.Status == Status.Pending || x.Status == Status.OverDue)
                    .Select(x => Mapper.Map<Reservation, ReservationDto>(x))
                    .ToListAsync();
            }
        }

        public async Task<ReservationDto> GetById(int id)
        {
            await RefreshReservations();

            var item = await _dbContext.Reservations
                .AsNoTracking()
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidReservationException();
            }

            return Mapper.Map<Reservation, ReservationDto>(item);
        }

        public async Task<IEnumerable<ReservationDto>> GetByDeviceId(int id, bool showAll)
        {
            await RefreshReservations();

            if (showAll)
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Include(x => x.User)
                    .Where(x => x.Device.Id == id)
                    .Select(x => Mapper.Map<Reservation, ReservationDto>(x))
                    .ToListAsync();
            }
            else
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Include(x => x.User)
                    .Where(x => x.Device.Id == id && (x.Status == Status.CheckedIn || x.Status == Status.OverDue ||
                                               x.Status == Status.Pending))
                    .Select(x => Mapper.Map<Reservation, ReservationDto>(x))
                    .ToListAsync();
            }

        }

        public async Task<int> Create(ReservationRequest request, bool booking)
        {
            var device = _dbContext.Devices
               .FirstOrDefaultAsync(x => x.Id == request.DeviceId);


            var user = _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);

            await Task.WhenAll(device, user);
            if (device.Result == null)
            {
                throw new InvalidDeviceException();
            }
            if (user.Result == null)
            {
                throw new InvalidUserException();
            }

            DateTime roundFrom = booking ? request.From : RoundTime(request.From);
            DateTime roundTo = RoundTime(request.To);

            await CheckIfDateAvailable(request.From, request.To, device.Result);

            var newItem = new Reservation
            {
                UserId = user.Result.Id,
                Status = request.Status,
                DeviceId = device.Result.Id,
                From = roundFrom,
                To = roundTo,
            };

            _dbContext.Reservations.Add(newItem);
            if (booking)
            {
                device.Result.Available = false;
                device.Result.UserId = request.UserId;
            }
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, ReservationUpdateRequest request)
        {
            var item = await _dbContext.Reservations
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidReservationException();
            }

            var office = _dbContext.Offices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.OfficeId);

            var device = _dbContext.Devices
               .FirstOrDefaultAsync(x => x.Id == request.DeviceId);

            var user = _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);

            await Task.WhenAll(device, user, office);

            if (device.Result == null)
            {
                throw new InvalidDeviceException();
            }

            if (user.Result == null)
            {
                throw new InvalidUserException();
            }

            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }

            item.Status = request.Status;
            item.DeviceId = device.Result.Id;
            item.UserId = user.Result.Id;
            item.From = request.From;
            item.To = request.To;
            if (request.Status == Status.Completed)
            {
                device.Result.UserId = null;
                device.Result.Available = true;
                device.Result.OfficeId = request.OfficeId;
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = await _dbContext.Reservations
               .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidReservationException();
            }

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }

        private async Task RefreshReservations()
        {
            DateTime now = DateTime.UtcNow;

            await _dbContext.Reservations.ForEachAsync(x =>
            {
                if (x.Status == Status.Pending)
                {
                    var z = now - x.From;
                    if (now - x.From > FifteenMinutes)
                    {
                        x.Status = Status.Expired;
                    }
                }
                else if (x.Status == Status.CheckedIn)
                {
                    if (x.To <= now)
                    {
                        x.Status = Status.OverDue;
                    }
                }
            });
        }

        private DateTime RoundTime(DateTime date)
        {
            return new DateTime((date.Ticks + FifteenMinutes.Ticks - 1) / FifteenMinutes.Ticks * FifteenMinutes.Ticks, date.Kind);
        }

        private async Task CheckIfDateAvailable(DateTime from, DateTime to, Device device)
        {
            DateTime now = DateTime.UtcNow;

            if (from.Add(TimeSpan.FromMinutes(1)) < now)
            {
                throw new PastDateException();
            }

            if (from > to)
            {
                throw new NegativeDateException();
            }

            var conflictingReservationsCount = await _dbContext.Reservations
                .CountAsync(x => x.Device.Id == device.Id &&
                            (x.Status == Status.CheckedIn || x.Status == Status.OverDue
                                                          || x.Status == Status.Pending) &&
                            (CheckIfDateIsWithinReservation(from, x)
                             || CheckIfDateIsWithinReservation(to, x)
                             || CheckIfReservationIsWithinDates(from, to, x))
                );
            if (conflictingReservationsCount > 0)
            {
                throw new UsedDateException();
            }

        }
        private bool CheckIfDateIsWithinReservation(DateTime date, Reservation reservation)
        {
            return reservation.To > date && (reservation.From - FifteenMinutes) < date;
        }
        private bool CheckIfReservationIsWithinDates(DateTime from, DateTime to, Reservation reservation)
        {
            return reservation.To < to && reservation.From > from;
        }
    }
}

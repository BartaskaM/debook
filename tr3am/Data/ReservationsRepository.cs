﻿using System;
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

        public async Task<IEnumerable<ReservationDTO>> GetAll(bool showAll)
        {
            await RefreshReservations();

            if (showAll)
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Include(x => x.User)
                    .Include(x => x.Device)
                    .Select(x => Mapper.Map<Reservation, ReservationDTO>(x))
                    .ToListAsync();
            }
            else
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Where(x =>
                        x.Status == Status.CheckedIn || x.Status == Status.Pending || x.Status == Status.OverDue)
                    .Select(x => Mapper.Map<Reservation, ReservationDTO>(x))
                    .ToListAsync();
            }
        }

        public async Task<ReservationDTO> GetById(int id)
        {
            await RefreshReservations();

            var item = await _dbContext.Reservations
                .AsNoTracking()
                .Include(x => x.User)
                .Include(x => x.Device)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidReservationException();
            }

            return Mapper.Map<Reservation, ReservationDTO>(item);
        }

        public async Task<IEnumerable<ReservationDTO>> GetByDeviceId(int id, bool showAll)
        {
            await RefreshReservations();

            if (showAll)
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Where(x => x.Device.Id == id)
                    .Select(x => Mapper.Map<Reservation, ReservationDTO>(x))
                    .ToListAsync();
            }
            else
            {
                return await _dbContext.Reservations
                    .AsNoTracking()
                    .Where(x => x.Device.Id == id && (x.Status == Status.CheckedIn || x.Status == Status.OverDue ||
                                               x.Status == Status.Pending))
                    .Select(x => Mapper.Map<Reservation, ReservationDTO>(x))
                    .ToListAsync();
            }

        }

        public async Task<int> Create(ReservationRequest request, bool booking)
        {
            var device = await _dbContext.Devices
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);
            if (device == null)
            {
                throw new InvalidDeviceException();
            }

            var user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
            if (user == null)
            {
                throw new InvalidUserException();
            }

            DateTime roundFrom = booking ? request.From : RoundTime(request.From);
            DateTime roundTo = RoundTime(request.To);

            await CheckIfDateAvailable(request.From, request.To, device);

            var newItem = new Reservation
            {
                UserId = user.Id,
                Status = request.Status,
                DeviceId = device.Id,
                From = roundFrom,
                To = roundTo,
            };

            _dbContext.Reservations.Add(newItem);
            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, ReservationRequest request)
        {
            var item = await _dbContext.Reservations
                .FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidReservationException();
            }

            var device = await _dbContext.Devices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.DeviceId);
            if (device == null)
            {
                throw new InvalidDeviceException();
            }

            var user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.UserId);
            if (user == null)
            {
                throw new InvalidUserException();
            }

            await CheckIfDateAvailable(request.From, request.To, device);

            item.Status = request.Status;
            item.DeviceId = device.Id;
            item.UserId = user.Id;
            item.From = request.From;
            item.To = request.To;
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

            await _dbContext.Reservations
                .Where(x => x.Device.Id == device.Id &&
                (x.Status == Status.CheckedIn || x.Status == Status.OverDue
                || x.Status == Status.Pending))
                .ForEachAsync(x =>
                {
                    if (CheckIfDateIsWithinReservation(from, x)
                        || CheckIfDateIsWithinReservation(to, x)
                        || CheckIfReservationIsWithinDates(from, to, x))
                    {
                        throw new UsedDateException();
                    }
                });
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

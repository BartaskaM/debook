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
using tr3am.Services;
using Action = tr3am.DataContracts.Enums.Action;

namespace tr3am.Data
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly EmailService _emailService;

        public ReservationsRepository(AppDbContext dbContext, EmailService emailService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
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

        public async Task<int> Create(ReservationRequest request, bool booking, int userId)
        {
            var device = await _dbContext.Devices
               .FirstOrDefaultAsync(x => x.Id == request.DeviceId);

            if (device == null)
            {
                throw new InvalidDeviceException();
            }

            DateTime roundFrom = booking ? request.From : RoundTime(request.From);
            DateTime roundTo = RoundTime(request.To);

            await CheckIfDateAvailable(request.From, request.To, device);

            var newItem = new Reservation
            {
                UserId = userId,
                Status = request.Status,
                DeviceId = device.Id,
                From = roundFrom,
                To = roundTo,
            };

            _dbContext.Reservations.Add(newItem);
            Action eventAction = Action.Reserved;
            if (booking)
            {
                eventAction = Action.Booked;
                device.Available = false;
                device.UserId = userId;
            }

            await _dbContext.Events.AddAsync(new Event
            {
                Action = eventAction,
                OfficeId = device.OfficeId,
                UserId = userId,
                CreatedOn = DateTime.UtcNow,
                DeviceId = request.DeviceId,
            });

            await _dbContext.SaveChangesAsync();

            return newItem.Id;
        }

        public async Task Update(int id, ReservationUpdateRequest request, int userId)
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

            await Task.WhenAll(device, office);

            if (device.Result == null)
            {
                throw new InvalidDeviceException();
            }

            if (office.Result == null)
            {
                throw new InvalidOfficeException();
            }


            Action eventAction = Action.ReservationCanceled;
            int officeId = device.Result.OfficeId;

            if (request.Status == Status.CheckedIn)
            {
                device.Result.UserId = userId;
                device.Result.Available = false;
                eventAction = Action.CheckedIn;
            }

            if (request.Status == Status.Completed)
            {
                if (office.Result == null)
                {
                    throw new InvalidOfficeException();
                }

                eventAction = item.Status == Status.OverDue ? Action.ReturnedLate : Action.Returned;
                officeId = office.Result.Id;

                device.Result.UserId = null;
                device.Result.Available = true;
                device.Result.OfficeId = request.OfficeId.Value;
            }

            await _dbContext.Events.AddAsync(new Event
            {
                Action = eventAction,
                OfficeId = officeId,
                UserId = userId,
                CreatedOn = DateTime.UtcNow,
                DeviceId = request.DeviceId,
            });

            item.Status = request.Status;
            item.DeviceId = device.Result.Id;
            item.UserId = userId;
            item.From = request.From;
            item.To = request.To;

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

        public async Task RefreshReservations()
        {
            DateTime now = DateTime.UtcNow;

            await _dbContext.Reservations
                .Include(x => x.User)
                .Include(x => x.Device)
                .ForEachAsync(async x =>
            {
                if (x.Status == Status.Pending)
                {
                    var z = now - x.From;
                    if (now - x.From > FifteenMinutes)
                    {
                        x.Status = Status.Expired;
                        await _dbContext.Events.AddAsync(new Event
                        {
                            Action = Action.ReservationExpired,
                            OfficeId = x.Device.OfficeId,
                            UserId = x.UserId,
                            CreatedOn = DateTime.UtcNow,
                            DeviceId = x.DeviceId,
                        });
                    }
                }
                else if (x.Status == Status.CheckedIn)
                {
                    if (x.To <= now)
                    {
                        x.Status = Status.OverDue;
                        string text =
                            String.Format("Hello {0} {1},\r\n\r\nIt appears that you have used device {2} for longer period of time than intended. Please return this device as your colleagues may be waiting for it.\r\n\r\nKind regards, Debook.", x.User.FirstName, x.User.LastName, x.Device.IdentificationNum);
                        string htmlText =
                            String.Format("Hello {0} {1},<br /><br />It appears that you have used device {2} for longer period of time than intended. Please return this device as your colleagues may be waiting for it.<br /><br />Kind regards, Debook.", x.User.FirstName, x.User.LastName, x.Device.IdentificationNum);
                        _emailService.SendReminder(text, htmlText, x.User.Email);
                    }
                }
            });

            await _dbContext.SaveChangesAsync();
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

            var reservations = await _dbContext.Reservations
                .Where(x => x.Device.Id == device.Id &&
                            (x.Status == Status.CheckedIn || x.Status == Status.OverDue
                                                          || x.Status == Status.Pending))
                .ToListAsync();

            foreach (var reservation in reservations)
            {
                if (CheckIfDateIsWithinReservation(from, reservation)
                    || CheckIfDateIsWithinReservation(to, reservation)
                    || CheckIfReservationIsWithinDates(from, to, reservation))
                {
                    throw new UsedDateException();
                }
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

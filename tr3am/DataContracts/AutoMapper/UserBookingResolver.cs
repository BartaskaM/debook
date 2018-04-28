using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts.AutoMapper
{
    public class UserBookingResolver : IValueResolver<Device,ShortDeviceDto,UserDeviceReservationDto>
    {
        public UserDeviceReservationDto Resolve(Device source, ShortDeviceDto destination, UserDeviceReservationDto destMember,
            ResolutionContext context)
        {
            int userId = (int)context.Items["UserId"];
            return source.Reservations.Where(res =>
                    res.UserId == userId &&
                    (res.Status == Status.CheckedIn || res.Status == Status.OverDue))
                .Select(res => new UserDeviceReservationDto
                {
                    Id = res.Id,
                    From = res.From,
                    To = res.To,
                    Status = res.Status,
                })
                .FirstOrDefault();
        }
    }
}

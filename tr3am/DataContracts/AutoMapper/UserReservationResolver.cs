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
    public class UserReservationResolver : IValueResolver<Device,ShortDeviceDto,UserDeviceReservationDto>
    {
        public UserDeviceReservationDto Resolve(Device source, ShortDeviceDto destination, UserDeviceReservationDto destMember,
            ResolutionContext context)
        {
            int userId = (int)context.Items["UserId"];
            return source.Reservations.Where(res =>
                    res.UserId == userId && res.Status == Status.Pending)
                .Select(res => new UserDeviceReservationDto
                {
                    Id = res.Id,
                    From = DateTime.SpecifyKind(res.From, DateTimeKind.Utc),
                    To = DateTime.SpecifyKind(res.To, DateTimeKind.Utc),
                    Status = res.Status,
                })
                .FirstOrDefault();
        }
    }
}

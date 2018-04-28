using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using tr3am.Data.Entities;
using tr3am.DataContracts.AutoMapper;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts
{
    public class Mappings
    {
        public static void SetupMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Model, ModelDto>();
                cfg.CreateMap<ModelDto, Model>();
                cfg.CreateMap<Brand, BrandDto>();
                cfg.CreateMap<Brand, ShortBrandDto>();
                cfg.CreateMap<BrandDto, Brand>();
                cfg.CreateMap<Office, OfficeDto>();
                cfg.CreateMap<Office, ShortOfficeDto>();
                cfg.CreateMap<OfficeDto, Office>();
                cfg.CreateMap<User, LogInDto>();
                cfg.CreateMap<User, UserDTO>();
                cfg.CreateMap<User, ShortUserDto>();
                cfg.CreateMap<UserDTO, User>();
                cfg.CreateMap<Device, FullDeviceDto>();
                cfg.CreateMap<Device, ShortDeviceDto>()
                    .ForMember(dest => dest.UserBooking, opt =>
                        opt.ResolveUsing<UserBookingResolver>())
                    .ForMember(dest => dest.UserReservation, opt =>
                        opt.ResolveUsing<UserReservationResolver>())
                    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Office))
                    .ForMember(dest => dest.Custody, opt => opt.MapFrom(src => src.User));
                cfg.CreateMap<FullDeviceDto, Device>();
                cfg.CreateMap<Reservation, ReservationDto>();
                cfg.CreateMap<Reservation, UserDeviceReservationDto>();
                cfg.CreateMap<Event, EventDto>();
                
            });
        }
    }
}
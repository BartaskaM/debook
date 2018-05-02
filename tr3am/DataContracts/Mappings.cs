using System;
using System.Linq;
using AutoMapper;
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
                cfg.CreateMap<Device, FullDeviceDto>()
                    .ForMember(dest => dest.UserBooking, opt =>
                        opt.ResolveUsing<FullDeviceUserBookingResolver>())
                    .ForMember(dest => dest.UserReservation, opt =>
                        opt.ResolveUsing<FullDeviceUserReservationResolver>())
                    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Office))
                    .ForMember(dest => dest.Custody, opt => opt.MapFrom(src => src.User))
                    .ForMember(dest => dest.Purchased,
                        opt => opt.MapFrom(src => DateTime.SpecifyKind(src.Purchased, DateTimeKind.Utc)))
                    .ForMember(dest => dest.Reservations,
                        opt => opt.MapFrom(src => src.Reservations.Where(res =>
                            res.Status == Status.Pending || res.Status == Status.CheckedIn ||
                            res.Status == Status.OverDue)));
                cfg.CreateMap<Device, ShortDeviceDto>()
                    .ForMember(dest => dest.UserBooking, opt =>
                        opt.ResolveUsing<UserBookingResolver>())
                    .ForMember(dest => dest.UserReservation, opt =>
                        opt.ResolveUsing<UserReservationResolver>())
                    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Office))
                    .ForMember(dest => dest.Custody, opt => opt.MapFrom(src => src.User));
                cfg.CreateMap<FullDeviceDto, Device>();
                cfg.CreateMap<Reservation, ReservationDto>()
                    .ForMember(dest => dest.From,
                        opt => opt.MapFrom(src => DateTime.SpecifyKind(src.From, DateTimeKind.Utc)))
                    .ForMember(dest => dest.To,
                        opt => opt.MapFrom(src => DateTime.SpecifyKind(src.To, DateTimeKind.Utc)));
                cfg.CreateMap<Reservation, UserDeviceReservationDto>()
                    .ForMember(dest => dest.From,
                        opt => opt.MapFrom(src => DateTime.SpecifyKind(src.From, DateTimeKind.Utc)))
                    .ForMember(dest => dest.To,
                        opt => opt.MapFrom(src => DateTime.SpecifyKind(src.To, DateTimeKind.Utc)));
                cfg.CreateMap<Event, EventDto>();
                
            });
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using tr3am.Data.Entities;
using tr3am.DataContracts.DTO;

namespace tr3am.DataContracts
{
    public class Mappings
    {
        public static void SetupMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Model, ModelDTO>();
                cfg.CreateMap<ModelDTO, Model>();
                cfg.CreateMap<Brand, BrandDTO>();
                cfg.CreateMap<BrandDTO, Brand>();
                cfg.CreateMap<Office, OfficeDTO>();
                cfg.CreateMap<OfficeDTO, Office>();
                cfg.CreateMap<User, LogInDTO>();
                cfg.CreateMap<User, UserDTO>();
                cfg.CreateMap<UserDTO, User>();
                cfg.CreateMap<Device, FullDeviceDTO>();
                cfg.CreateMap<Device, ShortDeviceDTO>();
                cfg.CreateMap<FullDeviceDTO, Device>();
                cfg.CreateMap<Reservation, ReservationDTO>();
                cfg.CreateMap<Event, EventDTO>();
            });
        }
    }
}
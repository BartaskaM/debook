﻿using System.Collections.Generic;
using System.Linq;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.Data
{
    public class OfficesRepository : IOfficesRepository
    {
        private readonly List<Office> _items;

        public OfficesRepository()
        {
            _items = new List<Office>
            {
                new Office
                {
                    Id = 1,
                    Country = "Lithuania",
                    City = "Kaunas",
                    Address = "11D A. Juozapavičiaus pr.",
                    Lat = 54.864296,
                    Lng = 23.945239,
                },
                new Office
                {
                    Id = 2,
                    Country = "Lithuania",
                    City = "Vilnius",
                    Address = "135 Zalgirio g.",
                    Lat = 54.704881,
                    Lng = 25.271658,
                },
                new Office
                {
                    Id = 3,
                    Country = "United States of America",
                    City = "Chicago",
                    Address = "343 W. Erie St. Suite 600",
                    Lat = 41.893646,
                    Lng = -87.637532,
                },
                new Office
                {
                    Id = 4,
                    Country = "Canada",
                    City = "Toronto",
                    Address = "36 Toronto Street Suite 260",
                    Lat = 43.650579,
                    Lng = -79.376536,
                },
                new Office
                {
                    Id = 5,
                    Country = "United Kingdom",
                    City = "London",
                    Address = "1 Mark Square",
                    Lat = 51.524425,
                    Lng = -0.082300,
                },
            };
        }

        public List<Office> GetAll()
        {
            return _items.ToList();
        }

        public OfficeDTO GetById(int id)
        {
            Office office = _items.FirstOrDefault(x => x.Id == id);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            return new OfficeDTO
            {
                Id = office.Id,
                City = office.City,
                Country = office.Country,
                Address = office.Address,
                Lat = office.Lat,
                Lng = office.Lng
            };
        }

        public Office Create(OfficeItemRequest request)
        {
            var id = _items.DefaultIfEmpty().Max(x => x.Id) + 1;

            var item = new Office
            {
                Id = id,
                Country = request.Country,
                City = request.City,
                Address = request.Address,
                Lat = request.Lat,
                Lng = request.Lng,
            };

            if (!OfficeExists(item))
            {
                throw new DuplicateOfficeException();
            }

            _items.Add(item);

            return item;
        }

        public bool OfficeExists(Office office)
        {
            Office result = _items.Find(x =>
            x.Country == office.Country &&
            x.City == office.City &&
            x.Address == office.Address);

            if (result != null)
            {
                return true;
            }

            return false;
        }

        public void Update(int id, OfficeItemRequest request)
        {
            Office office = _items.FirstOrDefault(x => x.Id == id);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }

            office.Country = request.Country;
            office.City = request.City;
            office.Address = request.Address;
            office.Lat = request.Lat;
            office.Lng = request.Lng;
        }

        public void Delete(int id)
        {
            var item = _items.Single(x => x.Id == id);

            _items.Remove(item);
        }
    }
}
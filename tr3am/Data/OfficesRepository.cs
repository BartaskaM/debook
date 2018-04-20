using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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

        public List<OfficeDTO> GetAll()
        {
            return _items.Select(Mapper.Map<Office,OfficeDTO>).ToList();
        }

        public OfficeDTO GetById(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            return Mapper.Map<Office, OfficeDTO>(item);
        }

        public int Create(OfficeItemRequest request)
        {
            var id = _items.Any() ? _items.Max(x => x.Id) + 1 : 1;

            var item = new Office
            {
                Id = id,
                Country = request.Country,
                City = request.City,
                Address = request.Address,
                Lat = request.Lat,
                Lng = request.Lng,
            };

            if (OfficeExists(item))
            {
                throw new DuplicateOfficeException();
            }

            _items.Add(item);
            return id;
        }

        public bool OfficeExists(Office office)
        {
            var result = _items.Find(x =>
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
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            item.Country = request.Country;
            item.City = request.City;
            item.Address = request.Address;
            item.Lat = request.Lat;
            item.Lng = request.Lng;
        }

        public void Delete(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidOfficeException();
            }

            _items.Remove(item);
        }
    }
}
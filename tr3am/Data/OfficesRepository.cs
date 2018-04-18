using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using tr3am.Data.Entities;
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
                    City = "Kawns",
                    Address = "11D A. Juozapavičiaus pr.",
                    Lat = 54.864296,
                    Lng = 23.945239,
                },
              new Office
              {
                Id = 2,
                Country = "Lithuania",
                City = "Wilno",
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
            return _items
                .Where(x => x.Id == id)
                .Select(Mapper.Map<Office,OfficeDTO>)
                .FirstOrDefault();
        }

        public void Create(OfficeItemRequest request)
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

            _items.Add(item);
        }

        public void Update(int id, OfficeItemRequest request)
        {
            var item = _items.Single(x => x.Id == id);

            item.Country = request.Country;
            item.City = request.City;
            item.Address = request.Address;
            item.Lat = request.Lat;
            item.Lng = request.Lng;
        }

        public void Delete(int id)
        {
            var item = _items.Single(x => x.Id == id);

            _items.Remove(item);
        }
    }
}
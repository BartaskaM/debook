using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Events;


namespace tr3am.Data
{
    public class EventsRepository : IEventsRepository
    {
        private readonly List<Event> _items;
        private readonly IOfficesRepository _officesRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly IDevicesRepository _devicesRepository;

        public EventsRepository(IOfficesRepository officesRepository, IUsersRepository usersRepository, IDevicesRepository devicesRepository)
        {
            _officesRepository = officesRepository;
            _usersRepository = usersRepository;
            _devicesRepository = devicesRepository;
            OfficeDTO office = _officesRepository.GetById(1);
            UserDTO user = _usersRepository.GetById(1);
            FullDeviceDTO device = _devicesRepository.GetById(1);
            _items = new List<Event>
            {
                new Event
                {
                    Id = 1,
                    Action = "Check In",
                    Device = new Device
                    {
                        Id = 1,
                    },
                    Office = new Office
                    {
                        Id = 1,
                        Address = office.Address,
                        City = office.City,
                        Country = office.Country,
                        Lat = office.Lat,
                        Lng = office.Lng,
                    },
                    User = new User
                    {
                        Id = 1,

                    },
                    Date_time = new DateTime(2018, 3, 1, 8, 0, 0),
                },
            };
        }

        public void Delete(int id)
        {
            var item = _items.Single(x => x.Id == id);

            _items.Remove(item);
        }

        public List<Event> GetAll()
        {
            return _items.ToList();
        }

        public EventDTO GetById(int id)
        {
            return _items
                .Where(x => x.Id == id)
                .Select(x => new EventDTO
                {
                    Id = x.Id,
                    //Action = x.Action,
                    //Device = x.Device,
                    //Office = x.Office,
                    //User = x.User,
                    //Date_time = x.Date_time,
                })
                .FirstOrDefault();
        }

        public Event Create(EventItemRequest request)
        {
            var id = _items.DefaultIfEmpty().Max(x => x.Id) + 1;

            var item = new Event
            {
                Id = id,
            //    Action = request.Action,
            //    Device = request.Device,
            //Office = request.Office,
            //    User = request.User,
                Date_time = request.Date_time,
            };

            _items.Add(item);

            return item;
        }

        public void Update(int id, EventItemRequest request)
        {
            var item = _items.Single(x => x.Id == id);

            //item.Action = request.Action;
            //item.Device = request.Device;
            //item.Office = request.Office;
            //item.User = request.User;
            item.Date_time = request.Date_time;
        }
    }
}

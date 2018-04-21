using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
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
                    Device = Mapper.Map<FullDeviceDTO,Device>(_devicesRepository.GetById(1)),
                    Office = Mapper.Map<OfficeDTO,Office>(_officesRepository.GetById(1)),
                    User = Mapper.Map<UserDTO,User>(_usersRepository.GetById(1)),
                    CreatedOn = new DateTime(2018, 3, 1, 8, 0, 0),
                },
                new Event
                {
                    Id = 2,
                    Action = "Check In",
                    Device = Mapper.Map<FullDeviceDTO,Device>(_devicesRepository.GetById(1)),
                    Office = Mapper.Map<OfficeDTO,Office>(_officesRepository.GetById(2)),
                    User = Mapper.Map<UserDTO,User>(_usersRepository.GetById(2)),
                    CreatedOn = new DateTime(2018, 4, 2, 8, 0, 0),
                },
            };
        }

        public List<Event> GetAll()
        {
            return _items.ToList();
        }

        public EventDTO GetById(int id)
        {
            var event_ = _items.FirstOrDefault(x => x.Id == id);
            if (event_ == null)
            {
                throw new InvalidEventException();
            }

            return Mapper.Map<Event, EventDTO>(event_);
        }

        public int Create(EventItemRequest request)
        {
            var id = _items.Count() != 0 ? _items.Max(x => x.Id) + 1 : 1;
            var office = _officesRepository.GetById(request.Office);
            var device = _devicesRepository.GetById(request.Device);
            var user = _usersRepository.GetById(request.User);

            if (office == null)
            {
                throw new InvalidOfficeException();
            }
            if (device == null)
            {
                throw new InvalidDeviceException();
            }
            if (user == null)
            {
                throw new InvalidUserException();
            }
            var item = new Event
            {
                Id = id,
                Action = request.Action,
                Device = Mapper.Map<FullDeviceDTO, Device>(device),
                Office = Mapper.Map<OfficeDTO, Office>(office),
                User = Mapper.Map<UserDTO, User>(user),
                CreatedOn = request.Date_time,
            };
            _items.Add(item);
            return id;
        }

        public void Update(int id, EventItemRequest request)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidEventException();
            }

            var office = _officesRepository.GetById(request.Office);
            var device = _devicesRepository.GetById(request.Device);
            var user = _usersRepository.GetById(request.User);

            if (office == null)
            {
                throw new InvalidOfficeException();
            }
            if (device == null)
            {
                throw new InvalidDeviceException();
            }
            if (user == null)
            {
                throw new InvalidUserException();
            }
            item.Action = request.Action;
            item.Device = Mapper.Map<FullDeviceDTO, Device>(device);
            item.Office = Mapper.Map<OfficeDTO, Office>(office);
            item.User = Mapper.Map<UserDTO, User>(user);
            item.CreatedOn = request.Date_time;
        }

        public void Delete(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                throw new InvalidEventException();
            }
            _items.Remove(item);
        }
    }
}
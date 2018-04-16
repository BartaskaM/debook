using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly List<User> _items;
        private readonly IOfficesRepository _officesRepository;

        public UsersRepository(IOfficesRepository officesRepository)
        {
            _officesRepository = officesRepository;
            OfficeDTO office = _officesRepository.GetById(1);
            _items = new List<User>
            {
               new User {
                Id = 1,
                FirstName = "John",
                LastName = "Snow",
                Email = "admin@admin.com",
                Office = new Office
                {
                    Id = 1,
                    Address = office.Address,
                    City = office.City,
                    Country = office.Country,
                    Lat = office.Lat,
                    Lng = office.Lng,
                },
                Slack = "LordCommander2",
                Role = "admin",
                Password = "admin",
                },
                new User
                {
                Id = 2,
                FirstName = "Petras",
                LastName = "Petraitis",
                Email = "user@user.com",
                Office = new Office
                {
                    Id = 1,
                    Address = office.Address,
                    City = office.City,
                    Country = office.Country,
                    Lat = office.Lat,
                    Lng = office.Lng,
                },
                Slack = "pStandsForPeasant",
                Role = "user",
                Password = "user",
                },
                new User
                {
                Id = 3,
                FirstName = "Augustas Nojus",
                LastName = "Grebliauskas",
                Email = "noah.grebliauskas@gmail.com",
                Office = new Office
                {
                    Id = 1,
                    Address = office.Address,
                    City = office.City,
                    Country = office.Country,
                    Lat = office.Lat,
                    Lng = office.Lng,
                },
                Slack = "Humpero",
                Role = "admin",
                Password = "password",
                },
            };
        }

        public LogInDTO LogIn(LogInRequest request)
        {
            User user = _items.FirstOrDefault(x => x.Email == request.Email);
            if(user == null || user.Password != request.Password)
            {
                throw new InvalidUserException();
            }
            return new LogInDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Office = _officesRepository.GetById(user.Office.Id),
                Slack = user.Slack,
                Role = user.Role,
                Password = user.Password,
            };
        }

        public int Create(CreateUserRequest request)
        {
            int id = _items.Count() == 0 ? 1 : _items.Max(x => x.Id) + 1;
            OfficeDTO officeDto = _officesRepository.GetById(request.Office);
            if (officeDto == null)
            {
                throw new InvalidOfficeException();
            }
            if (_items.FirstOrDefault(user => user.Email == request.Email) != null)
            {
                throw new DuplicateEmailException();
            }
            Office office = new Office
            {
                Id = officeDto.Id,
                Address = officeDto.Address,
                City = officeDto.City,
                Country = officeDto.Country,
                Lat = officeDto.Lat,
                Lng = officeDto.Lng,
            };
            User newUser = new User
            {
                Id = id,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Office = office,
                Password = request.Password,
                Slack = request.Slack,
                Role = "user",
            };
            _items.Add(newUser);
            return id;
        }


        public void Delete(int id)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new InvalidUserException();
            }
            _items.Remove(user);
        }

        public List<UserDTO> GetAll()
        {
            return _items.Select(user => new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Office = _officesRepository.GetById(user.Office.Id),
                Slack = user.Slack,
                Role = user.Role,
            })
            .ToList();
        }

        public UserDTO GetById(int id)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new InvalidUserException();
            }
            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Office = _officesRepository.GetById(user.Office.Id),
                Slack = user.Slack,
                Role = user.Role,
            };
        }

        public void Update(int id, UpdateUserRequest request)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new InvalidUserException();
            }
            OfficeDTO officeDto = _officesRepository.GetById(request.Office);
            if (officeDto == null)
            {
                throw new InvalidOfficeException();
            }
            if (user.Email != request.Email && _items.FirstOrDefault(x => x.Email == request.Email) != null)
            {
                throw new DuplicateEmailException();
            }
            Office office = new Office
            {
                Id = officeDto.Id,
                Address = officeDto.Address,
                City = officeDto.City,
                Country = officeDto.Country,
                Lat = officeDto.Lat,
                Lng = officeDto.Lng,
            };

            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Office = office;
            if (!String.IsNullOrEmpty(request.Password))
            {
                user.Password = request.Password;
            }
            user.Slack = request.Slack;
            user.Role = request.Role;
        }
    }
}

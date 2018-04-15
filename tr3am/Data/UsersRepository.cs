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
            _items = new List<User>();
        }

        public int Create(CreateUserRequest request)
        {
            int id = _items.Max(x => x.Id) + 1;
            OfficeDTO officeDto = _officesRepository.GetById(request.Office.Value);
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
            };
            _items.Add(newUser);
            return id;
        }


        public void Delete(int id)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if(user == null)
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
            })
            .ToList();
        }

        public UserDTO GetById(int id)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if(user == null)
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
            };
        }

        public void Update(int id, UpdateUserRequest request)
        {
            User user = _items.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new InvalidUserException();
            }
            OfficeDTO officeDto = _officesRepository.GetById(request.Office.Value);
            if (officeDto == null)
            {
                throw new InvalidOfficeException();
            }
            if (_items.FirstOrDefault(x => x.Email == request.Email) != null)
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
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Data
{
    public class DevicesRepository : IDevicesRepository
    {
        private readonly List<Device> _items;
        private readonly IOfficesRepository _officesRepository;
        private readonly IUsersRepository _usersRepository;

        public DevicesRepository(IOfficesRepository officesRepository, IUsersRepository usersRepository)
        {
            _officesRepository = officesRepository;
            _usersRepository = usersRepository;
            _items = new List<Device>
            {
                new Device
                {
                    Id = 2,
                    Brand = new Brand{ Id =1 },
                Image = "https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122",
                Available = true,
                Active = true,
                Model = new Model { Id = 1 },
                Name = "Apple iPad Pro 10.5\", 256GB",
                Custody = null,
                IdentificationNum = 497,
                SerialNum = "123456798ZXJC",
                OS = "macOS High Sierra(version 10.13)",
                Group = "ACC Computers LT",
                Subgroup = "Tablet APPLE",
                Description = "Guest it he tears aware as. Make my no cold of need. " +
        "He been past in by my hard. Warmly thrown oh he common future. " +
        "Otherwise concealed favourite frankness on be at dashwoods defective at. " +
        "Sympathize interested simplicity at do projecting increasing terminated. " +
        "As edward settle limits at in. ",
                Purchased = DateTime.Now,
                Vendor = "Mark IT",
                TaxRate = 10,
                Location = new Office { Id = 1, City = "Kaunas" }
                },
                new Device
                {
                    Id = 1,
                    Brand = new Brand{ Id =1 },
                Image = "https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122",
                Available = true,
                Active = true,
                Model = new Model { Id = 1 },
                Name = "Apple iPad Pro 10.5\", 256GB",
                Custody = null,
                IdentificationNum = 497,
                SerialNum = "123456798ZXJC",
                OS = "macOS High Sierra(version 10.13)",
                Group = "ACC Computers LT",
                Subgroup = "Tablet APPLE",
                Description = "Guest it he tears aware as. Make my no cold of need. " +
        "He been past in by my hard. Warmly thrown oh he common future. " +
        "Otherwise concealed favourite frankness on be at dashwoods defective at. " +
        "Sympathize interested simplicity at do projecting increasing terminated. " +
        "As edward settle limits at in. ",
                Purchased = DateTime.Now,
                Vendor = "Mark IT",
                TaxRate = 10,
                Location = new Office { Id = 1, City = "Kaunas" },
                },

            };
        }

        public List<ShortDeviceDTO> GetAll()
        {
            return _items.Where(x => x.Active).Select(x => new ShortDeviceDTO
            {
                Id = x.Id,
                Image = x.Image,
                Available = x.Available,
                Brand = new BrandDTO { Id = 1 },
                Model = new ModelDTO { Id = 1 },
                OS = x.OS,
                Custody = new UserDTO
                {
                    Id = x.Custody.Id,
                    Email = x.Custody.Email,
                    FirstName = x.Custody.FirstName,
                    LastName = x.Custody.LastName,
                    Office = new OfficeDTO
                    {
                        Id = x.Custody.Office.Id,
                        Address = x.Custody.Office.Address,
                        City = x.Custody.Office.City,
                        Country = x.Custody.Office.Country,
                        Lat = x.Custody.Office.Lat,
                        Lng = x.Custody.Office.Lng,
                    },
                    Role = x.Custody.Role,
                    Slack = x.Custody.Slack,
                },
                IdentificationNum = x.IdentificationNum,
                Location = _officesRepository.GetById(x.Location.Id),               
            }).ToList();
        }

        public FullDeviceDTO GetById(int id)
        {
            Device device = _items.FirstOrDefault(x => x.Id == id);
            if(device == null)
            {
                throw new InvalidDeviceException();
            }
            return new FullDeviceDTO
                {
                    Id = device.Id,
                    Brand = new BrandDTO { Id = 1 },
                    Model = new ModelDTO { Id = 1 },
                    Available = device.Available,
                    Active = device.Active,
                    Image = device.Image,
                    Name = device.Name,
                    Custody = new UserDTO
                    {
                        Id = device.Custody.Id,
                        Email = device.Custody.Email,
                        FirstName = device.Custody.FirstName,
                        LastName = device.Custody.LastName,
                        Office = new OfficeDTO
                        {
                            Id = device.Custody.Office.Id,
                            Address = device.Custody.Office.Address,
                            City = device.Custody.Office.City,
                            Country = device.Custody.Office.Country,
                            Lat = device.Custody.Office.Lat,
                            Lng = device.Custody.Office.Lng,
                        },
                        Role = device.Custody.Role,
                        Slack = device.Custody.Slack,
                    },
                    IdentificationNum = device.IdentificationNum,
                    SerialNum = device.SerialNum,
                    OS = device.OS,
                    Group = device.Group,
                    Subgroup = device.Subgroup,
                    Description = device.Description,
                    Purchased = device.Purchased,
                    Vendor = device.Vendor,
                    TaxRate = device.TaxRate,
                    Location = _officesRepository.GetById(device.Location.Id)
                };
        }

        public int Create(CreateDeviceRequest request)
        {
            var id = _items.Count() != 0 ? _items.Max(x => x.Id) + 1 : 1;
            var office = _officesRepository.GetById(request.Location);
            if(office == null)
            {
                throw new InvalidOfficeException();
            }
            var item = new Device
            {
                Id = id,
                Brand = new Brand { Id = 1 },
                Model = new Model { Id = 1 },
                Available = true,
                Active = true,
                Image = request.Image,
                Name = request.Name,
                Custody = null,
                IdentificationNum = request.IdentificationNum,
                SerialNum = request.SerialNum,
                OS = request.OS,
                Group = request.Group,
                Subgroup = request.Subgroup,
                Description = request.Description,
                Purchased = request.Purchased,
                Vendor = request.Vendor,
                TaxRate = request.TaxRate,
                Location = new Office
                {
                    Id = office.Id,
                    City = office.City,
                    Country = office.Country,
                    Address = office.Address,
                    Lat = office.Lat,
                    Lng = office.Lng
                },
            };

            _items.Add(item);

            return id;
        }

        public void Update(int id, UpdateDeviceRequest request)
        {
            var item = _items.First(x => x.Id == id);
            var office = _officesRepository.GetById(request.Location);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }
            UserDTO user = _usersRepository.GetById(request.Custody);           
            item.Brand = new Brand { Id = request.Brand };
            item.Model = new Model { Id = request.Model };
            item.Available = request.Available;
            item.Active = request.Active;
            item.Image = request.Image;
            item.Name = request.Name;
            item.Custody = new User
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Slack = user.Slack,
                Office = new Office
                {
                    Id = user.Office.Id,
                    Address = user.Office.Address,
                    City = user.Office.City,
                    Country = user.Office.Country,
                    Lat = user.Office.Lat,
                    Lng = user.Office.Lng,
                }
            };
            item.IdentificationNum = request.IdentificationNum;
            item.SerialNum = request.SerialNum;
            item.OS = request.OS;
            item.Group = request.Group;
            item.Subgroup = request.Subgroup;
            item.Description = request.Description;
            item.Purchased = request.Purchased;
            item.Vendor = request.Vendor;
            item.TaxRate = request.TaxRate;
            item.Location = new Office
            {
                Id = office.Id,
                City = office.City,
                Country = office.Country,
                Address = office.Address,
                Lat = office.Lat,
                Lng = office.Lng
            };
        }

        public void Delete(int id)
        {
            var item = _items.First(x => x.Id == id);
            item.Active = false;
        }
    }
}

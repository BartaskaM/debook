using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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
            return _items.Where(x => x.Active).Select(Mapper.Map<Device,ShortDeviceDTO>).ToList();
        }

        public FullDeviceDTO GetById(int id)
        {
            Device device = _items.FirstOrDefault(x => x.Id == id);
            if(device == null)
            {
                throw new InvalidDeviceException();
            }

            return Mapper.Map<Device, FullDeviceDTO>(device);
        }

        public int Create(CreateDeviceRequest request)
        {
            var id = _items.Count() != 0 ? _items.Max(x => x.Id) + 1 : 1;
            var office = _officesRepository.GetById(request.Location.Value);
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
                IdentificationNum = request.IdentificationNum.Value,
                SerialNum = request.SerialNum,
                OS = request.OS,
                Group = request.Group,
                Subgroup = request.Subgroup,
                Description = request.Description,
                Purchased = request.Purchased,
                Vendor = request.Vendor,
                TaxRate = request.TaxRate,
                Location = Mapper.Map<OfficeDTO,Office>(office),
            };

            _items.Add(item);
            return id;
        }

        public void Update(int id, UpdateDeviceRequest request)
        {
            var item = _items.First(x => x.Id == id);
            var office = _officesRepository.GetById(request.Location.Value);
            if (office == null)
            {
                throw new InvalidOfficeException();
            }
            UserDTO user = _usersRepository.GetById(request.Custody.Value);           
            item.Brand = new Brand { Id = request.Brand.Value };
            item.Model = new Model { Id = request.Model.Value };
            item.Available = request.Available;
            item.Active = request.Active;
            item.Image = request.Image;
            item.Name = request.Name;
            item.Custody = Mapper.Map<UserDTO,User>(user);
            item.IdentificationNum = request.IdentificationNum;
            item.SerialNum = request.SerialNum;
            item.OS = request.OS;
            item.Group = request.Group;
            item.Subgroup = request.Subgroup;
            item.Description = request.Description;
            item.Purchased = request.Purchased;
            item.Vendor = request.Vendor;
            item.TaxRate = request.TaxRate;
            item.Location = Mapper.Map<OfficeDTO,Office>(office);
        }

        public void Delete(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new InvalidDeviceException();
            }
            item.Active = false;
        }
    }
}

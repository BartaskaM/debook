using System;
using System.Collections.Generic;
using System.Linq;
using tr3am.Data.Entities;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Data
{
    public class DevicesRepository : IDevicesRepository
    {
        private readonly List<Device> _items;
        private IOfficesRepository _officesRepository;

        public DevicesRepository(IOfficesRepository officesRepository)
        {
            _officesRepository = officesRepository;
            _items = new List<Device>
            {
                new Device
                {
                    Id = 2,
                    Brand = new Brand{ Id =1 },
                Image = "https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122",
                Available = true,
                Active = true,
                Model = "iPad Pro 10.5",
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
                Model = "iPad Pro 10.5",
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
                Custody = new UserDTO { Id = 1 },
                IdentificationNum = x.IdentificationNum,
                Location = _officesRepository.GetById(x.Location.Id),               
            }).ToList();
        }

        public FullDeviceDTO GetById(int id)
        {
            return _items
                .Where(x => x.Id == id)
                .Select(x => new FullDeviceDTO
                {
                    Id = id,
                    Brand = new BrandDTO { Id = 1 },
                    Model = new ModelDTO { Id = 1 },
                    Available = true,
                    Active = true,
                    Image = x.Image,
                    Name = x.Name,
                    Custody = null,
                    IdentificationNum = x.IdentificationNum,
                    SerialNum = x.SerialNum,
                    OS = x.OS,
                    Group = x.Group,
                    Subgroup = x.Subgroup,
                    Description = x.Description,
                    Purchased = x.Purchased,
                    Vendor = x.Vendor,
                    TaxRate = x.TaxRate,
                    Location = _officesRepository.GetById(x.Location.Id)
                })
                .FirstOrDefault();
        }

        public FullDeviceDTO Create(CreateDeviceItemRequest request)
        {
            var id = _items.Count() != 0 ? _items.Max(x => x.Id) : 1;
            var office = _officesRepository.GetById(request.Location);
            if(office == null)
            {
                return null;
            }
            var item = new Device
            {
                Id = id,
                Brand = new Brand { Id = 1 },
                Model = request.Model,
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

            return new FullDeviceDTO
            {
                Id = id,
                Brand = new BrandDTO { Id = 1 },
                Model = new ModelDTO { Id = 1 },
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
                Location = office
            };
        }

        public void Update(int id, UpdateDeviceItemRequest request)
        {
            var item = _items.First(x => x.Id == id);

            item.Brand = new Brand { Id = request.Brand };
            item.Model = request.Model;
            item.Available = request.Available;
            item.Active = request.Active;
            item.Image = request.Image;
            item.Name = request.Name;
            item.Custody = new User { Id = request.Custody };
            item.IdentificationNum = request.IdentificationNum;
            item.SerialNum = request.SerialNum;
            item.OS = request.OS;
            item.Group = request.Group;
            item.Subgroup = request.Subgroup;
            item.Description = request.Description;
            item.Purchased = request.Purchased;
            item.Vendor = request.Vendor;
            item.TaxRate = request.TaxRate;
            item.Location = new Office { Id = request.Location, City = "Kaunas" };
        }

        public void Delete(int id)
        {
            var item = _items.First(x => x.Id == id);
            item.Active = false;
        }
    }
}

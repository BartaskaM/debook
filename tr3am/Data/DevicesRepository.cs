using System.Collections.Generic;
using System.Linq;
using tr3am.Data.Entities;
using tr3am.DataContracts;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Data
{
    public class DevicesRepository : IDevicesRepository
    {
        private readonly List<FullDeviceItem> _items;

        public DevicesRepository()
        {
            _items = new List<FullDeviceItem>
            {
                new FullDeviceItem
                {
                    Id = 2,
                    Brand = "Apple",
                Image = "https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122",
                Available = true,
                Active = true,
                Model = "iPad Pro 10.5",
                Name = "Apple iPad Pro 10.5\", 256GB",
                Custody = null,
                BookedFrom = null,
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
                CheckInDue = null,
                Purchased = null,
                Vendor = "Mark IT",
                TaxRate = 10,
                Location = 1,
                },
                new FullDeviceItem
                {
                    Id = 1,
                    Brand = "Apple",
                Image = "https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122",
                Available = true,
                Active = true,
                Model = "iPad Pro 10.5",
                Name = "Apple iPad Pro 10.5\", 256GB",
                Custody = null,
                BookedFrom = null,
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
                CheckInDue = null,
                Purchased = null,
                Vendor = "Mark IT",
                TaxRate = 10,
                Location = 1,
                },

            };
        }

        public List<SmallDeviceItem> GetAll()
        {
            return _items.Where(x => x.Active).Select(x => new SmallDeviceItem(x)).ToList();
        }

        public FullDeviceItem GetById(int id)
        {
            return _items.SingleOrDefault(x => x.Id == id);
        }

        public FullDeviceItem Create(CreateDeviceItemRequest request)
        {
            var id = _items.DefaultIfEmpty().Max(x => x.Id) + 1;

            var item = new FullDeviceItem
            {
                Id = id,
                Brand = request.Brand,
                Model = request.Model,
                Available = true,
                Active = true,
                Image = request.Image,
                Name = request.Name,
                Custody = null,
                BookedFrom = null,
                IdentificationNum = request.IdentificationNum,
                SerialNum = request.SerialNum,
                OS = request.OS,
                Group = request.Group,
                Subgroup = request.Subgroup,
                Description = request.Description,
                CheckInDue = null,
                Purchased = request.Purchased,
                Vendor = request.Vendor,
                TaxRate = request.TaxRate,
                Location = request.Location,
            };

            _items.Add(item);

            return item;
        }

        public void Update(int id, UpdateDeviceItemRequest request)
        {
            var item = _items.Single(x => x.Id == id);

            item.Brand = request.Brand;
            item.Model = request.Model;
            item.Available = request.Available;
            item.Active = request.Active;
            item.Image = request.Image;
            item.Name = request.Name;
            item.Custody = request.Custody;
            item.BookedFrom = request.BookedFrom;
            item.IdentificationNum = request.IdentificationNum;
            item.SerialNum = request.SerialNum;
            item.OS = request.OS;
            item.Group = request.Group;
            item.Subgroup = request.Subgroup;
            item.Description = request.Description;
            item.CheckInDue = request.CheckInDue;
            item.Purchased = request.Purchased;
            item.Vendor = request.Vendor;
            item.TaxRate = request.TaxRate;
            item.Location = request.Location;
        }

        public void Delete(int id)
        {
            var item = _items.Single(x => x.Id == id);
            item.Active = false;
        }
    }
}

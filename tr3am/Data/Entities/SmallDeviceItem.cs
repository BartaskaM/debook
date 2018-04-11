using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class SmallDeviceItem
    {
        public SmallDeviceItem(SmallDeviceItem item)
        {
            Id = item.Id;
            Image = item.Image;
            Available = item.Available;
            Brand = item.Brand;
            Model = item.Model;
            IdentificationNum = item.IdentificationNum;
            OS = item.OS;
            Location = item.Location;
            Custody = item.Custody;
        }
        public SmallDeviceItem() { }
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public int Location { get; set; }
        public int? Custody { get; set; }
    }
}

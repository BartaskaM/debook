using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class FullDeviceItem : SmallDeviceItem
    {
        public string Name { get; set; }
        public string SerialNum { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
        public string Description { get; set; }
        public string Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public bool Active { get; set; }
        public string BookedFrom { get; set; }
        public string CheckInDue { get; set; }
    }
}

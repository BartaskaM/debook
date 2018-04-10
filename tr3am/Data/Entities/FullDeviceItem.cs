using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class FullDeviceItem
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public int IdentificationNum { get; set; }
        public string SerialNum { get; set; }
        public string OS { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
        public string Description { get; set; }
        public string Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public int Location { get; set; }
        public bool Available { get; set; }
        public bool Active { get; set; }
        public int Custody { get; set; }
        public string BookedFrom { get; set; }
        public string CheckInDue { get; set; }
    }
}

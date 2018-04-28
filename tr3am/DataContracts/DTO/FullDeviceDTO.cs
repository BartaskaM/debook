using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.DTO
{
    public class FullDeviceDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public BrandDto Brand { get; set; }
        public ModelDto Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public OfficeDto Location { get; set; }
        public UserDTO Custody { get; set; }
        public string Name { get; set; }
        public string SerialNum { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public bool Active { get; set; }
    }
}

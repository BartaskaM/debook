using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.DTO
{
    public class FullDeviceDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public BrandDTO Brand { get; set; }
        public ModelDTO Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public OfficeDTO Location { get; set; }
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

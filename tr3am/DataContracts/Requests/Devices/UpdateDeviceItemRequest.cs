using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Devices
{
    public class DeviceItemRequest
    {
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int IdentificationNum { get; set; }
        [Required]
        public string SerialNum { get; set; }
        [Required]
        public string OS { get; set; }
        [Required]
        public string Group { get; set; }
        [Required]
        public string Subgroup { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Purchased { get; set; }
        [Required]
        public string Vendor { get; set; }
        [Required]
        public float TaxRate { get; set; }
        [Required]
        public int Location { get; set; }
        [Required]
        public bool Available { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public int Custody { get; set; }
        [Required]
        public string BookedFrom { get; set; }
        [Required]
        public string CheckInDue { get; set; }

    }
}

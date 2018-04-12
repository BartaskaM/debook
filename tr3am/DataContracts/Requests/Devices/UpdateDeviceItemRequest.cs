using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Devices
{
    public class UpdateDeviceItemRequest
    {
        [Required]
        public int Brand { get; set; }
        [Required]
        public int Model { get; set; }
        public string Image { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        public int IdentificationNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string SerialNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string OS { get; set; }
        [MaxLength(255)]
        public string Group { get; set; }
        [MaxLength(255)]
        public string Subgroup { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        [MaxLength(255)]
        public string Vendor { get; set; }
        [MaxLength(255)]
        public float TaxRate { get; set; }
        [Required]
        public int Location { get; set; }
        [Required]
        public bool Available { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public int Custody { get; set; }
    }
}

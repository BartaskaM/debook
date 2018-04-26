using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Devices
{
    public class CreateDeviceRequest
    {
        [Required]
        public int BrandId { get; set; }
        [Required]
        public int ModelId { get; set; }
        public string Image { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        public int? IdentificationNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string SerialNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string OS { get; set; }
        [MaxLength(255)]
        public string Group { get; set; }
        [MaxLength(255)]
        public string SubGroup { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
        [Required]
        public DateTime Purchased { get; set; }
        [MaxLength(255)]
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        [Required]
        public int OfficeId { get; set; }
    }
}

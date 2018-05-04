using System;
using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Devices
{
    public class UpdateDeviceRequest
    {
        [Required]
        public int BrandId { get; set; }
        [Required]
        public int ModelId { get; set; }
        public string Image { get; set; }
        [MaxLength(255)]
        public int IdentificationNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string SerialNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string OS { get; set; }
        public DateTime Purchased { get; set; }
        [MaxLength(255)]
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        [Required]
        public int OfficeId { get; set; }
        [Required]
        public bool Available { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public int? UserId { get; set; }
    }
}

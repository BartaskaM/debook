using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Offices
{
    public class OfficeItemRequest
    {
        [Required]
        [MaxLength(256)]
        public string Country { get; set; }
        [Required]
        [MaxLength(256)]
        public string City { get; set; }
        [Required]
        [MaxLength(256)]
        public string Address { get; set; }
        [Required]
        public double Lat { get; set; }
        [Required]
        public double Lng { get; set; }
    }
}

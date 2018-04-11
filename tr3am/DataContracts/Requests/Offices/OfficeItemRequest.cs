using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Offices
{
    public class OfficeItemRequest
    {
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public double Lat { get; set; }
        [Required]
        public double Lng { get; set; }
    }
}

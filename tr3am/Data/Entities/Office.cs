using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace tr3am.Data.Entities
{
    public class Office
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Country { get; set; }
        [Required]
        [MaxLength(256)]
        public string City { get; set; }
        [Required]
        [MaxLength(256)]
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public List<User> Users { get; set; }
        public List<Device> Devices { get; set; }
        public List<Event> Events { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public string Slack { get; set; }
        public string Role { get; set; }
        public List<Device> Devices { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Event> Events { get; set; }
    }
}

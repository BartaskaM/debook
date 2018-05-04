using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace tr3am.Data.Entities
{
    public class User : IdentityUser<int>
    {
        [Required]
        [MaxLength(256)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(256)]
        public string LastName { get; set; }
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public string Slack { get; set; }
        public List<Device> Devices { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Event> Events { get; set; }
    }
}

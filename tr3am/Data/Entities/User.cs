using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
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

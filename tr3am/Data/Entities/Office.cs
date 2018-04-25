using System.Collections.Generic;

namespace tr3am.Data.Entities
{
    public class Office
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public List<User> Users { get; set; }
        public List<Device> Devices { get; set; }
        public List<Event> Events { get; set; }
    }
}

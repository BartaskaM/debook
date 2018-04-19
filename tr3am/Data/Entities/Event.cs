using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public Device Device { get; set; }
        public Office Office { get; set; }
        public User User { get; set; }
        public DateTime Date_time { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class EventItem
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int Device { get; set; }
        public int Office { get; set; }
        public int User { get; set; }
        public DateTime Date_time { get; set; }
    }
}

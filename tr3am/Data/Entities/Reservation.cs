using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Device Device { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public Status Status { get; set; }
    }

    public enum Status
    {
        Pending,
        CheckedIn,
        Expired,
        Done,
        OverDue
    }
}

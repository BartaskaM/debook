using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Events
{
    public class EventItemRequest
    {
        [Required]
        public string Action { get; set; }
        [Required]
        public int Device { get; set; }
        [Required]
        public int Office { get; set; }
        [Required]
        public int User { get; set; }
        [Required]
        public DateTime Date_time { get; set; }
    }
}

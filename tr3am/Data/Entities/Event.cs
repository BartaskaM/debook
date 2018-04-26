using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Event
    {
        public int Id { get; set; }
        [Required]
        public string Action { get; set; }
        public int DeviceId { get; set; }
        public Device Device { get; set; }
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
    }
}
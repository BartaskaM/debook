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
        [MaxLength(64)]
        public string Action { get; set; }
        [Required]
        public int DeviceId { get; set; }
        [Required]
        public int OfficeId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Date_time { get; set; }
    }
}
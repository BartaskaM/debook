using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts.Requests.Reservations
{
    public class ReservationUpdateRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int DeviceId { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
        [Required]
        public Status Status { get; set; }
        [Required]
        public int OfficeId { get; set; }
    }
}

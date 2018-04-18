using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.Requests.Reservations
{
    public class ReservationRequest
    {
        [Required]
        public int User { get; set; }
        [Required]
        public int Device { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
        [Required]
        public Status Status { get; set; }
    }
}

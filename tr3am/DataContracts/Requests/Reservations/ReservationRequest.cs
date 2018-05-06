using System;
using System.ComponentModel.DataAnnotations;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts.Requests.Reservations
{
    public class ReservationRequest
    {
        [Required]
        public int DeviceId { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
        [Required]
        public Status Status { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public UserDTO User { get; set; }
        public ShortDeviceDTO Device { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public Status Status { get; set; }
    }
}

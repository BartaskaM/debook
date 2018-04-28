using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts.DTO
{
    public class UserDeviceReservationDto
    {
        public int Id { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public Status Status { get; set; }
    }
}

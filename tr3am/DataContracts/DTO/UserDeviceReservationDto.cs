﻿using System;
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

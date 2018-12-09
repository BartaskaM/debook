using System;
using System.Collections.Generic;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public ShortUserDto User { get; set; }
        public DateTime? ReadAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

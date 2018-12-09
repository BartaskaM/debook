using System;
using System.Collections.Generic;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class RequestDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime ExpectedDate { get; set; }
        public ShortUserDto User { get; set; }
        public DateTime? ResolvedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<MessageDto> Messages { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;

namespace tr3am.Data.Entities
{
    public class Request
    {
        public int Id { get; set; }
        [Required]
        public RequestStatus Status { get; set; }
        [Required]
        public DateTime ExpectedDate { get; set; }
        public int UserId { get; set; }
        [Required]
        public User User { get; set; }
        public DateTime? ResolvedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Message> Messages { get; set; }
    }
}

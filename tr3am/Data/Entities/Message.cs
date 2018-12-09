using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;

namespace tr3am.Data.Entities
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public User User { get; set; }
        public int UserId { get; set; }
        public Request Request { get; set; }
        public int RequestId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
    }
}

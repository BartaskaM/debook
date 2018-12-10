using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.Requests.Requests
{
    public class MessageItemRequest
    {
        [Required]
        public string Text{ get; set; }
        [Required]
        public int RequestId { get; set; }
    }
}

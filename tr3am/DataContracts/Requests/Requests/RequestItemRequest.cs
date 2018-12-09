using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RequestStatus = tr3am.DataContracts.Enums.RequestStatus;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.Requests.Requests
{
    public class RequestItemRequest
    {
        public RequestStatus Status { get; set; }
        [Required]
        public DateTime ExpectedDate { get; set; }
        public string Message { get; set; }
    }
}

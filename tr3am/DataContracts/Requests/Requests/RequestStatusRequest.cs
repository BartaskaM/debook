using System.ComponentModel.DataAnnotations;
using tr3am.DataContracts.Enums;

namespace tr3am.DataContracts.Requests.Requests
{
    public class RequestStatusRequest
    {
        [Required]
        public RequestStatus Status { get; set; }       
    }
}

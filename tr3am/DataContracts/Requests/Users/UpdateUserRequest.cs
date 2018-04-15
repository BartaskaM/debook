using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Users
{
    public class UpdateUserRequest
    {
        [Required]
        [MaxLength(32)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(32)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        public int? Office { get; set; }
        [MaxLength(64)]
        public string Slack { get; set; }
    }
}

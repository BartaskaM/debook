using System.ComponentModel.DataAnnotations;

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
        public int OfficeId { get; set; }
        [MaxLength(64)]
        public string Slack { get; set; }
    }
}

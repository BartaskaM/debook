using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Users
{
    public class LogInRequest
    {
        [Required]
        [MaxLength(64)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}

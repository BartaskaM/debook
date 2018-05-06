using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Users
{
    public class CreateUserRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        [Required]
        [MaxLength(32)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(32)]
        public string LastName { get; set; }

        [Required]
        public int OfficeId { get; set; }
        [MaxLength(64)]
        public string Slack { get; set; }
    }
}

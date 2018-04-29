namespace tr3am.DataContracts.DTO
{
    public class LogInDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public OfficeDto Office { get; set; }
        public string Slack { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
    }
}

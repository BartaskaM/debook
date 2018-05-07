using System.Collections.Generic;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ShortOfficeDto Office { get; set; }
        public string Slack { get; set; }
        public List<string> Roles { get; set; }
    }
}

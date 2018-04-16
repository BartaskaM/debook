﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.DTO
{
    public class LogInDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public OfficeDTO Office { get; set; }
        public string Slack { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
    }
}
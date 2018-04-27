﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.DataContracts
{
    public interface IAuth
    {
        Task<LogInDTO> LogIn(LogInRequest request);
    }
}
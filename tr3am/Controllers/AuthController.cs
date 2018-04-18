using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Controllers
{
    public class AuthController : Controller
    {
        private readonly IUsersRepository _usersRepository;
        public AuthController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        [HttpPost("api/login")]
        public IActionResult LogIn([FromBody]LogInRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                return Ok(_usersRepository.LogIn(request));
            }
            catch(InvalidUserException)
            {
                return Unauthorized();
            }
        }
    }
}
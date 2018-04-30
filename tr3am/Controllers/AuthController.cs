using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuth _auth;
        public AuthController(IAuth auth)
        {
            _auth = auth;
        }
        [HttpPost("api/login")]
        public async Task<IActionResult> LogIn([FromBody]LogInRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                return Ok(await _auth.LogIn(request));
            }
            catch(InvalidUserException)
            {
                return Unauthorized();
            }
        }
    }
}
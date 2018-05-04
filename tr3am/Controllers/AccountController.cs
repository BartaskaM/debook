using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.Requests.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using tr3am.Data.Entities;
using System.Net;

namespace tr3am.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IAccount _account;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(IAccount account, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _account = account;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        //[HttpPost("login")]
        //public async Task<IActionResult> LogIn([FromBody]LogInRequest request)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }
        //    try
        //    {
        //        return Ok(await _account.LogIn(request));
        //    }
        //    catch(InvalidUserException)
        //    {
        //        return Unauthorized();
        //    }
        //}
        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {
        //        int id = await _usersRepository.Create(request);
        //        return CreatedAtAction(nameof(GetById), new { Id = id }, id);
        //    }
        //    catch (InvalidOfficeException)
        //    {
        //        string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
        //        return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
        //    }
        //    catch (DuplicateEmailException)
        //    {
        //        return StatusCode(StatusCodes.Status409Conflict, new { Message = "This e-mail is already in use." });
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var user = new User
        //    {
        //        UserName = request.UserName,
        //        Email = request.Email
        //    };
        //    var result = await _userManager.CreateAsync(user, request.Password);

        //    if (!result.Succeeded)
        //    {
        //        return StatusCode((int)HttpStatusCode.Conflict, new ErrorResponse
        //        {
        //            ErrorMessage = string.Join(Environment.NewLine, result.Errors.Select(x => x.Description))
        //        });
        //    }

        //    return NoContent();
        //}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequest request)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, request.RememberMe, false);

        //    if (!result.Succeeded)
        //    {
        //        return StatusCode((int)HttpStatusCode.Conflict, new ErrorResponse
        //        {
        //            ErrorMessage = "Invalid User Name or Password."
        //        });
        //    }

        //    return NoContent();
        //}

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return NoContent();
        }
    }
}
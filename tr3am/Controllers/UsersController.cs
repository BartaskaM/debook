using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Controllers
{
    [Authorize]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            return await _usersRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _usersRepository.GetById(id));
            }
            catch (InvalidUserException)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userIdClaim.Value);

                if (userId == id || User.IsInRole("admin"))
                {
                    await _usersRepository.Update(id, request);
                }
                else
                {
                    return Forbid();
                }

                return NoContent();
            }
            catch(InvalidUserException)
            {
                return NotFound();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateEmailException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This e-mail is already in use." });
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _usersRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidUserException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "admin")]
        [Route("{id}/moderator/toggle")]
        public async Task<IActionResult> ToggleModerator(int id)
        {
            try
            {
                _usersRepository.ToggleModerator(id);
                return NoContent();
            }
            catch (InvalidUserException)
            {
                return NotFound();
            }
        }
    }
}
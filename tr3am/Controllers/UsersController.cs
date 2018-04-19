using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Users;

namespace tr3am.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository officesRepository)
        {
            _usersRepository = officesRepository;
        }

        [HttpGet]
        public IEnumerable<UserDTO> GetAll()
        {
            return _usersRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_usersRepository.GetById(id));
            }
            catch (InvalidUserException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var id = _usersRepository.Create(request);
                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This office doesn't exist." });
            }
            catch (DuplicateEmailException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This e-mail is already in use." });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                _usersRepository.Update(id, request);
                return NoContent();
            }
            catch(InvalidUserException)
            {
                return NotFound();
            }
            catch (InvalidOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This office doesn't exist." });
            }
            catch (DuplicateEmailException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This e-mail is already in use." });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _usersRepository.Delete(id);
            }
            catch (InvalidUserException)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
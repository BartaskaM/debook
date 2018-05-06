﻿using System;
using System.Collections.Generic;
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
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            return await _usersRepository.GetAll();
        }

        [Authorize]
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

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                await _usersRepository.Update(id, request);
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

        [Authorize(Roles = "Admin")]
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
    }
}
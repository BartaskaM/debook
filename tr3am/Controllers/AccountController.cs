﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.Requests.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using tr3am.Data.Entities;
using System.Net;
using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using tr3am.DataContracts.Responses;
using AutoMapper;
using tr3am.DataContracts.DTO;

namespace tr3am.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public int LoginDto { get; private set; }

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (await _userManager.FindByEmailAsync(request.Email) != null)
                {
                    throw new DuplicateEmailException();
                }
                var user = new User
                {
                    UserName = request.Email,
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Slack = request.Slack,
                    OfficeId = request.OfficeId
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                {
                    return StatusCode((int)HttpStatusCode.Conflict, new ErrorResponse
                    {
                        Message = string.Join(Environment.NewLine, result.Errors.Select(x => x.Description))
                    });
                }

                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogInRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, request.RememberMe, false);

            if (!result.Succeeded)
            {
                return StatusCode((int)HttpStatusCode.Conflict, new ErrorResponse
                {
                    Message = "Invalid Email or Password."
                });
            }

            var user = await _userManager.FindByEmailAsync(request.Email);
            return Ok(Mapper.Map<User, LogInDto>(user));
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return NoContent();
        }
    }
}
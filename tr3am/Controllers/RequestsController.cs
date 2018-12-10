using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Requests;
using SendGrid;
using tr3am.DataContracts.Enums;
using System;
using tr3am.Services;

namespace tr3am.Controllers
{
    [Route("api/requests")]
    public class RequestsController : Controller
    {
        private readonly IRequestsRepository _requestsRepository;
        private readonly IMessagesRepository _messagesRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly EmailService _emailService;

        public RequestsController(IRequestsRepository requestsRepository, IMessagesRepository messagesRepository, IUsersRepository usersRepository, EmailService emailService)
        {
            _requestsRepository = requestsRepository;
            _messagesRepository = messagesRepository;
            _usersRepository = usersRepository;
            _emailService = emailService;
        }

        [HttpGet]
        public async Task<IEnumerable<RequestDto>> GetAll()
        {
            var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdClaim.Value);

            var user = await _usersRepository.GetById(userId);

            if (user.Roles.Count == 0 || user.Roles.Contains("user"))
            {
                return await _requestsRepository.GetByUserId(userId);
            }

            return await _requestsRepository.GetAll();
        }

//        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userIdClaim.Value);

                await _messagesRepository.Read(id, userId);

                return Ok(await _requestsRepository.GetById(id));
            }
            catch (InvalidRequestException)
            {
                return NotFound();
            }
        }

//        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]RequestItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userIdClaim.Value);

                var itemId = await _requestsRepository.Create(request, userId);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch (DuplicateOfficeException) // TODO
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "An office with those details already exists." });
            }
        }

        [HttpPost]
        [Route("{id}/status")]
        public async Task<IActionResult> Status([FromBody]RequestStatusRequest request, int id)
        {
            var req = await _requestsRepository.ChangeStatus(request, id);

            Response response;

            if (request.Status == RequestStatus.Resolved)
            {
                string text =
                String.Format("Hello {0} {1},\r\n\r\nYour request has been resolved.\r\n\r\nKind regards, Debook.", req.User.FirstName, req.User.LastName);
                string htmlText =
                    String.Format("Hello {0} {1},<br /><br />Your request has been resolved.<br /><br />Kind regards, Debook.", req.User.FirstName, req.User.LastName);
                response = await _emailService.Send(text, "Request resolved", htmlText, req.User.Email);
            }
            else
            {
                string text =
                String.Format("Hello {0} {1},\r\n\r\nYour request has been cancelled.\r\n\r\nKind regards, Debook.", req.User.FirstName, req.User.LastName);
                string htmlText =
                    String.Format("Hello {0} {1},<br /><br />Your request has been cancelled.<br /><br />Kind regards, Debook.", req.User.FirstName, req.User.LastName);
                response = await _emailService.Send(text, "Request cancelled", htmlText, req.User.Email);
            }

            if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, new { Message = "Email sending failed." });
            }

            return NoContent();
        }
    }
}
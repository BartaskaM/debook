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
using tr3am.DataContracts.Requests.Requests;
using tr3am.DataContracts.Requests.Reservations;
using tr3am.Services;

namespace tr3am.Controllers
{
    [Authorize]
    [Route("api/messages")]
    public class MessageController : Controller
    {
        private readonly IMessagesRepository _messageRepository;
        private readonly IRequestsRepository _requestRepository;

        public MessageController(IMessagesRepository messageRepository, IRequestsRepository requestRepository)
        {
            _messageRepository = messageRepository;
            _requestRepository = requestRepository;
        }

        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _messageRepository.GetById(id));
            }
            catch (InvalidRequestException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]MessageItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdClaim.Value);

            int id = await _requestRepository.AddMessage(request, userId);

            return Ok(await _messageRepository.GetById(id));
        }
    }
}
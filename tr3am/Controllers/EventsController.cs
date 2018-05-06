using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Events;

namespace tr3am.Controllers
{
    [Route("api/events")]
    public class EventsController : Controller
    {
        private readonly IEventsRepository _eventsRepository;

        public EventsController(IEventsRepository eventsRepository)
        {
            _eventsRepository = eventsRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<EventDto>> GetAll()
        {
            return await _eventsRepository.GetAll();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                return Ok(await _eventsRepository.GetById(id));
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]EventItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _eventsRepository.Create(request);
                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.DeviceId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidUserException)
            {
                string errorText = String.Format("User with ID: {0} doesn't exist", request.UserId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]EventItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _eventsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidUserException)
            {
                string errorText = String.Format("User with ID: {0} doesn't exist", request.UserId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.DeviceId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _eventsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
        }
    }
}
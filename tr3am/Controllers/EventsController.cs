using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
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

        [HttpGet]
        public IEnumerable<Event> GetAll()
        {
            return _eventsRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_eventsRepository.GetById(id));
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]EventItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _eventsRepository.Create(request);
                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.Office.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Error = errorText });
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.Device.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidUserException)
            {
                string errorText = String.Format("User with ID: {0} doesn't exist", request.User.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]EventItemRequest request)
        {
            try
            {
                _eventsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.Office.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Error = errorText });
            }
            catch (InvalidUserException)
            {
                string errorText = String.Format("User with ID: {0} doesn't exist", request.User.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.Device.ToString());
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _eventsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidEventException)
            {
                return NotFound();
            }
        }
    }
}
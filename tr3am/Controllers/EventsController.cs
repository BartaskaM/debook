using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
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
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _eventsRepository.Delete(id);

            return NoContent();
        }

        [HttpPost]
        public IActionResult Create([FromBody]EventItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = _eventsRepository.Create(request);

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]EventItemRequest request)
        {
            try
            {
                _eventsRepository.Update(id, request);
            }
            catch
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
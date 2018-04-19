using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Offices;

namespace tr3am.Controllers
{
    [Route("api/offices")]
    public class OfficesController : Controller
    {
        private readonly IOfficesRepository _officesRepository;

        public OfficesController(IOfficesRepository officesRepository)
        {
            _officesRepository = officesRepository;
        }

        [HttpGet]
        public IEnumerable<OfficeDTO> GetAll()
        {
            return _officesRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_officesRepository.GetById(id));
            }
            catch(InvalidOfficeException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]OfficeItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int id = _officesRepository.Create(request);

            return CreatedAtAction(nameof(GetById),new {Id = id}, id);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] OfficeItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            try
            {
                _officesRepository.Update(id, request);
            }
            catch(InvalidOfficeException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _officesRepository.Delete(id);
            }
            catch (InvalidOfficeException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
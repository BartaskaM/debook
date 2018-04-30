using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IEnumerable<OfficeDto>> GetAll()
        {
            return await _officesRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _officesRepository.GetById(id));
            }
            catch (InvalidOfficeException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]OfficeItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var itemId = await _officesRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch (DuplicateOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "An office with those details already exists." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OfficeItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            try
            {
                await _officesRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _officesRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidOfficeException)
            {
                return NotFound();
            }
        }
    }
}
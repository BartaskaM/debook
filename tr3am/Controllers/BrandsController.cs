using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Brands;

namespace tr3am.Controllers
{
    [Route("api/brands")]
    public class BrandsController : Controller
    {
        private readonly IBrandsRepository _brandsRepository;

        public BrandsController(IBrandsRepository brandsRepository)
        {
            _brandsRepository = brandsRepository;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IEnumerable<BrandDto>> GetAll()
        {
            return await _brandsRepository.GetAll();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("short")]
        public async Task<IEnumerable<ShortBrandDto>> GetAllShort()
        {
            return await _brandsRepository.GetAllShort();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _brandsRepository.GetById(id));
            }
            catch (InvalidBrandException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]BrandItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var itemId = await _brandsRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch (DuplicateBrandException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "A brand with those details already exists." });
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BrandItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            try
            {
                await _brandsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidBrandException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _brandsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidBrandException)
            {
                return NotFound();
            }
        }
    }
}
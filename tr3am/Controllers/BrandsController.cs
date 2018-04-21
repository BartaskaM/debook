using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public IEnumerable<BrandDTO> GetAll()
        {
            return _brandsRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_brandsRepository.GetById(id));
            }
            catch (InvalidBrandException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]BrandItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var itemId = _brandsRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch (DuplicateBrandException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "A brand with those details already exists." });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] BrandItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            try
            {
                _brandsRepository.Update(id, request);
            }
            catch (InvalidBrandException)
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
                _brandsRepository.Delete(id);
            }
            catch (InvalidBrandException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
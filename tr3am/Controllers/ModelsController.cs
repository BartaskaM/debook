using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Models;

namespace tr3am.Controllers
{
    [Route("api/models")]
    public class ModelsController : Controller
    {
        private readonly IModelsRepository _modelsRepository;

        public ModelsController(IModelsRepository modelsRepository)
        {
            _modelsRepository = modelsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ModelDto>> GetAll()
        {
            return await _modelsRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _modelsRepository.GetById(id));
            }
            catch (InvalidDeviceException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "moderator")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ModelItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var itemId = await _modelsRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch (InvalidBrandException)
            {
                string errorText = String.Format("Brand with ID: {0} doesn't exist", request.BrandId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateModelException)
            {
                string errorText = String.Format("This model already exist", request.BrandId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [Authorize(Roles = "moderator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ModelItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _modelsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidBrandException)
            {
                string errorText = String.Format("Brand with ID: {0} doesn't exist", request.BrandId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidModelException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "moderator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _modelsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidModelException)
            {
                return NotFound();
            }
        }
    }
}

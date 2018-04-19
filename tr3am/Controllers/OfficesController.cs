﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
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
        public IEnumerable<Office> GetAll()
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
            catch (InvalidOfficeException)
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

            try
            {
                var item = _officesRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
            }
            catch (DuplicateOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "An office with those details already exists." });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] OfficeItemRequest request)
        {
            try
            {
                _officesRepository.Update(id, request);
            }
            catch (InvalidOfficeException)
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
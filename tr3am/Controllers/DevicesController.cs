using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Controllers
{
    [Route("api/devices")]
    public class DevicesController : Controller
    {
        private readonly IDevicesRepository _devicesRepository;

        public DevicesController(IDevicesRepository devicesRepository)
        {
            _devicesRepository = devicesRepository;
        }

        [HttpGet]
        public IEnumerable<ShortDeviceDTO> GetAll()
        {
            return _devicesRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_devicesRepository.GetById(id));
            }
            catch(InvalidDeviceException)
            {
                return NotFound();
            } 
        }

        [HttpPost]
        public IActionResult Create([FromBody]CreateDeviceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var item = _devicesRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = item }, item);
            }
            catch(InvalidOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Error = "This office doesn't exist" });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDeviceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _devicesRepository.Update(id, request);
                return NoContent();
            }
            catch(InvalidDeviceException)
            {
                return NotFound();
            }
            catch(InvalidOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Error = "This office doesn't exist" });
            }
            catch(InvalidUserException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Error = "This user doesn't exist" });
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _devicesRepository.Delete(id);
            }
            catch
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
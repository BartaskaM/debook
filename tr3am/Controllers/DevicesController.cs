using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
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

                FullDeviceDTO item = _devicesRepository.GetById(id);
                if (item != null)
                {
                    return Ok(item);
                } else
                {
                    return NotFound();
                }
            
        }

        [HttpPost]
        public IActionResult Create([FromBody]CreateDeviceItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = _devicesRepository.Create(request);

            if (item == null)
            {
                return BadRequest(new { Message = "This office doesn't exist" });
            }
            return CreatedAtAction(nameof(GetById), new { id = item }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDeviceItemRequest request)
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
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _devicesRepository.Delete(id);
                return NoContent();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Entities;
using tr3am.DataContracts;
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
        public IEnumerable<SmallDeviceItem> GetAll()
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
            catch
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

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDeviceItemRequest request)
        {
            try
            {
                _devicesRepository.Update(id, request);
            }
            catch
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _devicesRepository.Delete(id);

            return NoContent();
        }
    }
}
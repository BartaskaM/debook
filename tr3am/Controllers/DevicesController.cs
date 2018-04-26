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
        private readonly IReservationsRepository _reservationsRepository;

        public DevicesController(IDevicesRepository devicesRepository)
        {
            _devicesRepository = devicesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ShortDeviceDTO>> GetAll()
        {
            return await _devicesRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _devicesRepository.GetById(id));
            }
            catch(InvalidDeviceException)
            {
                return NotFound();
            } 
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateDeviceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _devicesRepository.Create(request);
                return NoContent();
            }
            catch(InvalidOfficeException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Error = "This office doesn't exist" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDeviceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _devicesRepository.Update(id, request);
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _devicesRepository.Delete(id);
                return NoContent();
            }
            catch(InvalidDeviceException)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/reservations")]
        public async Task<IEnumerable<ReservationDTO>> GetDeviceReservations(int id, [FromQuery]bool showAll)
        {
            return await _reservationsRepository.GetByDeviceId(id, showAll);
        }
    }
}
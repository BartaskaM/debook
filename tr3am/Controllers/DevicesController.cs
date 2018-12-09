using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tr3am.Data.Exceptions;
using tr3am.DataContracts;
using tr3am.DataContracts.DTO;
using tr3am.DataContracts.Requests.Devices;

namespace tr3am.Controllers
{
    [Authorize]
    [Route("api/devices")]
    public class DevicesController : Controller
    {
        private readonly IDevicesRepository _devicesRepository;
        private readonly IReservationsRepository _reservationsRepository;
        private readonly IModelsRepository _modelsRepository;

        public DevicesController(IDevicesRepository devicesRepository, IReservationsRepository reservationsRepository, IModelsRepository modelsRepository)
        {
            _devicesRepository = devicesRepository;
            _reservationsRepository = reservationsRepository;
            _modelsRepository = modelsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ShortDeviceDto>> GetAll()
        {
            var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdClaim.Value);

            return await _devicesRepository.GetAll(userId);
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

        [Authorize(Roles = "moderator")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateDeviceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var itemId = await _devicesRepository.Create(request);
                return CreatedAtAction(nameof(GetById), new { id = itemId }, itemId);
            }
            catch(InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidBrandException)
            {
                string errorText = String.Format("Brand with ID: {0} doesn't exist", request.BrandId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidModelException)
            {
                string errorText = String.Format("Model with ID: {0} doesn't exist", request.ModelId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateDeviceSerialNumberException)
            {
                string errorText = String.Format("Device with Serial number: {0} already exist", request.SerialNum);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateModelException)
            {
                string errorText = String.Format("Model with name: {0} already exist", request.ModelName);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateDeviceIdentificationNumberException)
            {
                string errorText = String.Format("Device with identification number: {0} already exist", request.IdentificationNum);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [Authorize(Roles = "moderator")]
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
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidBrandException)
            {
                string errorText = String.Format("Brand with ID: {0} doesn't exist", request.BrandId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidModelException)
            {
                string errorText = String.Format("Model with ID: {0} doesn't exist", request.ModelId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateDeviceSerialNumberException)
            {
                string errorText = String.Format("Device with Serial number: {0} already exist", request.SerialNum);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateModelException)
            {
                string errorText = String.Format("Model with name: {0} already exist", request.ModelName);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (DuplicateDeviceIdentificationNumberException)
            {
                string errorText = String.Format("Device with identification number: {0} already exist", request.IdentificationNum);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }

        }

        [Authorize(Roles = "moderator")]
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
        public async Task<IEnumerable<ReservationDto>> GetDeviceReservations(int id, [FromQuery]bool showAll)
        {
            return await _reservationsRepository.GetByDeviceId(id, showAll);
        }
    }
}
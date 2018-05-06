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
using tr3am.DataContracts.Requests.Reservations;

namespace tr3am.Controllers
{
    [Route("api/reservations")]
    public class ReservationsController : Controller
    {
        private readonly IReservationsRepository _reservationsRepository;

        public ReservationsController(IReservationsRepository reservationsRepository)
        {
            _reservationsRepository = reservationsRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<ReservationDto>> GetAll([FromQuery]bool showAll)
        {
            return await _reservationsRepository.GetAll(showAll);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _reservationsRepository.GetById(id));
            }
            catch (InvalidOfficeException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ReservationRequest request, [FromQuery]bool booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userIdClaim.Value);

                int id = await _reservationsRepository.Create(request, booking, userId);
                return CreatedAtAction(nameof(GetById), new { Id = id }, id);
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.DeviceId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (UsedDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, 
                    new { Message = "This date is already reserved" });
            }
            catch (NegativeDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                    new { Message = "To date must be greater than from date" });
            }
            catch (PastDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, 
                    new { Message = "Reserve for future dates" });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]ReservationUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userIdClaim.Value);

                await _reservationsRepository.Update(id, request, userId);
                return NoContent();
            }
            catch (InvalidReservationException)
            {
                return NotFound();
            }
            catch (InvalidDeviceException)
            {
                string errorText = String.Format("Device with ID: {0} doesn't exist", request.DeviceId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
            catch (InvalidOfficeException)
            {
                string errorText = String.Format("Office with ID: {0} doesn't exist", request.OfficeId);
                return StatusCode(StatusCodes.Status409Conflict, new { Message = errorText });
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _reservationsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidReservationException)
            {
                return NotFound();
            }
        }
    }
}
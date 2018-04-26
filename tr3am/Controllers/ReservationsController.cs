using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public async Task<IEnumerable<ReservationDTO>> GetAll([FromQuery]bool showAll)
        {
            return await _reservationsRepository.GetAll(showAll);
        }

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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ReservationRequest request, [FromQuery]bool booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                int id = await _reservationsRepository.Create(request, booking);
                return CreatedAtAction(nameof(GetById), new { Id = id }, id);
            }
            catch (InvalidDeviceException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This device doesn't exist" });
            }
            catch (InvalidUserException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This user doesn't exist" });
            }
            catch (UsedDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This date is already reserved" });
            }
            catch (NegativeDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                    new { Message = "To date must be greater than from date" });
            }
            catch (PastDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "Reserve for future dates" });
            }
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]ReservationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _reservationsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidReservationException)
            {
                return NotFound();
            }
            catch (InvalidDeviceException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This device doesn't exist" });
            }
            catch (InvalidUserException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This user doesn't exist" });
            }
            catch (UsedDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This date is already reserved" });
            }
            catch (NegativeDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                    new { Message = "To date must be greater than from date" });
            }
            catch (PastDateException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "Reserve for future dates" });
            }
        }

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
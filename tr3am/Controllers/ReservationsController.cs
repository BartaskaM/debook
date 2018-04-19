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
    public class ReservationsController : Controller
    {
        private readonly IReservationsRepository _reservationsRepository;

        public ReservationsController(IReservationsRepository reservationsRepository)
        {
            _reservationsRepository = reservationsRepository;
        }
        [HttpGet("api/reservations")]
        public IEnumerable<ReservationDTO> GetAll([FromQuery]bool showAll)
        {
            return _reservationsRepository.GetAll(showAll);
        }

        [HttpGet("api/devices/{id}/reservations")]
        public IEnumerable<ReservationDTO> GetByDeviceId(int id)
        {
            return _reservationsRepository.GetByDeviceId(id);
        }
        [HttpPost("api/reservations")]
        public IActionResult Create([FromBody]ReservationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _reservationsRepository.Create(request);
                return NoContent();
            }
            catch (InvalidDeviceException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new {Message = "This device doesn't exist"});
            }
            catch (InvalidUserException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This user doesn't exist" });
            }
        }
        [HttpPost("api/reservations/{id}")]
        public IActionResult Update(int id, [FromBody]ReservationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _reservationsRepository.Update(id, request);
                return NoContent();
            }
            catch (InvalidDeviceException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This device doesn't exist" });
            }
            catch (InvalidUserException)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { Message = "This user doesn't exist" });
            }
        }

        public IActionResult Delete(int id)
        {
            try
            {
                _reservationsRepository.Delete(id);
                return NoContent();
            }
            catch (InvalidReservationException)
            {
                return NotFound();
            }
        }
    }
}
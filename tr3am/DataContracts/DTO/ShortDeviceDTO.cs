using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;

namespace tr3am.DataContracts.DTO
{
    public class ShortDeviceDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public ShortBrandDto Brand { get; set; }
        public ModelDto Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public ShortOfficeDto Location { get; set; }
        public ShortUserDto Custody { get; set; }
        public UserDeviceReservationDto UserBooking { get; set; }
        public UserDeviceReservationDto UserReservation { get; set; }
    }
}

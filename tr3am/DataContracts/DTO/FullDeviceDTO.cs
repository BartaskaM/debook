using System;
using System.Collections.Generic;

namespace tr3am.DataContracts.DTO
{
    public class FullDeviceDto
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
        public string SerialNum { get; set; }
        public DateTime Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public IEnumerable<ReservationDto> Reservations { get; set; }
    }
}

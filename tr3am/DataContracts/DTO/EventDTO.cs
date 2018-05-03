using System;

namespace tr3am.DataContracts.DTO
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public EventDeviceDto Device { get; set; }
        public ShortOfficeDto Office { get; set; }
        public ShortUserDto User { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
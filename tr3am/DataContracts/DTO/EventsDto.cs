using System;
using System.Collections.Generic;

namespace tr3am.DataContracts.DTO
{
    public class EventsDto
    {
        public IEnumerable<EventDto> Events { get; set; }
        public int Count { get; set; }
    }
}
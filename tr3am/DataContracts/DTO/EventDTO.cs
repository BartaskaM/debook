using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public FullDeviceDTO Device { get; set; }
        public OfficeDTO Office { get; set; }
        public UserDTO User { get; set; }
        public DateTime Date_time { get; set; }
    }
}

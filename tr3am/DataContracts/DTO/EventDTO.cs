using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.Data.Entities;

namespace tr3am.DataContracts.DTO
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public FullDeviceDto Device { get; set; }
        public OfficeDto Office { get; set; }
        public UserDTO User { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
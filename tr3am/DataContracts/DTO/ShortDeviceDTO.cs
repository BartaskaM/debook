using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tr3am.DataContracts.DTO;

namespace tr3am.Data.Entities
{
    public class ShortDeviceDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public BrandDTO Brand { get; set; }
        public ModelDTO Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public OfficeDTO Location { get; set; }
        public UserDTO Custody { get; set; }
    }
}

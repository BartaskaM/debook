using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class SmallDeviceItem
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public int Location { get; set; }
        public int? Custody { get; set; };
    }
}

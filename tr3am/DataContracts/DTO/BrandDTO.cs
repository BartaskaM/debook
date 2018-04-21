using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.DTO
{
    public class BrandDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string BrandName { get; set; }
        public int? ModelCount { get; set; }
    }
}

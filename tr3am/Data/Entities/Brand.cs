using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string BrandName { get; set; }
        public List<Device> Devices { get; set; }
        public List<Model> Models { get; set; }
    }
}

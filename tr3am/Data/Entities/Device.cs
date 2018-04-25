using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Device
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public Brand Brand { get; set; }
        public Model Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public Office Location { get; set; }
        public User Custody { get; set; }
        public string Name { get; set; }
        public string SerialNum { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public bool Active { get; set; }
    }
}

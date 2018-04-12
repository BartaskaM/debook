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
        [Required]
        public Brand Brand { get; set; }
        [Required]
        public Model Model { get; set; }
        public int IdentificationNum { get; set; }
        [Required]
        [MaxLength(255)]
        public string OS { get; set; }
        [Required]
        public Office Location { get; set; }
        public User Custody { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string SerialNum { get; set; }
        [MaxLength(255)]
        public string Group { get; set; }
        [MaxLength(255)]
        public string Subgroup { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        [MaxLength(255)]
        public string Vendor { get; set; }
        [MaxLength(255)]
        public float TaxRate { get; set; }
        public bool Active { get; set; }
    }
}

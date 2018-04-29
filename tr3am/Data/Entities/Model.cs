using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace tr3am.Data.Entities
{
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public List<Device> Devices { get; set; }
    }
}

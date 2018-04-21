using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.Requests.Brands
{
    public class BrandItemRequest
    {
        [Required]
        public string Image { get; set; }
        [Required]
        [MaxLength(255)]
        public string BrandName { get; set; }
        public int? ModelCount { get; set; }
    }
}

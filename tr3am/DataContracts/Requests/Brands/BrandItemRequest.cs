using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Brands
{
    public class BrandItemRequest
    {
        [Required]
        public string Image { get; set; }
        [Required]
        [MaxLength(256)]
        public string BrandName { get; set; }
    }
}

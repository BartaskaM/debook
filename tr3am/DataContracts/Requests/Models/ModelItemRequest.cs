using System.ComponentModel.DataAnnotations;

namespace tr3am.DataContracts.Requests.Models
{
    public class ModelItemRequest
    {
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int BrandId { get; set; }
    }
}

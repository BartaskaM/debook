using System.Collections.Generic;

namespace tr3am.DataContracts.DTO
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public List<ShortModelDto> Models { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.DataContracts.DTO
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string BrandName { get; set; }
        public List<ModelDto> Models { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace tr3am.Data.Entities
{
    public class Device
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Image { get; set; }
        public bool Available { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public int IdentificationNum { get; set; }
        [Required]
        [MaxLength(256)]
        public string OS { get; set; }
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        [Required]
        [MaxLength(256)]
        public string SerialNum { get; set; }
        [Required]
        public DateTime Purchased { get; set; }
        [Required]
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public bool Active { get; set; }
        public List<Event> Events { get; set; }
        public List<Reservation> Reservations { get; set; }
    }
}

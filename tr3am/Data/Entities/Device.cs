using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace tr3am.Data.Entities
{
    public class Device
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public int IdentificationNum { get; set; }
        public string OS { get; set; }
        public int OfficeId { get; set; }
        public Office Office { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string SerialNum { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        public string Vendor { get; set; }
        public float TaxRate { get; set; }
        public bool Active { get; set; }
        public List<Event> Events { get; set; }
        public List<Reservation> Reservations { get; set; }
    }
}

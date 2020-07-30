using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public int OrganizationId { get; set; }

        public Organization Organization { get; set; }

        public List<Sale> Sales { get; set; }
    }
}

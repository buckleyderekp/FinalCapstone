using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models
{
    public class Organization
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string OrgUID { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; }

    }
}

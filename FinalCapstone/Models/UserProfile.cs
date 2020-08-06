using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }


        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }

        public List<Sale> Sales { get; set; } 
    }
}

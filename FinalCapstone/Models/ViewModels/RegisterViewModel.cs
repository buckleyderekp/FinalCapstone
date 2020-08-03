using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models.ViewModels
{
    public class RegisterViewModel
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
        [MaxLength(5)]
        public string OrganizationCode { get; set; }

    }
}

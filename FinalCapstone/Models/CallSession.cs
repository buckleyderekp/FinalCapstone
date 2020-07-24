using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models
{
    public class CallSession
    {
        public int Id { get; set; }

        [Required]
        public int Calls { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public int Contacts { get; set; }

        [Required]
        public int AppointmentsBooked { get; set; }

        [Required]
        public int CallGoal { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}

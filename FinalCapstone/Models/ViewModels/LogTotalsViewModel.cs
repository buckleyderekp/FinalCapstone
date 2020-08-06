using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models.ViewModels
{
    public class LogTotalsViewModel
    {
        public int Commission { get; set; }

        public int Calls { get; set; }

        public int Appointments { get; set; }

        public int AppointmentsKept { get; set; }

        public int Presentations { get; set; }

        public  int Contacts { get; set; }

        public int Closes { get; set; }

        public int CallGoals { get; set; }
    }
}

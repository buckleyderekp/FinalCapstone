using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models.ViewModels
{
    public class SaleSnapshotViewModel
    {

        public decimal Commission { get; set; }

        public decimal Calls { get; set; }

        public decimal Appointments { get; set; }

        public decimal Presentations { get; set; }

        public decimal Contacts { get; set; }

        public decimal Closes { get; set; }

    }
}

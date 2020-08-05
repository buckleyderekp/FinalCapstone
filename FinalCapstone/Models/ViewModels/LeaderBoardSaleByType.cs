using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models.ViewModels
{
    public class LeaderBoardSaleByType
    {
        public int NumberOfSales { get; set; }

        public Product Product { get; set; }

        public string UserName { get; set; }
    }
}

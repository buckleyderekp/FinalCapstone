using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Models.ViewModels
{
    public class LeaderBoardSaleByType
    {

        public Product Product { get; set; }

        public List<int> Users { get; set; }

    }
    public class LeaderboardUser
    {
        public int NumberOfSales { get; set; }

        public string UserName { get; set; }
    }
}

using FinalCapstone.Data;
using FinalCapstone.Models;
using FinalCapstone.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class SaleRepository
    {

        private readonly ApplicationDBContext _context;

        public SaleRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public List<Sale> GetByUserId(int id, DateTime startdate)
        {
            return _context.Sales
                            .Where(s => s.UserProfileId == id)
                            .Where(s => s.Date >= startdate)
                            .Include(s => s.Product )
                            .OrderByDescending(s => s.Date)
                            .ToList();
        }

        public void Add(Sale sale)
        {
            _context.Add(sale);
            _context.SaveChanges();
        }

        public void Update(Sale sale)
        {
            _context.Entry(sale).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var sale = GetById(id);
            _context.Remove(sale);
            _context.SaveChanges();
        }

        public Sale GetById(int id)
        {
            return _context.Sales
                           .FirstOrDefault(s => s.Id == id);
        }

        public int GetSalesTotal(int id, DateTime startdate)
        {
            return _context.Sales
                            .Where(s => s.UserProfileId == id)
                            .Where(s => s.Date >= startdate)
                            .Count();

        }

        //public IEnumerable<LeaderBoardSaleByType> GetSalesTotalForUsers(int id, DateTime startdate)
        //{
        //    return _context.Sales
        //                    .Include(s => s.UserProfile)
        //                    .Where(s => s.UserProfile.OrganizationId == id)
        //                    .Where(s => s.Date >= startdate)
        //                    //.GroupBy(s => new
        //                    //{
        //                    //    s.Product.Id,
        //                    //    s.Product.ProductName,
        //                    //    s.UserProfile.Name
        //                    //})
        //                    .Select( s => new LeaderBoardSaleByType()
        //                    {
        //                        Product = s.Product,
        //                        Users =  _context.UserProfile
        //                        .Where(up => up.OrganizationId == id)
        //                        .Include(up => up.Sales)
        //                        .GroupBy( up => up.Sales.Count)

        //                    }).ToList();

        //}

        //public IEnumerable<LeaderboardSaleCount> GetUsersSalesCountByOrg(int id, DateTime startdate)
        //{
        //    return _context.Sales
        //        .Include(s => s.UserProfile)
        //        .Where(s => s.UserProfile.OrganizationId == id)
        //        .GroupBy(s => s.UserProfile.Name)
        //        .Select(s => new LeaderboardSaleCount()
        //        {
        //            NumberOfSales = _context.Sales
        //                    .Where(s => s.UserProfile.OrganizationId == id)
        //                    .Where(s => s.Date >= startdate)
        //                    .Count(),
        //            UserName = s.UserPr `edwcvfofile.Name
        //        }).ToList().Take(5);
        //}


        public int GetClosesTotal(int id, DateTime startdate)
        {
            return _context.Sales
                            .Where(s => s.UserProfileId == id)
                            .Where(s => s.Date >= startdate)
                            .Sum( s => s.Closes);

        }

        public int GetCommissionTotal(int id, DateTime startdate)
        {
            return _context.Sales
                            .Where(s => s.UserProfileId == id)
                            .Where(s => s.Date >= startdate)
                            .Sum(s => s.Commission);

        }


        public IEnumerable<SaleByTypeViewModel> GetSalesByProduct(int id, DateTime startdate)
        {
            return _context.Product
                            
                            .Select(p => 
                              new SaleByTypeViewModel()
                              {
                                  NumberOfSales = _context.Sales
                                  .Count(s => s.UserProfileId == id && s.Date >= startdate && s.ProductId == p.Id),
                                  Product = p,
 
                              }).ToList();

        }

        //public IEnumerable<LeaderBoardSaleByType> GetSalesByProductForLeaderBoard(int id, DateTime startdate)
        //{
        //    return _context.Product

        //                    .Select(p =>
        //                      new LeaderBoardSaleByType()
        //                      {
        //                          NumberOfSales = _context.Sales
        //                          .Count(s => s.UserProfileId == id && s.Date >= startdate && s.ProductId == p.Id),
        //                          Product = p,
        //                          UserName = _context.Sales
        //                          .Include(s => s.UserProfile)
        //                          .Where(s => s.UserProfile.OrganizationId == id)
                                  

        //                      }).ToList().Take(5);

        //}

        public IEnumerable<CommissionByProductViewModel> GetCommissionByProduct(int id, DateTime startdate)
        {
            return _context.Product

                            .Select(p =>
                              new CommissionByProductViewModel()
                              {
                                  NumberOfSales = _context.Sales
                                  .Where(s => s.UserProfileId == id && s.Date >= startdate && s.ProductId == p.Id)
                                  .Sum(s => s.Commission),
                                  Product = p,

                              }).ToList();

        }

    }
}

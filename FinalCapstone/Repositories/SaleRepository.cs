﻿using FinalCapstone.Data;
using FinalCapstone.Models;
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

        public IGrouping<int, Sale> GetSalesByProduct(int id, DateTime startdate)
        {
            return (IGrouping<int, Sale>)_context.Sales
                            .Where(cs => cs.UserProfileId == id)
                            .Where(cs => cs.Date >= startdate)
                            .GroupBy(s => s.ProductId);

        }

    }
}

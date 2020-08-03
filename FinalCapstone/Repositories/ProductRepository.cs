using FinalCapstone.Data;
using FinalCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class ProductRepository
    {
        private readonly ApplicationDBContext _context;

        public ProductRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public List<Product> GetByOrganizationId(int id)
        {
            return _context.Product
                            .Where(p => p.OrganizationId == id)
                            .ToList();
        }

    }
}

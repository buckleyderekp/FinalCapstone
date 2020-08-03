using FinalCapstone.Data;
using FinalCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class OrganizationRepository
    {
        private readonly ApplicationDBContext _context;

        public OrganizationRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public Organization GetByOrganizationUID(string uid)
        {
            return _context.Organization
                            .FirstOrDefault(o => o.OrgUID == uid);
                        
        }
    }
}

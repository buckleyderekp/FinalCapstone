using FinalCapstone.Data;
using FinalCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class CallSessionRepository
    {
        private readonly ApplicationDBContext _context;

        public CallSessionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public List<CallSession> GetById(int id)
        {
            return _context.CallSession
                            .Where(cs => cs.UserProfileId == id)
                            .OrderByDescending(cs => cs.Date) 
                            .ToList();
        }
    }
}

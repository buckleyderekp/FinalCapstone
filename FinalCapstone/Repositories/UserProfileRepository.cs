using FinalCapstone.Data;
using FinalCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class UserProfileRepository
    {

        private readonly ApplicationDBContext _context;

        public UserProfileRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public UserProfile GetById(int id)
        {
            return _context.UserProfile.FirstOrDefault(u => u.Id == id);
        }

        public void Add(UserProfile user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public void Update(UserProfile user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = GetById(id);
            _context.UserProfile.Remove(user);
            _context.SaveChanges();
        }

        public UserProfile GetByFirebaseId(string FirebaseUserId)
        {
            return _context.UserProfile.FirstOrDefault(p => p.FirebaseUserId == FirebaseUserId);
        }
    }
}

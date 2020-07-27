using FinalCapstone.Data;
using FinalCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Repositories
{
    public class AppointmentSessionRepository
    {
        private readonly ApplicationDBContext _context;

        public AppointmentSessionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public List<AppointmentSession> GetByUserId(int id, DateTime startdate)
        {
            return _context.AppointmentSession
                            .Where(a => a.UserProfileId == id)
                            .Where(a => a.Date >= startdate)
                            .OrderByDescending(a => a.Date)
                            .ToList();
        }

        public void Add(AppointmentSession appointmentsession)
        {
            _context.Add(appointmentsession);
            _context.SaveChanges();
        }

        public void Update(AppointmentSession appointmentsession)
        {
            _context.Entry(appointmentsession).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var appointmentsession = GetById(id);
            _context.AppointmentSession.Remove(appointmentsession);
            _context.SaveChanges();
        }

        public AppointmentSession GetById(int id)
        {
            return _context.AppointmentSession
                           .FirstOrDefault(cs => cs.Id == id);
        }
    }

}

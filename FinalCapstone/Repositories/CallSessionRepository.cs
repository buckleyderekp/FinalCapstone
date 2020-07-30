using FinalCapstone.Data;
using FinalCapstone.Models;
using Microsoft.EntityFrameworkCore;
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

        public List<CallSession> GetByUserId(int id, DateTime startdate)
        {
            return _context.CallSession
                            .Where(cs => cs.UserProfileId == id)
                            .Where(cs => cs.Date >= startdate)
                            .OrderBy(cs => cs.Date) 
                            .ToList();
        }

        public int GetAppointmentBookedTotal(int id, DateTime startdate)
        {
            return _context.CallSession
                            .Where(cs => cs.UserProfileId == id)
                            .Where(cs => cs.Date >= startdate)
                            .Sum(cs => cs.AppointmentsBooked);

        }

        public int GetContactsTotal(int id, DateTime startdate)
        {
            return _context.CallSession
                            .Where(cs => cs.UserProfileId == id)
                            .Where(cs => cs.Date >= startdate)
                            .Sum(cs => cs.Contacts);

        }

        public int GetCallsTotal(int id, DateTime startdate)
        {
            return _context.CallSession
                            .Where(cs => cs.UserProfileId == id)
                            .Where(cs => cs.Date >= startdate)
                            .Sum(cs => cs.Calls);

        }



        public void Add(CallSession callsession)
        {
            _context.Add(callsession);
            _context.SaveChanges();
        }

        public void Update(CallSession callsession)
        {
            _context.Entry(callsession).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var callsession = GetById(id);
            _context.CallSession.Remove(callsession);
            _context.SaveChanges();
        }

        public CallSession GetById(int id)
        {
            return _context.CallSession
                           .FirstOrDefault(cs => cs.Id == id);
        }
    }
}

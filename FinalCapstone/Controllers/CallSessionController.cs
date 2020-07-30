using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalCapstone.Data;
using FinalCapstone.Models;
using FinalCapstone.Models.ViewModels;
using FinalCapstone.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallSessionController : ControllerBase
    {
        private readonly CallSessionRepository _callSessionRepo;
        public CallSessionController(ApplicationDBContext context)
        {
            _callSessionRepo = new CallSessionRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var callSessions = _callSessionRepo.GetByUserId(id, startdate);
            if (callSessions == null)
            {
                return NotFound();
            }
            return Ok(callSessions);
        }

        [HttpPost]
        public IActionResult CallSession(CallSession callsession)
        {
            _callSessionRepo.Add(callsession);
            return CreatedAtAction("Get", new { id = callsession.Id }, callsession);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, CallSession callsession)
        {
            if (id != callsession.Id)
            {
                return BadRequest();
            }

            _callSessionRepo.Update(callsession);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _callSessionRepo.Delete(id);
            return NoContent();
        }

        [HttpGet("{id}/contactratio")]
        public IActionResult GetContactRatio(int id, int days)
        {
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var contacts = _callSessionRepo.GetContactsTotal(id, startdate);
            var appointmentsBooked = _callSessionRepo.GetAppointmentBookedTotal(id, startdate);



            var appointmentRatioView = new ContactRatioViewModel()
            {
                Contacts = contacts,
                AppointmentsBooked = appointmentsBooked
            };
            return Ok(appointmentRatioView);

        }

    }
}

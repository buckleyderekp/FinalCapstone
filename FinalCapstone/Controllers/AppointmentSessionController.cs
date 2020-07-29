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
    public class AppointmentSessionController : ControllerBase
    {
        private readonly AppointmentSessionRepository _appointmentSessionRepo;
        private readonly CallSessionRepository _callSessionRepo;
        public AppointmentSessionController(ApplicationDBContext context)
        {
            _appointmentSessionRepo = new AppointmentSessionRepository(context);
            _callSessionRepo = new CallSessionRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentSessions = _appointmentSessionRepo.GetByUserId(id, startdate);
            if (appointmentSessions == null)
            {
                return NotFound();
            }
            return Ok(appointmentSessions);
        }

        [HttpGet("{id}/appointmentratio")]
        public IActionResult GetAppointmentRatio(int id, int days)
        {
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentsKept = _appointmentSessionRepo.GetAppointmentKeptTotal(id, startdate);
            var appointmentsBooked = _callSessionRepo.GetAppointmentBookedTotal(id, startdate);



            var appointmentRatioView = new AppointmentRatioViewModel()
            {
                AppointmentsKept = appointmentsKept,
                AppointmentsBooked = appointmentsBooked
            };
            return Ok(appointmentRatioView);

        }

        [HttpGet("{id}/presentationratio")]
        public IActionResult GetPresentationRatio(int id, int days)
        {
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentsKept = _appointmentSessionRepo.GetAppointmentKeptTotal(id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(id, startdate);



            var presentationsRatioView = new PresentationsRatioViewModel()
            {
                AppointmentsKept = appointmentsKept,
                Presentations = presentations
            };
            return Ok(presentationsRatioView);

        }

        [HttpPost]
        public IActionResult CallSession(AppointmentSession appointmentsession)
        {
            _appointmentSessionRepo.Add(appointmentsession);
            return CreatedAtAction("Get", new { id = appointmentsession.Id }, appointmentsession);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, AppointmentSession appointmentsession)
        {
            if (id != appointmentsession.Id)
            {
                return BadRequest();
            }

            _appointmentSessionRepo.Update(appointmentsession);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _appointmentSessionRepo.Delete(id);
            return NoContent();
        }
    }
}

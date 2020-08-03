using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly UserProfileRepository _userProfileRepo;
        public AppointmentSessionController(ApplicationDBContext context)
        {
            _appointmentSessionRepo = new AppointmentSessionRepository(context);
            _callSessionRepo = new CallSessionRepository(context);
            _userProfileRepo = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentSessions = _appointmentSessionRepo.GetByUserId(currentUser.Id, startdate);
            if (appointmentSessions == null)
            {
                return NotFound();
            }
            return Ok(appointmentSessions);
        }

        [HttpGet("appointmentratio")]
        public IActionResult GetAppointmentRatio(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentsKept = _appointmentSessionRepo.GetAppointmentKeptTotal(currentUser.Id, startdate);
            var appointmentsBooked = _callSessionRepo.GetAppointmentBookedTotal(currentUser.Id, startdate);
            var appointmentRatioView = new AppointmentRatioViewModel()
            {
                AppointmentsKept = appointmentsKept,
                AppointmentsBooked = appointmentsBooked
            };
            return Ok(appointmentRatioView);

        }

        [HttpGet("presentationratio")]
        public IActionResult GetPresentationRatio(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var appointmentsKept = _appointmentSessionRepo.GetAppointmentKeptTotal(currentUser.Id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(currentUser.Id, startdate);
            var presentationsRatioView = new PresentationsRatioViewModel()
            {
                AppointmentsKept = appointmentsKept,
                Presentations = presentations
            };
            return Ok(presentationsRatioView);

        }

        [HttpPost]
        public IActionResult AppointmentSession(AppointmentSession appointmentsession)
        {
            var currentUser = GetCurrentUserProfile();
            if(currentUser.Id == appointmentsession.UserProfileId)
            {
            _appointmentSessionRepo.Add(appointmentsession);
            return CreatedAtAction("Get", new { id = appointmentsession.Id }, appointmentsession);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put(AppointmentSession appointmentsession)
        {

            var currentUser = GetCurrentUserProfile();
            if (currentUser.Id == appointmentsession.UserProfileId)
            {
                _appointmentSessionRepo.Update(appointmentsession);
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var appointmentSession = _appointmentSessionRepo.GetById(id);
            var currentUser = GetCurrentUserProfile();
            if (appointmentSession.UserProfileId == currentUser.Id)
            {
                _appointmentSessionRepo.Delete(id);
                return NoContent();
            }
            else
            {
                return Unauthorized();
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseId(firebaseUserId);
        }
    }
}

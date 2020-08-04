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
    public class CallSessionController : ControllerBase
    {
        private readonly CallSessionRepository _callSessionRepo;
        private readonly UserProfileRepository _userProfileRepo;
        public CallSessionController(ApplicationDBContext context)
        {
            _callSessionRepo = new CallSessionRepository(context);
            _userProfileRepo = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var callSessions = _callSessionRepo.GetByUserId(currentUser.Id, startdate);
            return Ok(callSessions);
 
        }

        [HttpPost]
        public IActionResult CallSession(CallSession callsession)
        {
            var currentUser = GetCurrentUserProfile();
            callsession.UserProfileId = currentUser.Id;

                _callSessionRepo.Add(callsession);
                return CreatedAtAction("Get", new { id = callsession.Id }, callsession);

        }

        [HttpPut]
        public IActionResult Put(CallSession callsession)
        {
            var currentUser = GetCurrentUserProfile();
            callsession.UserProfileId = currentUser.Id;
            _callSessionRepo.Update(callsession);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var callSession = _callSessionRepo.GetById(id);
            var currentUser = GetCurrentUserProfile();
            if(callSession.UserProfileId == currentUser.Id)
                {
                    _callSessionRepo.Delete(id);
                    return NoContent();
                }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("contactratio")]
        public IActionResult GetContactRatio(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var contacts = _callSessionRepo.GetContactsTotal(currentUser.Id, startdate);
            var appointmentsBooked = _callSessionRepo.GetAppointmentBookedTotal(currentUser.Id, startdate);
            var appointmentRatioView = new ContactRatioViewModel()
            {
                Contacts = contacts,
                AppointmentsBooked = appointmentsBooked
            };


            return Ok(appointmentRatioView);

        }

        [HttpGet("callcomparison")]
        public IActionResult GetCallComparison(int days)
        {
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var currentUser = GetCurrentUserProfile();

            var callComparison = _callSessionRepo.GetCallComparisonByUserId(currentUser.Id, startdate);


            return Ok(callComparison);

        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseId(firebaseUserId);
        }

    }
}

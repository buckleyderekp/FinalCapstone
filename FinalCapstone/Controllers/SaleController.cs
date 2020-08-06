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
    public class SaleController : ControllerBase
    {

        private readonly SaleRepository _saleRepo;
        private readonly AppointmentSessionRepository _appointmentSessionRepo;
        private readonly CallSessionRepository _callSessionRepo;
        private readonly UserProfileRepository _userProfileRepo;
        public SaleController(ApplicationDBContext context)
        {
            _saleRepo = new SaleRepository(context);
            _appointmentSessionRepo = new AppointmentSessionRepository(context);
            _callSessionRepo = new CallSessionRepository(context);
            _userProfileRepo = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetByUserId(currentUser.Id, startdate);
            if (sales == null)
            {
                return NotFound();
            }
            return Ok(sales);
        }

        [HttpGet("salesbyproduct")]
        public IActionResult GetSalesByProduct(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var salesByProduct = _saleRepo.GetSalesByProduct(currentUser.Id, startdate);

            return Ok(salesByProduct);
        }

        [HttpGet("commissionbyproduct")]
        public IActionResult GetCommissionByProduct(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var commissionByProduct = _saleRepo.GetCommissionByProduct(currentUser.Id, startdate);

            return Ok(commissionByProduct);
        }

        [HttpGet("allLogtotals")]
        public IActionResult GetAllLogTotals(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(currentUser.Id, startdate);
            var appointmentsKept = _appointmentSessionRepo.GetAppointmentKeptTotal(currentUser.Id, startdate);
            var calls = _callSessionRepo.GetCallsTotal(currentUser.Id, startdate);
            var callGoal = _callSessionRepo.GetCallGoalsTotal(currentUser.Id, startdate);
            var contacts = _callSessionRepo.GetContactsTotal(currentUser.Id, startdate);
            var appointments = _callSessionRepo.GetAppointmentBookedTotal(currentUser.Id, startdate);
            var closes = _saleRepo.GetClosesTotal(currentUser.Id, startdate);
            var commission = _saleRepo.GetCommissionTotal(currentUser.Id, startdate);

            var logTotals = new LogTotalsViewModel()
            {
                Commission = commission,
                Calls = calls,
                Appointments = appointments,
                AppointmentsKept = appointmentsKept,
                Presentations = presentations,
                Contacts = contacts,
                Closes = closes,
                CallGoals = callGoal
            };

            return Ok(logTotals);

        }

        [HttpGet("closingratio")]
        public IActionResult GetClosingRatio(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetSalesTotal(currentUser.Id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(currentUser.Id, startdate);

            var closingRatioView = new ClosingRatioViewModel()
            {
                Presentations = presentations,
                Sales = sales
            };
            return Ok(closingRatioView);
        }

        [HttpGet("salesnapshot")]
        public IActionResult GetSalesSnapShot(int days)
        {
            var currentUser = GetCurrentUserProfile();
            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetSalesTotal(currentUser.Id, startdate);
            var closes = _saleRepo.GetClosesTotal(currentUser.Id, startdate);
            var commission = _saleRepo.GetCommissionTotal(currentUser.Id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(currentUser.Id, startdate);
            var calls = _callSessionRepo.GetCallsTotal(currentUser.Id, startdate);
            var contacts = _callSessionRepo.GetContactsTotal(currentUser.Id, startdate);
            var appointments = _callSessionRepo.GetAppointmentBookedTotal(currentUser.Id, startdate);

            var appointmentsPerSale = (sales == 0) ? 0 : Decimal.Divide(appointments, sales);
            var contactsPerSale = (sales == 0) ? 0 : Decimal.Divide(contacts, sales);
            var callsPerSale = (sales == 0) ? 0 : Decimal.Divide(calls, sales);
            var presentationsPerSale = (sales == 0) ? 0 : Decimal.Divide(presentations, sales);
            var commissionPerSale = (sales == 0) ? 0 : Decimal.Divide(commission, sales);
            var closesPerSale = (sales == 0) ? 0 : Decimal.Divide(closes, sales);

            var salesSnapshotView = new SaleSnapshotViewModel()
            {
                Presentations = Decimal.Round(presentationsPerSale),
                Commission = Decimal.Round(commissionPerSale),
                Calls = Decimal.Round(callsPerSale),
                Contacts = Decimal.Round(contactsPerSale),
                Appointments = Decimal.Round(appointmentsPerSale),
                Closes = Decimal.Round(closesPerSale)
            };
            return Ok(salesSnapshotView);
        }

        [HttpPost]
        public IActionResult Sale(Sale sale)
        {
            var currentUser = GetCurrentUserProfile();
            sale.UserProfileId = currentUser.Id;
            _saleRepo.Add(sale);
                return CreatedAtAction("Get", new { id = sale.Id }, sale);
 
        }

        [HttpPut]
        public IActionResult Put(Sale sale)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id == sale.UserProfileId)
            {
                _saleRepo.Update(sale);
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
            var currentUser = GetCurrentUserProfile();
            var sale = _saleRepo.GetById(id);

            if (currentUser.Id == sale.UserProfileId)
            {
            _saleRepo.Delete(id);
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

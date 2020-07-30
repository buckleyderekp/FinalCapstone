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
    public class SaleController : ControllerBase
    {

        private readonly SaleRepository _saleRepo;
        private readonly AppointmentSessionRepository _appointmentSessionRepo;
        private readonly CallSessionRepository _callSessionRepo;
        public SaleController(ApplicationDBContext context)
        {
            _saleRepo = new SaleRepository(context);
            _appointmentSessionRepo = new AppointmentSessionRepository(context);
            _callSessionRepo = new CallSessionRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetByUserId(id, startdate);
            if (sales == null)
            {
                return NotFound();
            }
            return Ok(sales);
        }

        [HttpGet("{id}/salesbyproduct")]
        public IActionResult GetSalesByProduct(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var salesByProduct = _saleRepo.GetSalesByProduct(id, startdate);

            return Ok(salesByProduct);
        }

        [HttpGet("{id}/commissionbyproduct")]
        public IActionResult GetCommissionByProduct(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var commissionByProduct = _saleRepo.GetCommissionByProduct(id, startdate);

            return Ok(commissionByProduct);
        }

        [HttpGet("{id}/closingratio")]
        public IActionResult GetClosingRatio(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetSalesTotal(id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(id, startdate);

            var closingRatioView = new ClosingRatioViewModel()
            {
                Presentations = presentations,
                Sales = sales
            };
            return Ok(closingRatioView);
        }

        [HttpGet("{id}/salesnapshot")]
        public IActionResult GetSalesSnapShot(int id, int days)
        {

            var startdate = DateTime.Now - TimeSpan.FromDays(days);
            var sales = _saleRepo.GetSalesTotal(id, startdate);
            var closes = _saleRepo.GetClosesTotal(id, startdate);
            var commission = _saleRepo.GetCommissionTotal(id, startdate);
            var presentations = _appointmentSessionRepo.GetPresentationsTotal(id, startdate);
            var calls = _callSessionRepo.GetCallsTotal(id, startdate);
            var contacts = _callSessionRepo.GetContactsTotal(id, startdate);
            var appointments = _callSessionRepo.GetAppointmentBookedTotal(id, startdate);

            var appointmentsPerSale = Decimal.Divide(appointments, sales);
            var contactsPerSale = Decimal.Divide(contacts, sales);
            var callsPerSale = Decimal.Divide(calls, sales);
            var presentationsPerSale = Decimal.Divide(presentations, sales);
            var commissionPerSale = Decimal.Divide(commission, sales);
            var closesPerSale = Decimal.Divide(closes, sales);

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
            _saleRepo.Add(sale);
            return CreatedAtAction("Get", new { id = sale.Id }, sale);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _saleRepo.Update(sale);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _saleRepo.Delete(id);
            return NoContent();
        }


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalCapstone.Data;
using FinalCapstone.Models;
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
        public SaleController(ApplicationDBContext context)
        {
            _saleRepo = new SaleRepository(context);
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

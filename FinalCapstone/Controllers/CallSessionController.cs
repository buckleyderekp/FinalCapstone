using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalCapstone.Data;
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
        public IActionResult Get(int id)
        {
            var callSessions = _callSessionRepo.GetById(id);
            if (callSessions == null)
            {
                return NotFound();
            }
            return Ok(callSessions);
        }



    }
}

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
    public class UserProfileController : ControllerBase
    {
            private readonly UserProfileRepository _userRepo;
            public UserProfileController(ApplicationDBContext context)
            {
                _userRepo = new UserProfileRepository(context);
            }

            //[HttpGet("{id}")]
            //public IActionResult Get(int id)
            //{
            //    var user = _userRepo.GetById(id);
            //    if (user == null)
            //    {
            //        return NotFound();
            //    }
            //    return Ok(user);
            //}

            [HttpPost]
            public IActionResult Post(UserProfile user)
            {
                _userRepo.Add(user);
                return CreatedAtAction("Get", new { id = user.Id }, user);
            }

            [HttpPut("{id}")]
            public IActionResult Put(int id, UserProfile user)
            {
                if (id != user.Id)
                {
                    return BadRequest();
                }

                _userRepo.Update(user);
                return NoContent();
            }

            [HttpDelete("{id}")]
            public IActionResult Delete(int id)
            {
                _userRepo.Delete(id);
                return NoContent();
            }

        [HttpGet("{FirebaseId}")]
        public IActionResult Get(string FirebaseId)
        {
            var user = _userRepo.GetByFirebaseId(FirebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

    }
    }

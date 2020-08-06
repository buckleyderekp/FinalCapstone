using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalCapstone.Data;
using FinalCapstone.Models;
using FinalCapstone.Models.ViewModels;
using FinalCapstone.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;

namespace FinalCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
            private readonly UserProfileRepository _userRepo;
            private readonly OrganizationRepository _organizationRepo;
        public UserProfileController(ApplicationDBContext context)
            {
                _userRepo = new UserProfileRepository(context);
                _organizationRepo = new OrganizationRepository(context);
        }


            [HttpPost]
            public IActionResult Post(RegisterViewModel registerview)
            {

            var userTypeUser = 2;
            var organization = _organizationRepo.GetByOrganizationUID(registerview.OrganizationCode);
                var user = new UserProfile()
                {
                    Name = registerview.Name,
                    OrganizationId = organization.Id,
                    Email = registerview.Email,
                    FirebaseUserId = registerview.FirebaseUserId,
                    UserTypeId = userTypeUser
                };
     
                _userRepo.Add(user);

                return CreatedAtAction("Get", new { FirebaseId = user.FirebaseUserId }, user);
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class ProductController : ControllerBase
    {

        private readonly UserProfileRepository _userProfileRepo;
        private readonly ProductRepository _productRepo;
        public ProductController(ApplicationDBContext context)
        {
            _productRepo = new ProductRepository(context);
            _userProfileRepo = new UserProfileRepository(context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
           
            var products = _productRepo.GetByOrganizationId(currentUser.OrganizationId);
            return Ok(products);

        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseId(firebaseUserId);
        }


    }
}

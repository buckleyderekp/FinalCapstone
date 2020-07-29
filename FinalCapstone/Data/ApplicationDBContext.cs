using FinalCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalCapstone.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Product> Product { get; set; }
        
        public DbSet<Organization> Organization { get; set; }

        public DbSet<UserType> UserType { get; set; }

        public DbSet<CallSession> CallSession { get; set; }

        public DbSet<AppointmentSession> AppointmentSession { get; set; }

        public DbSet<Sale> Sales  { get; set; }
    }
}

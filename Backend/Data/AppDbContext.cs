<<<<<<< HEAD
using SriLankaTransportComplaints.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace SriLankaTransportComplaints.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Complaint> Complaints => Set<Complaint>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(u => u.FirstName)
            .HasMaxLength(50);

        modelBuilder.Entity<User>()
            .Property(u => u.LastName)
            .HasMaxLength(50);

        modelBuilder.Entity<User>()
            .Property(u => u.PhoneNumber)
            .HasMaxLength(10);

        modelBuilder.Entity<User>()
            .Property(u => u.NicNumber)
            .HasMaxLength(12);

        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasMaxLength(20);

        modelBuilder.Entity<Complaint>()
            .HasIndex(c => c.ReferenceNumber)
            .IsUnique();

        modelBuilder.Entity<Complaint>()
            .Property(c => c.Status)
            .HasMaxLength(20);

        modelBuilder.Entity<Complaint>()
            .HasOne(c => c.User)
            .WithMany(u => u.Complaints)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
=======
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Complaint> Complaints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Complaint>().HasData(
                new Complaint
                {
                    Id = 1,
                    ComplaintType = "Overcharging",
                    RouteNumber = "138",
                    Location = "Nugegoda",
                    ComplaintDate = DateTime.UtcNow.AddDays(-2),
                    Description = "The conductor charged Rs. 150 for a ticket that should have been Rs. 100. Did not provide a ticket.",
                    ContactNumber = "0711234567",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    UpdatedAt = DateTime.UtcNow.AddDays(-2)
                },
                new Complaint
                {
                    Id = 2,
                    ComplaintType = "Overcrowding",
                    RouteNumber = "120",
                    Location = "Piliyandala",
                    ComplaintDate = DateTime.UtcNow.AddDays(-5),
                    Description = "The bus was extremely overcrowded during evening rush hour. People were hanging from the footboard.",
                    Status = "Under Review",
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Complaint
                {
                    Id = 3,
                    ComplaintType = "Reckless Driving",
                    RouteNumber = "255",
                    Location = "Moratuwa",
                    ComplaintDate = DateTime.UtcNow.AddDays(-10),
                    Description = "Driver was racing with another bus and almost hit a pedestrian near the campus.",
                    ContactNumber = "0777654321",
                    Status = "Resolved",
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    UpdatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new Complaint
                {
                    Id = 4,
                    ComplaintType = "Bus Did Not Stop",
                    RouteNumber = "101",
                    Location = "Bambalapitiya",
                    ComplaintDate = DateTime.UtcNow.AddDays(-1),
                    Description = "Waited at the halt for 45 minutes. Three buses passed but none stopped despite having space.",
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new Complaint
                {
                    Id = 5,
                    ComplaintType = "Poor Staff Behaviour",
                    RouteNumber = "100",
                    Location = "Fort",
                    ComplaintDate = DateTime.UtcNow.AddDays(-4),
                    Description = "Conductor was extremely rude when asked to return the balance money.",
                    Status = "Under Review",
                    CreatedAt = DateTime.UtcNow.AddDays(-4),
                    UpdatedAt = DateTime.UtcNow.AddDays(-2)
                }
            );
        }
>>>>>>> f24270aa249ea3360cb0f19000f62811df0f4e20
    }
}

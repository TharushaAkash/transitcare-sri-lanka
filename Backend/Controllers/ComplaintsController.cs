using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ComplaintsController(AppDbContext context)
        {
            _context = context;
        }

        

        // FUNCTION 3: View Complaint Details
        [HttpGet("{id}")]
        public async Task<ActionResult<Complaint>> GetComplaint(int id)
        {
            var complaint = await _context.Complaints.FindAsync(id);

            if (complaint == null)
            {
                return NotFound();
            }

            return Ok(complaint);
        }



        // FUNCTION 1: Submit Complaint
        [HttpPost]
        public async Task<ActionResult<Complaint>> CreateComplaint(CreateComplaintDto dto)
        {
            var complaint = new Complaint
            {
                ComplaintType = dto.ComplaintType,
                RouteNumber = dto.RouteNumber,
                Location = dto.Location,
                ComplaintDate = dto.ComplaintDate,
                Description = dto.Description,
                ContactNumber = dto.ContactNumber,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComplaint), new { id = complaint.Id }, complaint);
        }

        
        // FUNCTION 3: Update Complaint Status
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComplaintStatus(int id, UpdateComplaintStatusDto dto)
        {
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null)
            {
                return NotFound();
            }

            // Allowed statuses validation
            var allowedStatuses = new[] { "Pending", "Under Review", "Resolved" };
            if (!allowedStatuses.Contains(dto.Status))
            {
                return BadRequest("Invalid status.");
            }

            complaint.Status = dto.Status;
            complaint.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Optional DELETE endpoint for completeness, though not strictly required by the 4 functions.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null)
            {
                return NotFound();
            }

            _context.Complaints.Remove(complaint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}

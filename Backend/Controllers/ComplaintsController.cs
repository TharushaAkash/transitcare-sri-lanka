<<<<<<< Updated upstream
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

        
=======
using SriLankaTransportComplaints.Api.Dtos;
using SriLankaTransportComplaints.Api.Models;
using SriLankaTransportComplaints.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SriLankaTransportComplaints.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ComplaintsController : ControllerBase
{
    private readonly IComplaintService _service;

    public ComplaintsController(IComplaintService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var isAdmin = User.IsInRole(UserRoles.Admin);
        var userId = GetUserId();

        var complaints = isAdmin
            ? _service.GetAll()
            : _service.GetForUser(userId);

        return Ok(complaints);
    }

    [HttpGet("search")]
    public IActionResult Search([FromQuery] SearchComplaintsQueryDto query)
    {
        var isAdmin = User.IsInRole(UserRoles.Admin);
        var userId = GetUserId();

        var complaints = _service.Search(query, userId, isAdmin);
        return Ok(complaints);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var isAdmin = User.IsInRole(UserRoles.Admin);
        var userId = GetUserId();

        var complaint = _service.GetById(id, userId, isAdmin);
        return complaint is null ? NotFound() : Ok(complaint);
    }

    [HttpPost]
    [Authorize(Roles = UserRoles.User + "," + UserRoles.Admin)]
    public IActionResult Create(CreateComplaintDto dto)
    {
        var complaint = _service.Create(GetUserId(), dto);
        return CreatedAtAction(nameof(GetById), new { id = complaint.Id }, complaint);
    }

    [HttpPut("{id:int}/status")]
    [Authorize(Roles = UserRoles.Admin)]
    public IActionResult UpdateStatus(int id, UpdateComplaintStatusDto dto)
    {
        var updated = _service.UpdateStatus(id, dto);
        return updated ? NoContent() : NotFound();
    }

    private int GetUserId()
    {
        var raw = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(raw, out var id) ? id : 0;
>>>>>>> Stashed changes
    }
}

<<<<<<< Updated upstream
namespace TransitCareBackend.Models;
=======
namespace SriLankaTransportComplaints.Api.Models;
>>>>>>> Stashed changes

public class Complaint
{
    public int Id { get; set; }
<<<<<<< Updated upstream
    public string ComplaintType { get; set; } = "";
    public string RouteNumber { get; set; } = "";
    public string Location { get; set; } = "";
    public DateOnly ComplaintDate { get; set; }
    public string Description { get; set; } = "";
    public string? ContactNumber { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public byte[]? PhotoData { get; set; }
    public string? PhotoContentType { get; set; }
    public string? PhotoFileName { get; set; }
=======
    public string ReferenceNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string RouteOrLocation { get; set; } = string.Empty;
    public string Status { get; set; } = ComplaintStatuses.Submitted;
    public string? AdminResponse { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
>>>>>>> Stashed changes
}

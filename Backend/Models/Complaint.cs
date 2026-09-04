namespace TransitCareBackend.Models;

public class Complaint
{
    public int Id { get; set; }
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
}

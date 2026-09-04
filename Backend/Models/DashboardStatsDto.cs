namespace Backend.Models;

public class DashboardStatsDto
{
    public int TotalComplaints { get; set; }
    public int PendingComplaints { get; set; }
    public int UnderReviewComplaints { get; set; }
    public int ResolvedComplaints { get; set; }
    public string MostCommonComplaintType { get; set; } = string.Empty;
    public string MostReportedRoute { get; set; } = string.Empty;
}
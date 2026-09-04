namespace Backend.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalComplaints { get; set; }
        public int PendingComplaints { get; set; }
        public int UnderReviewComplaints { get; set; }
        public int ResolvedComplaints { get; set; }
        public string MostCommonComplaintType { get; set; }
        public string MostReportedRoute { get; set; }
    }
}

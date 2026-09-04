using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class CreateComplaintDto
    {
        [Required(ErrorMessage = "Please select a complaint type.")]
        public string ComplaintType { get; set; }

        [Required(ErrorMessage = "Please enter the route number.")]
        public string RouteNumber { get; set; }

        [Required(ErrorMessage = "Please enter the location.")]
        public string Location { get; set; }

        [Required(ErrorMessage = "Please enter the date.")]
        public DateTime ComplaintDate { get; set; }

        [Required(ErrorMessage = "Please enter a description.")]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters.")]
        public string Description { get; set; }

        public string? ContactNumber { get; set; }
    }

    public class UpdateComplaintStatusDto
    {
        [Required]
        public string Status { get; set; }
    }
}
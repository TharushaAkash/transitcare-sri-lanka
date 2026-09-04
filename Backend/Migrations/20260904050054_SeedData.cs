using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "complaints",
                columns: new[] { "id", "complaint_date", "complaint_type", "contact_number", "created_at", "description", "location", "route_number", "status", "updated_at" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 9, 2, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5449), "Overcharging", "0711234567", new DateTime(2026, 9, 2, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5456), "The conductor charged Rs. 150 for a ticket that should have been Rs. 100. Did not provide a ticket.", "Nugegoda", "138", "Pending", new DateTime(2026, 9, 2, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5457) },
                    { 2, new DateTime(2026, 8, 30, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5459), "Overcrowding", null, new DateTime(2026, 8, 30, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5460), "The bus was extremely overcrowded during evening rush hour. People were hanging from the footboard.", "Piliyandala", "120", "Under Review", new DateTime(2026, 9, 3, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5461) },
                    { 3, new DateTime(2026, 8, 25, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5462), "Reckless Driving", "0777654321", new DateTime(2026, 8, 25, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5463), "Driver was racing with another bus and almost hit a pedestrian near the campus.", "Moratuwa", "255", "Resolved", new DateTime(2026, 9, 1, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5464) },
                    { 4, new DateTime(2026, 9, 3, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5465), "Bus Did Not Stop", null, new DateTime(2026, 9, 3, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5466), "Waited at the halt for 45 minutes. Three buses passed but none stopped despite having space.", "Bambalapitiya", "101", "Pending", new DateTime(2026, 9, 3, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5466) },
                    { 5, new DateTime(2026, 8, 31, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5468), "Poor Staff Behaviour", null, new DateTime(2026, 8, 31, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5469), "Conductor was extremely rude when asked to return the balance money.", "Fort", "100", "Under Review", new DateTime(2026, 9, 2, 5, 0, 54, 141, DateTimeKind.Utc).AddTicks(5469) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "complaints",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "complaints",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "complaints",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "complaints",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "complaints",
                keyColumn: "id",
                keyValue: 5);
        }
    }
}

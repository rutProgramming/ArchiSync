using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiSyncServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class projectdesciption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Projects");
        }
    }
}

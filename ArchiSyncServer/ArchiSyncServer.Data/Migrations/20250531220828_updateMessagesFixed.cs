using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiSyncServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateMessagesFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DocumentId",
                table: "Comments",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "CommentId",
                table: "Comments",
                newName: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ProjectId",
                table: "Comments",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Projects_ProjectId",
                table: "Comments",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Projects_ProjectId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_ProjectId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_UserId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Comments",
                newName: "DocumentId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Comments",
                newName: "CommentId");
        }
    }
}

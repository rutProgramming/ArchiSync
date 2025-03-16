using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiSyncServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class Progects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_File_Folder_FolderId",
                table: "File");

            migrationBuilder.DropTable(
                name: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_File_FolderId",
                table: "File");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "File");

            migrationBuilder.AddColumn<int>(
                name: "ProjectOrFolderId",
                table: "File",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "projectOrFolders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projectOrFolders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_projectOrFolders_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_projectOrFolders_projectOrFolders_ParentId",
                        column: x => x.ParentId,
                        principalTable: "projectOrFolders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectPermissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectOrFolderId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CanView = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectPermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectPermissions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectPermissions_projectOrFolders_ProjectOrFolderId",
                        column: x => x.ProjectOrFolderId,
                        principalTable: "projectOrFolders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_File_ProjectOrFolderId",
                table: "File",
                column: "ProjectOrFolderId");

            migrationBuilder.CreateIndex(
                name: "IX_projectOrFolders_OwnerId",
                table: "projectOrFolders",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_projectOrFolders_ParentId",
                table: "projectOrFolders",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectPermissions_ProjectOrFolderId",
                table: "ProjectPermissions",
                column: "ProjectOrFolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectPermissions_UserId",
                table: "ProjectPermissions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_File_projectOrFolders_ProjectOrFolderId",
                table: "File",
                column: "ProjectOrFolderId",
                principalTable: "projectOrFolders",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_File_projectOrFolders_ProjectOrFolderId",
                table: "File");

            migrationBuilder.DropTable(
                name: "ProjectPermissions");

            migrationBuilder.DropTable(
                name: "projectOrFolders");

            migrationBuilder.DropIndex(
                name: "IX_File_ProjectOrFolderId",
                table: "File");

            migrationBuilder.DropColumn(
                name: "ProjectOrFolderId",
                table: "File");

            migrationBuilder.AddColumn<int>(
                name: "FolderId",
                table: "File",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Folder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    ParentFolderId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Folder_Folder_ParentFolderId",
                        column: x => x.ParentFolderId,
                        principalTable: "Folder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Folder_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_File_FolderId",
                table: "File",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_OwnerId",
                table: "Folder",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_ParentFolderId",
                table: "Folder",
                column: "ParentFolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_File_Folder_FolderId",
                table: "File",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id");
        }
    }
}

﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiSyncServer.Data.Migrations
{
    /// <inheritdoc />
    public partial class userFolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MainFolderId",
                table: "Users",
                type: "int",
                nullable: true,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainFolderId",
                table: "Users");
        }
    }
}

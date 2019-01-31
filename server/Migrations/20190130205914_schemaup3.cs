using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class schemaup3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "Groups");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeTo",
                table: "Groups",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeFrom",
                table: "Groups",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TimeTo",
                table: "Groups",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<int>(
                name: "TimeFrom",
                table: "Groups",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<int>(
                name: "Day",
                table: "Groups",
                nullable: false,
                defaultValue: 0);
        }
    }
}

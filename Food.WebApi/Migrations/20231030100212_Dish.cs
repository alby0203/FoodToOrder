using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Dish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Restaurant_RestaurantId",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish");

            migrationBuilder.DropTable(
                name: "Restaurant");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_RestaurantId",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dish",
                table: "Dish");

            migrationBuilder.DropIndex(
                name: "IX_Dish_RestaurantId",
                table: "Dish");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "Dish");

            migrationBuilder.RenameTable(
                name: "Dish",
                newName: "Dishes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dishes",
                table: "Dishes",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Dishes",
                table: "Dishes");

            migrationBuilder.RenameTable(
                name: "Dishes",
                newName: "Dish");

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId",
                table: "Addresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RestaurantId",
                table: "Dish",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dish",
                table: "Dish",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Restaurant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurant", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_RestaurantId",
                table: "Addresses",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Dish_RestaurantId",
                table: "Dish",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Restaurant_RestaurantId",
                table: "Addresses",
                column: "RestaurantId",
                principalTable: "Restaurant",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish",
                column: "RestaurantId",
                principalTable: "Restaurant",
                principalColumn: "Id");
        }
    }
}

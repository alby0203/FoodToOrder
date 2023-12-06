using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Food.WebApi.Models;

namespace Food.WebApi.Models
{
    public class FoodToOrderContext:DbContext
    {
        public FoodToOrderContext(DbContextOptions<FoodToOrderContext> options)
            : base(options)
        {

        }

        public DbSet<Address> Addresses { get; set; } = default!;
        public DbSet<User> Users { get; set; } = null;
        public DbSet<Dish> Dishes { get; set; } = default!;
        public DbSet<Restaurant> Restaurants { get; set; } = null;
        public DbSet<Cart> Carts { get; set; } = null;
        public DbSet<Order> Orders { get; set; } = null;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dish>()
                .Property(dish => dish.IsAvailable)
                .HasConversion<bool>();


            //var intArrayConverter = new ValueConverter<int[], string>(
            //    v => string.Join(",", v),
            //    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray());

            modelBuilder.Entity<Cart>()
                .Property(e => e.Count)
                .HasConversion(v => string.Join(",", v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray().ToList());

            modelBuilder.Entity<Order>()
                .Property(e => e.Count)
                .HasConversion(v => string.Join(",", v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray().ToList());

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
        public DbSet<Food.WebApi.Models.Cart> Cart { get; set; } = default!;
        public DbSet<Food.WebApi.Models.Order> Order { get; set; } = default!;

    }
}

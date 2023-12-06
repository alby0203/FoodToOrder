using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Food.WebApi.Models
{
    public class Dish
    {
        public Dish()
        {

        }
        [Key]
        public int? Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("isavailable")]
        public bool IsAvailable { get; set; }
        public decimal Price { get; set; }
        public int? RestaurantId { get; set; }
        public virtual Restaurant? Restaurant { get; set; }
        public ICollection<Cart>? Carts { get; set; } = new List<Cart>();
        public ICollection<Order>? Orders { get; set; } = new List<Order>();
    }
}

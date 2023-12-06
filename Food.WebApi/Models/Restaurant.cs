using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Food.WebApi.Models
{
    public class Restaurant
    {
        public Restaurant()
        {

        }

        [Key]
        public int? Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("ownerid")]
        public int OwnerId { get; set; }

        public ICollection<Dish> Dishes { get; set; } = new List<Dish>();
        public ICollection<Address> Addresses { get; set; } = new List<Address>();
    }
}

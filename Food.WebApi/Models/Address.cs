using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Food.WebApi.Models
{
    public class Address
    {
        public Address()
        {
            //this.Restaurants = new HashSet<Restaurant>();
        }

        [Key]
        public int? Id {  get; set; }
        [JsonPropertyName("houseno")]
        public string HouseNo { get; set; }
        public string Street {  get; set; }
        public string Area { get; set; }
        public string City { get; set; }
        public string? State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }

        public int? UserId { get; set; }
        public virtual User? User { get; set; }
        public int? RestaurantId { get; set; }
        public virtual Restaurant? Restaurant { get; set; }

    }
}

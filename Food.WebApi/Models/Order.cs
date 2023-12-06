using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.WebApi.Models
{
    public class Order
    {
        public Order() { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public int Userid { get; set; }
        public List<int>? Count { get; set; }
        public ICollection<Dish>? Dishes { get; set; } = new List<Dish>();
    }
}

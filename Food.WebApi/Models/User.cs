﻿using System.ComponentModel.DataAnnotations;

namespace Food.WebApi.Models
{
    public class User
    {
        [Key]
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public DateTime Dob { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        //public int AddressId { get; set; }
        public Address? Address {  get; set; }
        
    }
}

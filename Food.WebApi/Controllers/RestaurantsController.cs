using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Food.WebApi.Models;

namespace Food.WebApi.Controllers
{
    [Route("restaurants")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly FoodToOrderContext _context;

        public RestaurantsController(FoodToOrderContext context)
        {
            _context = context;
        }

        // GET: api/Restaurants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
          if (_context.Restaurants == null)
          {
              return NotFound();
          }
          var all_rest= await _context.Restaurants
                .Include(r=>r.Addresses)
                .Include(r=>r.Dishes)
                .ToListAsync();
            return all_rest;
            // return await _context.Restaurants.ToListAsync();
        }

        // GET: api/Restaurants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
          if (_context.Restaurants == null)
          {
              return NotFound();
          }
            var restaurant = await _context.Restaurants
                .Include(r=>r.Addresses)
                .Include(r=>r.Dishes)
                .SingleOrDefaultAsync(u=>u.Id == id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }

        // PUT: api/Restaurants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurant(int id, Restaurant restaurant)
        {
            if (id != restaurant.Id)
            {
                return BadRequest();
            }


            var current = await _context.Restaurants
                .Include(r => r.Addresses)
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == id);

            var delAddr = new List<Address>(); 

            foreach(var a in current.Addresses)
            {
                var flag = 0;
                foreach(var b in restaurant.Addresses)
                {
                    if(b.Id == a.Id)
                    {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0)
                {
                    _context.Addresses.Remove(a);
                    await _context.SaveChangesAsync();
                    
                }
                _context.Entry(a).State = EntityState.Detached;
            }

            //foreach (var a in delAddr)
            //{
            //    _context.Addresses.Remove(a);
            //}
            


            var delDish = new List<Dish>();

            foreach (var a in current.Dishes.ToList())
            {
                var flag = 0;
                foreach (var b in restaurant.Dishes)
                {
                    if (b.Id == a.Id)
                    {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0)
                {
                    _context.Dishes.Remove(a);
                    await _context.SaveChangesAsync();
                    
                }
                _context.Entry(a).State = EntityState.Detached;
            }

            _context.Entry(current).State = EntityState.Detached;
            //foreach (var a in delDish)
            //{

            //}
            //await _context.SaveChangesAsync();



            foreach (var entry in restaurant.Dishes.ToList())
            {
                if (entry.Id == 0)
                {
                    entry.Id = null;
                    entry.RestaurantId= id;
                    _context.Dishes.Add(entry);
                }
                else
                {
                    _context.Entry(entry).State = EntityState.Modified;
                }
            }
            await _context.SaveChangesAsync();
            foreach (var entry in restaurant.Addresses)
            {
                if (entry.Id == 0)
                {
                    entry.Id = null;
                    entry.RestaurantId = id;
                    _context.Addresses.Add(entry);
                }
                else
                {
                    _context.Entry(entry).State = EntityState.Modified;
                }
                
            }
            await _context.SaveChangesAsync();
            _context.Entry(restaurant).State = EntityState.Modified;
            //_context.Entry(restaurant.Addresses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Restaurants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Restaurant>> PostRestaurant(Restaurant restaurant)
        {
          if (_context.Restaurants == null)
          {
              return Problem("Entity set 'FoodToOrderContext.Restaurants'  is null.");
          }
            restaurant.Id = null;
            foreach(var a in restaurant.Addresses)
            {
                a.Id = null;
            }
            foreach(var a in restaurant.Dishes)
            {
                a.Id = null;
            }
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestaurant", new { id = restaurant.Id }, restaurant);
        }

        // DELETE: api/Restaurants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            if (_context.Restaurants == null)
            {
                return NotFound();
            }
            var restaurant = await _context.Restaurants
                .Include(r => r.Addresses)
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == id);
            if (restaurant == null)
            {
                return NotFound();
            }
            foreach(var a in restaurant.Addresses)
            {
                _context.Addresses.Remove(a);
                //await _context.SaveChangesAsync();
            }
            foreach (var d in restaurant.Dishes)
            {
                _context.Dishes.Remove(d);
                //await _context.SaveChangesAsync();
            }

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestaurantExists(int id)
        {
            return (_context.Restaurants?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

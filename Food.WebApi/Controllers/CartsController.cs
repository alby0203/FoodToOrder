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
    [Route("carts")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly FoodToOrderContext _context;

        public CartsController(FoodToOrderContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
          if (_context.Cart == null)
          {
              return NotFound();
          }
          var all_cart = await _context.Carts
                .Include(r=>r.Dishes)
                .ToListAsync();
            return all_cart;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int? id)
        {
          if (_context.Cart == null)
          {
              return NotFound();
          }
            var cart = await _context.Carts
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int? id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }


            var current = await _context.Carts
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == id);
            //current.Amount = cart.Amount;
            foreach(var a in current.Dishes.ToList())
            {
                var flag = 0;
                foreach(var b in cart.Dishes)
                {
                    if (b.Id == a.Id)
                    {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0)
                {
                    current.Dishes.Remove(a);
                    await _context.SaveChangesAsync();
                }
                _context.Entry(a).State = EntityState.Detached;
            }

            foreach (var a in cart.Dishes)
            {
                var flag = 0;
                foreach (var b in current.Dishes)
                {
                    if (b.Id == a.Id)
                    {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0)
                {
                    current.Dishes.Add(a);
                    await _context.SaveChangesAsync();
                }
                _context.Entry(a).State = EntityState.Detached;
            }

            _context.Entry(current).State = EntityState.Detached;


            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
          if (_context.Cart == null)
          {
              return Problem("Entity set 'FoodToOrderContext.Cart'  is null.");
          }
            _context.Cart.Add(cart);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CartExists(cart.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int? id)
        {
            if (_context.Cart == null)
            {
                return NotFound();
            }
            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int? id)
        {
            return (_context.Cart?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

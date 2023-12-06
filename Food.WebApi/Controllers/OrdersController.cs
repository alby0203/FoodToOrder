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
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FoodToOrderContext _context;

        public OrdersController(FoodToOrderContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
          var all_orders = await _context.Orders
                .Include(r => r.Dishes)
                .ToListAsync();
            return all_orders;
            //return await _context.Order.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var order = await _context.Orders
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == id); 

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
          if (_context.Order == null)
          {
              return Problem("Entity set 'FoodToOrderContext.Order'  is null.");
          }
            Order tempOrder = new Order();
            tempOrder.Id = order.Id;
            tempOrder.Amount = order.Amount;
            tempOrder.Count = order.Count;
            tempOrder.Date = order.Date;
            tempOrder.Userid = order.Userid;

            _context.Order.Add(tempOrder);
            await _context.SaveChangesAsync();

            var current = await _context.Orders
                .Include(r => r.Dishes)
                .SingleOrDefaultAsync(u => u.Id == tempOrder.Id);
            
            foreach( var d in order.Dishes)
            {
                d.Carts = null; 
                current.Dishes.Add(d);
                await _context.SaveChangesAsync();
                _context.Entry(d).State = EntityState.Detached;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Order == null)
            {
                return NotFound();
            }
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Order?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Food.WebApi.Models;
using Azure;
using Food.WebApi.Services;
using Food.WebApi.Migrations;
using User = Food.WebApi.Models.User;
using Microsoft.AspNetCore.Authorization;

namespace Food.WebApi.Controllers
{
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FoodToOrderContext _context;
        private readonly IConfiguration iconfig;

        public UsersController(FoodToOrderContext context, IConfiguration iconfig)
        {
            _context = context;
            this.iconfig = iconfig;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
          var all_users = await _context.Users
                .Include(r=>r.Address)
                .ToListAsync();
            return all_users;
            //return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users
                .Include(r=>r.Address)
                .SingleOrDefaultAsync(u=>u.Id==id);

            if (user == null)
            {
                return NotFound();
            }
            

            return user;
        }

        [HttpGet("{area}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserArea(string area)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = await _context.Users
                .Include(r => r.Address)
                .ToListAsync();

            users= users.Where(u=>u.Address.Area==area).ToList();

            if (users == null)
            {
                return NotFound();
            }


            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.Entry(user.Address).State = EntityState.Modified;

            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.Users == null)
          {
              return Problem("Entity set 'FoodToOrderContext.Users'  is null.");
          }
            user.Id = null;
            user.Address.Id = null;
            //Console.WriteLine(user);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'FoodToOrderContext.Users'  is null.");
            }
        

            var all_users = await _context.Users.ToListAsync();
            var userFound = all_users.FirstOrDefault(x =>
            string.Equals(x.Email, user.Email)
            && string.Equals(x.Password, user.Password));
            if (userFound == null)
            {
                
                return NotFound();
            }
            TokenService tokenService = new TokenService();
            var ttoken = tokenService.BuildToken(iconfig["Jwt:Key"], iconfig["Jwt:Issuer"], iconfig["Jwt:Audience"], userFound);
            //await response.WriteAsJsonAsync(new { token = token });
            //return;


            //Console.WriteLine(user);
            //_context.Users.Add(user);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("UserLogin", new { t = ttoken });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users
                .Include(r => r.Address)
                .SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            var addr = await _context.Addresses.FindAsync(user.Address.Id);
            if (addr == null)
            {
                return NotFound();
            }

            _context.Addresses.Remove(addr);
            await _context.SaveChangesAsync();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

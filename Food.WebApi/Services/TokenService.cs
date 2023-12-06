using Food.WebApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Food.WebApi.Services
{
    public interface ITokenService
    {
        string BuildToken(string key, string issuer, string audience, User user);
    }
    public class TokenService : ITokenService
    {
        private TimeSpan ExpiryDuration = new TimeSpan(0, 30, 0);
        public string BuildToken(string key, string issuer, string audience, User user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.NameIdentifier,
        Guid.NewGuid().ToString())
     };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, audience, claims,
                expires: DateTime.Now.Add(ExpiryDuration), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}

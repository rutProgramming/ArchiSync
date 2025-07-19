using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ArchiSyncServer.Api
{
   
    public class LoggingAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler _defaultHandler = new();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            if (context.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                Console.WriteLine($"🔐 Authorization Header: {authHeader}");
            }
            else
            {
                Console.WriteLine("⚠️ No Authorization header found.");
            }
            if (!authorizeResult.Succeeded)
            {
                Console.WriteLine($"❌ Authorization failed: User={context.User.Identity?.Name ?? "Anonymous"} | Policy={string.Join(",", policy.Requirements.Select(r => r.GetType().Name))}");
            }
            else
            {
                Console.WriteLine($"✅ Authorization succeeded: User={context.User.Identity?.Name} | Role(s)={string.Join(",", context.User.Claims.Where(c => c.Type.Contains("role")).Select(c => c.Value))}");
            }

            await _defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }

}

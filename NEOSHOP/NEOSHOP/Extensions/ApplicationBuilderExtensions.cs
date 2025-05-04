using Microsoft.AspNetCore.Builder;
using NEOSHOP.Middlewares;

namespace NEOSHOP.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionMiddleware>();
        }
    }
} 
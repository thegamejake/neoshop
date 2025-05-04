using Microsoft.EntityFrameworkCore;
using NEOSHOP.Models;
using NEOSHOP.Repositories;
using NEOSHOP.Repositories.Interfaces;
using NEOSHOP.Services;
using NEOSHOP.Services.Interfaces;
using NEOSHOP.Extensions;

var builder = WebApplication.CreateBuilder(args);

// 添加服務到容器
// 添加Entity Framework Core服務
builder.Services.AddDbContext<NEOSHOP.Models.neoshopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 依賴注入Repository層
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// 依賴注入Service層
builder.Services.AddScoped<IProductService, ProductService>();

// 添加控制器
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.WriteIndented = true;
});

// 添加跨域政策
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 配置HTTP請求管道
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 全局異常處理
app.UseGlobalExceptionHandler();

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();

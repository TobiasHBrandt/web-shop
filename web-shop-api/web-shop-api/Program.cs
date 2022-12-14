using Microsoft.EntityFrameworkCore;
using web_shop_api.Data;
using web_shop_api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddTransient<StoreContext>();
//builder.Services.AddScoped<DBInitializer>();
var app = builder.Build();
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    DBInitializer.Initialize(services);
//}

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DBInitializer.Initialize(context);
}
catch (Exception ex)
{

    logger.LogError(ex, "Problem migrating data");
}

await app.RunAsync();

app.Run();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();  // Needed for APIs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();   // Enable Swagger UI
builder.Services.AddSignalR();      // SignalR
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithOrigins("http://localhost:4200")); // Angular dev server
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();  // <-- Now it will work 🎉
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();
app.MapHub<GDL.Api.Hubs.DocumentHub>("/documentHub"); // We'll add this hub soon

app.Run();

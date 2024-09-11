using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("Games"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "GabondAPI";
    config.Title = "GabondAPI v1";
    config.Version = "v1";
});
var app = builder.Build();

app.MapGet("/games", async (GameDb db) =>
    await db.Games.ToListAsync());

app.MapGet("/games/{id}", async (int id, GameDb db) =>
    await db.Games.FindAsync(id)
        is Game game
            ? Results.Ok(game)
            : Results.NotFound());

app.MapGet("/games/{id}/players", async (int id, GameDb db) => 
	await db.Games.FindAsync(id)
		is Game game
			? Results.Ok(game.Players)
			: Results.NotFound()); 

app.MapPost("/games", async (Game game, List<Player> players, GameDb db) =>
{
	game.Players = players;
    db.games.Add(game);
    await db.SaveChangesAsync();

    return Results.Created($"/games/{game.Id}", game);
});

app.MapPut("/games/{id}", async (int id, int newScore, Player player, GameDb db) =>
{
    var game = await db.Games.FindAsync(id);

    if (game is null) return Results.NotFound();

	bool playerUpdated = GameService.UpdatePlayerScore(game, player, newScore)
	if (!playerUpdated){
		return Results.NotFound(new {Message = $"Player with name {player.Name} not found"})
	}
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/games/{id}", async (int id, GameDb db) =>
{
    if (await db.Games.FindAsync(id) is Game game)
    {
        db.Games.Remove(game);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
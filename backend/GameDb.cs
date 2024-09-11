using Microsoft.EntityFrameworkCore;

public class GameDb(DbContextOptions<GameDb> options) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
}
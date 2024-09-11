public class GameService
{
    public static Player? GetPlayerByName(Game game, Player player)
    {
        return game.Players.FirstOrDefault(p => p.Name.Equals(player.Name, StringComparison.OrdinalIgnoreCase));
    }

    public static bool UpdatePlayerScore(Game game, Player player, int newScore)
    {
        if (GetPlayerByName(game, player) == null)
        {
            return false;
        }
        player.Score += newScore;
        return true;
    }
}
class Game
{
	public int Id { get; set; }
	public int Code { get; set; }
	public List<Player> Players { get; set; } = new List<Player>();
	public int MaxPoints = 500;
	
}
public class Game
{
	public int Id { get; set; }
	public int Code { get; set; }
	public List<Player> Players { get; set; } = [];
	private int _maxPoints = 500;
	public int MaxPoints
	{
		get => _maxPoints;
		set {
			if (value > 0){
				_maxPoints = value;
			}
		}
	}
	
	
}
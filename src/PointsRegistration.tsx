import { useState } from 'react'

interface Player {
  name: string;
  score: number;
}

interface PointsRegistrationProps {
  players: Player[];
  onPointsUpdate: (players: Player[]) => void;
}

const PointsRegistration: React.FC<PointsRegistrationProps> = ({ players, onPointsUpdate }) => {
  const [roundPoints, setRoundPoints] = useState<number[]>(players.map(() => 0));

  const updatePoints = (index: number, points: string) => {
    const newRoundPoints = [...roundPoints];
    newRoundPoints[index] = parseInt(points, 10) || 0;
    setRoundPoints(newRoundPoints);
  };

  const submitRoundPoints = () => {
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      score: player.score + roundPoints[index]
    }));

    onPointsUpdate(updatedPlayers);
    setRoundPoints(players.map(() => 0)); // Reset round points for next round
  };

  return (
    <div className="points-registration">
      <h2>Register Points for Each Player</h2>
      {players.map((player, index) => (
        <div key={index} className="player-input">
          <label>{player.name}:</label>
          <input
            type="number"
            value={roundPoints[index]}
            onChange={(e) => updatePoints(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={submitRoundPoints}>Submit Round Points</button>
      <div className="scores">
        <h3>Current Scores</h3>
        {players.map((player, index) => (
          <div key={index}>
            {player.name}: {player.score}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsRegistration;
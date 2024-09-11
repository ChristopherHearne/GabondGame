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

  /*const updatePoints = (index: number, points: string) => {
    const newRoundPoints = [...roundPoints];
    newRoundPoints[index] = parseInt(points, 10) || 0;
    setRoundPoints(newRoundPoints);
  };
  */
  const submitRoundPoints = () => {
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      score: player.score + roundPoints[index]
    }));

    onPointsUpdate(updatedPlayers);
    setRoundPoints(players.map(() => 0)); // Reset round points for next round
  };

  return (
    <main>
      <div id="header">
        <h1>Ranking</h1>
      </div>
        <div id="leaderboard">
          <div className="ribbon"></div>
          <table>
            <tbody>
              {players.map((player, index) => (
              <tr key={index}>
                  <td className="number">{index + 1}</td>
                  <td className="name">{player.name}</td>
                  <td className="points">{player.score}</td>
                  <td className='submit'>
                  <button className='add' onClick={submitRoundPoints}>+</button>
                  {index + 1 == 1 && <img className="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>}
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
    </main>
  );
};

export default PointsRegistration;
import { useState, useEffect } from 'react'
import PopupForm from './PointsPopup';
import '../styles/PointsRegistration.css'
interface Player {
  name: string;
  score: number;
  roundScore: string;
}

interface PointsRegistrationProps {
  players: Player[];
  onPointsUpdate: (players: Player[]) => void;
}

const PointsRegistration: React.FC<PointsRegistrationProps> = ({ players, onPointsUpdate }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [displayedScores, setDisplayedScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const scores: { [key: string]: number } = {};
    players.forEach((player) => {
      scores[player.name] = player.score;
    });
    setDisplayedScores(scores);
  }, [players]);

  const submitRoundPoints = (points: number) => {
    if (selectedPlayer) {
      const updatedPlayers = players.map ((p) => p.name === selectedPlayer.name ? {...p, score: p.score + points, roundScore: `+${points}`} : p); 
      onPointsUpdate([...updatedPlayers].sort((a, b) => a.score -  b.score))
      animatePoints(selectedPlayer.name, selectedPlayer.score, selectedPlayer.score + points);
    }
  };

  const handlePointRegistration = (player: Player) => {
    setSelectedPlayer(player);
    setIsPopupOpen(true);
  }

  const animatePoints = (playerName: string, start: number, end: number) => {
    let currentScore = start;
    const increment = end > start ? 1 : -1;
    const duration = Math.abs(end - start) * 20;
    const interval = setInterval(() => {
      currentScore += increment;
      setDisplayedScores((prev) => ({
        ...prev,
        [playerName]: currentScore,
      }));
      if (currentScore === end) {
        clearInterval(interval);
      }
    }, duration / Math.abs(end - start));
  };

  return (
    <main>
      <div id="header">
        <h1>Ranking</h1>
      </div>
        <div id="leaderboard">
          <table>
            <tbody>
              {players.map((player, index) => (
              <tr className="rank-row" key={index}>
                  <td className="player-number">{index + 1}</td>
                  <td className="player-name">{player.name}</td>
                  <td className="points">{displayedScores[player.name] !== undefined
                    ? displayedScores[player.name]
                    : player.score}</td>
                  <td className='points-added'>{player.roundScore}</td>
                  <td className='submit'>
                  <button className='add' onClick={() => handlePointRegistration(player)}>+</button>
                  </td>
              </tr> 
              ))}
            </tbody>
          </table>
          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={submitRoundPoints}
          />
        </div>
    </main>
  );
};

export default PointsRegistration;
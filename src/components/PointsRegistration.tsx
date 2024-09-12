import { useState } from 'react'
import PopupForm from './PointsPopup';
import '../styles/PointsRegistration.css'
interface Player {
  name: string;
  score: number;
}

interface PointsRegistrationProps {
  players: Player[];
  onPointsUpdate: (players: Player[]) => void;
}

const PointsRegistration: React.FC<PointsRegistrationProps> = ({ players, onPointsUpdate }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const submitRoundPoints = (points: number) => {
    if (selectedPlayer) {
      const updatedPlayers = players.map ((p) => p.name === selectedPlayer.name ? {...p, score: p.score + points} : p); 
      onPointsUpdate([...updatedPlayers].sort((a, b) => a.score -  b.score))
    }
  };

  const handlePointRegistration = (player: Player) => {
    setSelectedPlayer(player);
    setIsPopupOpen(true);
  }

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
                  <td className="player-number">{index + 1}</td>
                  <td className="player-name">{player.name}</td>
                  <td className="points">{player.score}</td>
                  <td className='submit'>
                  <button className='add' onClick={() => handlePointRegistration(player)}>+</button>
                  {index + 1 == 1 && <img className="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>}
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
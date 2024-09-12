import { useState } from 'react';
import '../styles/PlayerRegistration.css';


interface Player {
  name: string;
  score: number;
}

interface PlayerRegistrationProps {
  onRegister: (players: Player[]) => void;
}

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onRegister }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');

  const addPlayer = () => {
    if (playerName.trim() !== '') {
      setPlayers([...players, { name: playerName, score: 0 }]);
      setPlayerName('');
    }
  };

  const startGame = () => {
    if (players.length > 0) {
      onRegister(players);
    } else {
      alert('Please add at least one player.');
    }
  };

  return (
    <main>
      <div id="header">
        <h1>Players</h1>
        <input
        type="text"
        placeholder="Enter player name..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
        <button className='add-player' onClick={addPlayer}>+</button>
      </div>
      <div id="registration">
        <table>
          <tbody>
          {players.map((player, index) => (
              <tr key={index}>
                  <td className="reg-number">{index + 1}</td>
                  <td className="reg-name">{player.name}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      
      <button onClick={startGame}>Start Game</button>
    </main>
  );
};

export default PlayerRegistration;
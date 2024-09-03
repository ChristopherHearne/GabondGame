import { useState } from 'react';

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
    <div className="player-registration">
      <h2>Register Players</h2>
      <input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={addPlayer}>Add Player</button>
      <div className="players-list">
        {players.map((player, index) => (
          <div key={index}>{player.name}</div>
        ))}
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default PlayerRegistration;
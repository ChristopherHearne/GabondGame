import { useState } from 'react';
import StartPage from './StartPage';
import PlayerRegistration from './PlayerRegistration';
import PointsRegistration from './PointsRegistration';

interface Player {
  name: string;
  score: number;
  roundScore: string;
}

const App: React.FC = () => {
  const [page, setPage] = useState<'start' | 'registration' | 'points'>('start');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleStartGame = () => {
    setPage('registration');
  };

  const handleRegisterPlayers = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setPage('points');
  };

  const handlePointsUpdate = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="app">
      {page === 'start' && <StartPage onStart={handleStartGame} />}
      {page === 'registration' && <PlayerRegistration onRegister={handleRegisterPlayers} />}
      {page === 'points' && <PointsRegistration players={players} onPointsUpdate={handlePointsUpdate} />}
    </div>
  );
};

export default App;

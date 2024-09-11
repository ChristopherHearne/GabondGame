
interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="start-page">
      <h1>Welcome to Gabond</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default StartPage;
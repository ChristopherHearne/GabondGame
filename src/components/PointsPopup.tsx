import { useState } from 'react';
import '../styles/PointsPopup.css'

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (points: number) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose, onSubmit}) => {
  const [points, setPoints] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof points === 'number') {
      onSubmit(points);
      setPoints(''); // Reset the form
      onClose(); // Close the popup
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Register Points</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              required
            />
          </label>
          <div className="popup-actions">
            <button type="submit" className='add-points'>+</button>
            <button type="button" onClick={onClose} className='cancel'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
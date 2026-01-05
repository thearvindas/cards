'use client';

import { GameConstraints } from '@/lib/types';

interface GameFilterProps {
  constraints: GameConstraints;
  onConstraintsChange: (constraints: GameConstraints) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GameFilter({ constraints, onConstraintsChange, onSubmit }: GameFilterProps) {
  const handleChange = (field: keyof GameConstraints, value: number | boolean | undefined) => {
    onConstraintsChange({
      ...constraints,
      [field]: value,
    });
  };

  return (
    <div className="nes-container with-title" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
      <h2 className="title" style={{ textAlign: 'center' }}>What do you have at the table?</h2>
      <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
        <div className="nes-field" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="players" style={{ display: 'block', marginBottom: '0.5rem' }}>Number of Players</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="nes-btn"
              onClick={() => handleChange('players', Math.max(1, constraints.players - 1))}
            >
              -
            </button>
            <input
              type="number"
              id="players"
              className="nes-input"
              min="1"
              max="20"
              value={constraints.players || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  handleChange('players', value);
                } else if (e.target.value === '') {
                  handleChange('players', 1);
                }
              }}
              placeholder="2"
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="nes-btn"
              onClick={() => handleChange('players', Math.min(20, constraints.players + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="nes-field">
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Number of Decks</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              className={`nes-btn ${constraints.decks === 1 ? 'is-primary' : ''}`}
              onClick={() => handleChange('decks', 1)}
            >
              1 deck
            </button>
            <button
              type="button"
              className={`nes-btn ${constraints.decks === 2 ? 'is-primary' : ''}`}
              onClick={() => handleChange('decks', 2)}
            >
              2 decks
            </button>
            <button
              type="button"
              className={`nes-btn ${constraints.decks === 3 ? 'is-primary' : ''}`}
              onClick={() => handleChange('decks', 3)}
            >
              3 decks
            </button>
            <button
              type="button"
              className={`nes-btn ${constraints.decks === 4 ? 'is-primary' : ''}`}
              onClick={() => handleChange('decks', 4)}
            >
              4 decks
            </button>
            <button
              type="button"
              className={`nes-btn ${constraints.decks && constraints.decks >= 5 ? 'is-primary' : ''}`}
              onClick={() => {
                window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
                handleChange('decks', 5);
              }}
            >
              4+ decks
            </button>
          </div>
        </div>

        <button type="submit" className="nes-btn is-primary">
          Find Games →
        </button>
      </form>
    </div>
  );
}

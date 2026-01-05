'use client';

import { useState, useEffect, useRef } from 'react';
import { CardGame } from '@/lib/types';

interface GameCardProps {
  game: CardGame;
}

export default function GameCard({ game }: GameCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleGoogleSearch = () => {
    const searchQuery = encodeURIComponent(`${game.name} card game rules`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const handleCopyPrompt = async () => {
    const prompt = `Explain how to play the card game "${game.name}". ${game.description} Provide clear, step-by-step instructions including setup, gameplay, and how to win.`;
    
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.error('Failed to copy to clipboard:', err);
      // Could show an error message to user here
    }
  };

  return (
    <div className="nes-container with-title" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
      <h3 className="title">{game.name}</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.8rem', lineHeight: '1.5' }}>{game.description}</p>
      <div style={{ 
        marginTop: '1rem', 
        marginBottom: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        rowGap: '0.75rem'
      }}>
        <span className="nes-badge" style={{ marginRight: '0 !important', marginLeft: '0 !important' }}>
          <span className="is-primary">
            {game.minPlayers === game.maxPlayers 
              ? `${game.minPlayers} player${game.minPlayers !== 1 ? 's' : ''}`
              : `${game.minPlayers}-${game.maxPlayers} players`}
          </span>
        </span>
        <span className="nes-badge" style={{ marginRight: '0 !important', marginLeft: '0 !important' }}>
          <span className="is-primary">
            {game.decks} deck{game.decks !== 1 ? 's' : ''}
          </span>
        </span>
        {game.requiresJokers && (
          <span className="nes-badge" style={{ marginRight: '0 !important', marginLeft: '0 !important' }}>
            <span className="is-warning">Needs jokers</span>
          </span>
        )}
        {game.worksWithMissingCards && (
          <span className="nes-badge" style={{ marginRight: '0 !important', marginLeft: '0 !important' }}>
            <span className="is-success">Missing cards OK</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button 
          type="button" 
          className="nes-btn is-primary" 
          onClick={handleGoogleSearch}
        >
          🔍 Google Rules
        </button>
        <button 
          type="button" 
          className="nes-btn" 
          onClick={handleCopyPrompt}
          style={{ minWidth: '180px' }}
        >
          {copied ? '✅ Copied!' : '📋 Copy LLM Prompt'}
        </button>
      </div>
    </div>
  );
}

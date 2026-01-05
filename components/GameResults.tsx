'use client';

import { useState, useEffect, useRef } from 'react';
import { CardGame } from '@/lib/types';
import GameCard from './GameCard';

interface GameResultsProps {
  games: CardGame[];
}

const GAMES_PER_PAGE = 20;

export default function GameResults({ games }: GameResultsProps) {
  const [displayedCount, setDisplayedCount] = useState(GAMES_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset displayed count when games change
  useEffect(() => {
    setDisplayedCount(GAMES_PER_PAGE);
  }, [games]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < games.length) {
          setDisplayedCount(prev => Math.min(prev + GAMES_PER_PAGE, games.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayedCount, games.length]);

  if (games.length === 0) {
    return (
      <div className="nes-container with-title is-centered" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
        <h2 className="title">No games found</h2>
        <p>
          Try adjusting your constraints. You might need more decks, different number of players, or fewer missing cards.
        </p>
      </div>
    );
  }

  const displayedGames = games.slice(0, displayedCount);
  const hasMore = displayedCount < games.length;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {displayedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {hasMore && (
        <div ref={observerTarget} style={{ height: '20px', marginTop: '1rem' }} />
      )}
    </div>
  );
}

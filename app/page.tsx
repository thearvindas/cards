'use client';

import { useState } from 'react';
import { GameConstraints, CardGame } from '@/lib/types';
import { filterGames } from '@/lib/filter';
import GameFilter from '@/components/GameFilter';
import GameResults from '@/components/GameResults';
import Footer from '@/components/Footer';
import PixelBackground from '@/components/PixelBackground';

export default function Home() {
  const [constraints, setConstraints] = useState<GameConstraints>({
    players: 2,
    decks: 1,
    hasJokers: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [filteredGames, setFilteredGames] = useState<CardGame[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const games = filterGames(constraints);
    setFilteredGames(games);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFilteredGames([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <PixelBackground />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!submitted ? (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: 'clamp(2rem, 5vw, 4rem) 1rem clamp(1rem, 3vw, 2rem)', 
                marginBottom: 'clamp(2rem, 4vw, 4rem)'
              }}>
                <h1 style={{ 
                  fontSize: 'clamp(1.2rem, 6vw, 3.5rem)',
                  color: '#000000',
                  margin: 0,
                  lineHeight: '1.2',
                  whiteSpace: 'pre-line'
                }}>
                  Find the perfect<br />card game for you
                </h1>
              </div>

              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem', marginBottom: 'clamp(1rem, 2vw, 1.5rem)', width: '100%' }}>
                <GameFilter 
                  constraints={constraints} 
                  onConstraintsChange={setConstraints}
                  onSubmit={handleSubmit}
                />
              </div>
              
              <div className="footer-mobile" style={{ marginTop: '1rem' }}>
                <Footer />
              </div>
            </div>
            <div className="footer-desktop">
              <Footer />
            </div>
          </>
        ) : (
          <>
            <div style={{ 
              textAlign: 'center', 
              padding: 'clamp(2rem, 5vw, 4rem) 1rem clamp(1rem, 3vw, 2rem)', 
              marginBottom: 'clamp(2rem, 4vw, 4rem)'
            }}>
              <h1 style={{ 
                fontSize: 'clamp(1.2rem, 6vw, 3.5rem)',
                color: '#000000',
                margin: 0,
                lineHeight: '1.2',
                whiteSpace: 'pre-line'
              }}>
                Find the perfect<br />card game<br />for you
              </h1>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem', marginBottom: 'clamp(2rem, 4vw, 3rem)', width: '100%' }}>
              <GameFilter 
                constraints={constraints} 
                onConstraintsChange={setConstraints}
                onSubmit={handleSubmit}
              />
            </div>

            <div id="results" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem', width: '100%' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }} className="results-header">
                <div>
                  <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', margin: 0 }}>
                    Found {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
                  </h2>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
                    You may either Google the rules or copy a prompt you can put into your favourite LLM
                  </p>
                </div>
                <button type="button" className="nes-btn" onClick={handleReset} style={{ alignSelf: 'center' }}>
                  New Search
                </button>
              </div>
              <GameResults games={filteredGames} />
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <Footer />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useGameStore } from '@/store/gameStore';
import { TypingInterface } from '@/components/game/TypingInterface';
import { Settings } from '@/components/game/Settings';
import { ColorSchemeProvider } from '@/components/game/ColorSchemeProvider';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Home() {
  const { 
    gameCompleted, 
    wordsCompleted,
    words,
    resetGame,
    setUserInput
  } = useGameStore();

  // Initialize the game
  useEffect(() => {
    // Reset the game to initialize the first word's characters
    resetGame();
  }, [resetGame]);

  return (
    <ColorSchemeProvider>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Word Wizard</h1>
            <p className="text-muted-foreground">Learn to spell words in a fun and interactive way!</p>
          </header>

          {gameCompleted ? (
            <div className="text-center p-8 border rounded-lg shadow-lg bg-background">
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="mb-6 text-xl">
                You've completed all {wordsCompleted} words!
              </p>
              <Button 
                size="lg" 
                onClick={resetGame}
                className="animate-bounce"
              >
                Play Again
              </Button>
            </div>
          ) : (
            <TypingInterface />
          )}

          {/* Settings dialog */}
          <Settings />
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Word Wizard - Educational Spelling Game for Children</p>
        </footer>
      </main>
    </ColorSchemeProvider>
  );
}

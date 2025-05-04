"use client";

import { useGameStore } from '@/store/gameStore';
import { TypingInterface, Settings } from './components';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function WordWizardPage() {
  const { 
    gameCompleted, 
    wordsCompleted,
    resetGame,
  } = useGameStore();

  // Initialize the game
  useEffect(() => {
    // Reset the game to initialize the first word's characters
    resetGame();
  }, [resetGame]);

  return (
    <>
      <Settings />
      <main className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Word Wizard</h1>
            <p className="text-muted-foreground">Learn to spell words in a fun and interactive way!</p>
            <span>
              The classic word game for language learners. Practice spelling, listening, and vocabulary. Don&apos;t just play—master words!
            </span>
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
        </div>
      </main>
    </>
  );
}
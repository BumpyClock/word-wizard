"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useGameStore } from '@/store/gameStore';
import confetti from 'canvas-confetti';

export const TypingInterface = () => {
  const {
    words,
    currentWordIndex,
    userInput,
    typedCharacters,
    nextWord,
    setUserInput,
    audioMode,
    toggleAudioMode,
    audioPath,
    setAudioPath,
    openAIKey // Get OpenAI key from store
  } = useGameStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  // Always focused by default
  const [isFocused, setIsFocused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentWord = words[currentWordIndex];

  // Generate visual representation of user's typed characters for audio mode
  const getAudioModeCharacters = () => {
    if (!userInput || !currentWord) return [];
    
    return userInput.split('').map((char, index) => {
      // Check if the character is correct
      const isCorrect = index < currentWord.text.length && 
        char.toLowerCase() === currentWord.text[index].toLowerCase();
      
      return {
        char,
        status: isCorrect ? 'correct' : 'incorrect'
      };
    });
  };
  
  // Fetch audio for the current word in audio mode
  useEffect(() => {
    if (audioMode && currentWord && !audioPath) {
      const fetchAudio = async () => {
        setIsLoading(true);
        try {
          // Construct the API URL, adding openAIKey if it exists
          let apiUrl = `/api/tts?word=${encodeURIComponent(currentWord.text)}`;
          if (openAIKey) {
            apiUrl += `&openAIKey=${encodeURIComponent(openAIKey)}`;
          }
          
          const response = await fetch(apiUrl);
          const data = await response.json();
          
          if (data.audioPath) {
            setAudioPath(data.audioPath);
          }
        } catch (error) {
          console.error('Failed to fetch audio:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAudio();
    }
    // Add openAIKey to dependency array
  }, [audioMode, currentWord, audioPath, setAudioPath, openAIKey]); 
  
  // Play audio when it's loaded or when play button is clicked
  const playAudio = React.useCallback(() => {
    if (audioRef.current && audioPath) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  }, [audioPath]);
  
  // Auto-play audio when it becomes available in audio mode
  useEffect(() => {
    if (audioMode && audioPath && audioRef.current) {
      playAudio();
    }
  }, [audioMode, audioPath, playAudio]);
  
  // Handle typing via global keydown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent | Event) => {
      const event = e as KeyboardEvent;
      // Don't capture keystrokes when typing in input fields, textareas, or dialog elements
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.getAttribute('role') === 'dialog' ||
          target.closest('[role="dialog"]') || 
          target.contentEditable === 'true') {
        return;
      }
      
      // Ignore modifier keys and special keys
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      
      if (event.key === 'Tab') {
        event.preventDefault();
        nextWord();
        return;
      }
      
      // Handle backspace
      if (event.key === 'Backspace') {
        event.preventDefault();
        setUserInput(userInput.slice(0, -1));
        return;
      }
      
      // Only accept printable characters (single character keys)
      if (event.key.length === 1) {
        event.preventDefault();
        const newInput = userInput + event.key;
        setUserInput(newInput);
        
        // Check if the word is complete
        if (newInput.toLowerCase() === currentWord.text.toLowerCase()) {
          // Trigger confetti animation
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = (rect.left + rect.right) / 2 / window.innerWidth;
            const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
            
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x, y: y - 0.1 }
            });
          }
          
          // Move to next word after a short delay
          setTimeout(() => {
            nextWord();
          }, 800);
        }
      }
    };

    // Add the keydown event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Set focus when component mounts
    setIsFocused(true);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput, currentWord, nextWord, setUserInput]);
  
  // Keep track of window focus/blur
  useEffect(() => {
    const handleWindowFocus = () => setIsFocused(true);
    const handleWindowBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  // Audio mode characters
  const audioModeChars = getAudioModeCharacters();

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center w-full max-w-2xl mx-auto p-8 rounded-lg shadow-md"
    >
      <div className="mb-6 text-3xl font-bold">
        <h2>Word Wizard</h2>
      </div>
      
      {/* Audio toggle and player */}
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={() => toggleAudioMode()}
          className="flex items-center px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors text-sm"
        >
          {audioMode ? (
            <>
              <span className="mr-2">📝 Text Mode</span>
            </>
          ) : (
            <>
              <span className="mr-2">🔊 Audio Mode</span>
            </>
          )}
        </button>
      </div>
      
      {/* Hidden audio element for playing TTS */}
      <audio ref={audioRef} src={audioPath || ''} />
      
      {/* Word display with letter highlighting */}
      <div className="mb-8 text-center">
        {audioMode ? (
          <div className="flex flex-col items-center">
            {/* Audio mode - sound button */}
            <div className="text-3xl sm:text-5xl font-bold tracking-wide relative my-4">
              <button 
                onClick={playAudio}
                className="flex items-center justify-center p-4 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors absolute right-0 top-0"
                disabled={!audioPath || isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse text-xl">...</span>
                ) : (
                  <span className="text-2xl">🔊</span>
                )}
                <span className="sr-only">Play sound</span>
              </button>
            </div>
            
            {/* Audio mode - typed characters display */}
            <div className="text-4xl sm:text-6xl font-bold tracking-wide flex justify-center flex-wrap relative min-h-[80px]">
              {audioModeChars.map((char, index) => (
                <span 
                  key={index} 
                  className={`transition-colors duration-200 mx-1 relative ${
                    char.status === 'correct' 
                      ? 'text-[var(--color-scheme-correct)]' 
                      : 'text-[var(--color-scheme-incorrect)]'
                  }`}
                >
                  {char.char}
                </span>
              ))}
              {/* Show cursor at current typing position in audio mode */}
              {isFocused && (
                <span className="absolute bottom-0 left-[calc(100%+4px)] w-4 h-0.5 bg-primary animate-pulse" />
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Type the word you hear
              </p>
            </div>
          </div>
        ) : (
          <div className="text-4xl sm:text-6xl font-bold tracking-wide flex justify-center flex-wrap relative">
            {typedCharacters.map((char, index) => (
              <span 
                key={index} 
                className={`transition-colors duration-200 mx-1 relative ${
                  char.status === 'correct' 
                    ? 'text-[var(--color-scheme-correct)]' 
                    : char.status === 'incorrect' 
                    ? 'text-[var(--color-scheme-incorrect)]' 
                    : 'text-[var(--color-scheme-neutral)]'
                }`}
              >
                {char.char}
                {/* Show cursor at current typing position */}
                {userInput.length === index && isFocused && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse" />
                )}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-sm text-gray-500">
          {!audioMode && currentWord.category && (
            <span className="uppercase tracking-wide">({currentWord.category})</span>
          )}
        </div>
      </div>
      
      {/* User input display - hide in audio mode since we're showing big letters instead */}
      {!audioMode && (
        <div className="w-full mb-6">
          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-lg font-mono font-semibold text-center break-all">
              {userInput || <span className="text-gray-400">Start typing...</span>}
            </p>
          </div>
        </div>
      )}
      
      {/* Typing status info */}
      <div className="mt-4 text-center">
        {isFocused ? (
          <p className="text-sm text-gray-600">
            {audioMode ? "Type the word you hear" : "Start typing..."}
          </p>
        ) : (
          <p className="text-sm text-gray-600">Click back on the page to start typing</p>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-8 w-full">
        <div className="flex justify-between text-sm mb-1">
          <span>Word {currentWordIndex + 1} of {words.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full transition-all duration-500 bg-primary"
            style={{ width: `${((currentWordIndex) / words.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
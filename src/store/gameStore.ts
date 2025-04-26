import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorScheme = {
  id: string;
  name: string;
  correct: string;
  incorrect: string;
  neutral: string;
  background: string;
};

export type Word = {
  id: string;
  text: string;
  category?: string;
};

type GameState = {
  words: Word[];
  currentWordIndex: number;
  userInput: string;
  typedCharacters: {
    char: string;
    status: 'correct' | 'incorrect' | 'neutral';
  }[];
  selectedColorScheme: ColorScheme;
  colorSchemes: ColorScheme[];
  gameCompleted: boolean;
  wordsCompleted: number;
  audioMode: boolean;
  audioPath: string | null;
  
  // Actions
  setWords: (words: Word[]) => void;
  addWord: (word: Word) => void;
  removeWord: (id: string) => void;
  setCurrentWordIndex: (index: number) => void;
  nextWord: () => void;
  resetGame: () => void;
  setUserInput: (input: string) => void;
  setColorScheme: (schemeId: string) => void;
  addColorScheme: (scheme: ColorScheme) => void;
  removeColorScheme: (schemeId: string) => void;
  toggleAudioMode: () => void;
  setAudioPath: (path: string | null) => void;
};

export const defaultColorSchemes: ColorScheme[] = [
  {
    id: 'default',
    name: 'Default',
    correct: '#4ade80', // green
    incorrect: '#f87171', // red
    neutral: '#e5e7eb', // gray
    background: '#ffffff',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    correct: '#38bdf8', // sky blue
    incorrect: '#fb7185', // rose
    neutral: '#94a3b8', // slate
    background: '#f0f9ff',
  },
  {
    id: 'forest',
    name: 'Forest',
    correct: '#34d399', // emerald
    incorrect: '#fb923c', // orange
    neutral: '#d1d5db', // gray
    background: '#ecfdf5',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    correct: '#a78bfa', // violet
    incorrect: '#f97316', // orange
    neutral: '#cbd5e1', // slate
    background: '#faf5ff',
  },
];

const defaultWords: Word[] = [
  { id: '1', text: 'apple', category: 'fruit' },
  { id: '2', text: 'banana', category: 'fruit' },
  { id: '3', text: 'cat', category: 'animal' },
  { id: '4', text: 'dog', category: 'animal' },
  { id: '5', text: 'elephant', category: 'animal' },
  { id: '6', text: 'fish', category: 'animal' },
  { id: '7', text: 'green', category: 'color' },
  { id: '8', text: 'house', category: 'object' },
  { id: '9', text: 'ice', category: 'nature' },
  { id: '10', text: 'jump', category: 'action' },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      words: defaultWords,
      currentWordIndex: 0,
      userInput: '',
      typedCharacters: [],
      selectedColorScheme: defaultColorSchemes[0],
      colorSchemes: defaultColorSchemes,
      gameCompleted: false,
      wordsCompleted: 0,
      audioMode: false,
      audioPath: null,
      
      setWords: (words) => set({ words }),
      
      addWord: (word) => set((state) => ({
        words: [...state.words, word]
      })),
      
      removeWord: (id) => set((state) => ({
        words: state.words.filter(word => word.id !== id)
      })),
      
      setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
      
      nextWord: () => {
        const { currentWordIndex, words } = get();
        const nextIndex = currentWordIndex + 1;
        
        if (nextIndex < words.length) {
          const nextWord = words[nextIndex];
          const initialTypedCharacters = nextWord.text.split('').map(char => ({
            char,
            status: 'neutral' as const
          }));
          
          set({ 
            currentWordIndex: nextIndex,
            userInput: '',
            typedCharacters: initialTypedCharacters,
            wordsCompleted: get().wordsCompleted + 1,
            audioPath: null // Reset audio path for new word
          });
        } else {
          set({ 
            gameCompleted: true,
            wordsCompleted: get().wordsCompleted + 1
          });
        }
      },
      
      resetGame: () => {
        const firstWord = get().words[0];
        const initialTypedCharacters = firstWord ? firstWord.text.split('').map(char => ({
          char,
          status: 'neutral' as const
        })) : [];
      
        set({
          currentWordIndex: 0,
          userInput: '',
          typedCharacters: initialTypedCharacters,
          gameCompleted: false,
          wordsCompleted: 0,
          audioPath: null
        });
      },
      
      setUserInput: (input) => {
        const currentWord = get().words[get().currentWordIndex];
        
        if (!currentWord) return;
        
        const typedCharacters = input.split('').map((char, index) => {
          const isCorrect = index < currentWord.text.length && 
            char.toLowerCase() === currentWord.text[index].toLowerCase();
          
          return {
            char,
            status: isCorrect ? 'correct' : 'incorrect'
          };
        });
        
        // Fill remaining characters as neutral
        if (input.length < currentWord.text.length) {
          for (let i = input.length; i < currentWord.text.length; i++) {
            typedCharacters.push({
              char: currentWord.text[i],
              status: 'neutral'
            });
          }
        }
        
        set({ userInput: input, typedCharacters });
      },
      
      setColorScheme: (schemeId) => {
        const scheme = get().colorSchemes.find(s => s.id === schemeId);
        if (scheme) {
          set({ selectedColorScheme: scheme });
        }
      },
      
      addColorScheme: (scheme) => set((state) => ({
        colorSchemes: [...state.colorSchemes, scheme]
      })),
      
      removeColorScheme: (schemeId) => set((state) => ({
        colorSchemes: state.colorSchemes.filter(s => s.id !== schemeId),
        // Reset to default if removing the selected scheme
        selectedColorScheme: state.selectedColorScheme.id === schemeId 
          ? state.colorSchemes[0] 
          : state.selectedColorScheme
      })),

      // New methods for audio mode
      toggleAudioMode: () => set((state) => ({ 
        audioMode: !state.audioMode,
        audioPath: null // Reset audio path when toggling mode
      })),

      setAudioPath: (path) => set({ audioPath: path }),
    }),
    {
      name: 'word-wizard-storage',
    }
  )
);
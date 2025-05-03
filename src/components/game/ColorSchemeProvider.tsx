"use client";

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const { selectedColorScheme } = useGameStore();

  // Apply the color scheme as CSS variables to the document root
  useEffect(() => {
    // Set CSS variables based on the selected color scheme
    document.documentElement.style.setProperty('--color-scheme-correct', selectedColorScheme.correct);
    document.documentElement.style.setProperty('--color-scheme-incorrect', selectedColorScheme.incorrect);
    document.documentElement.style.setProperty('--color-scheme-neutral', selectedColorScheme.neutral);
    document.documentElement.style.setProperty('--color-scheme-background', selectedColorScheme.background);
    
    // Update primary and accent colors to match the color scheme
    document.documentElement.style.setProperty('--primary', selectedColorScheme.correct);
    document.documentElement.style.setProperty('--accent', selectedColorScheme.neutral);
    document.documentElement.style.setProperty('--destructive', selectedColorScheme.incorrect);
    
    // Set text color to black for all color schemes for better legibility
    document.documentElement.style.setProperty('--foreground', '#000000');
    document.documentElement.style.setProperty('--primary-foreground', '#000000');
    document.documentElement.style.setProperty('--accent-foreground', '#000000');
  }, [selectedColorScheme]);

  return (
    <div style={{ 
      backgroundColor: selectedColorScheme.background,
      color: '#000000', // Always use black text for legibility
      minHeight: '100vh'
    }}>
      {children}
    </div>
  );
}
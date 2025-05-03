"use client";

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export function SiteColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const { selectedColorScheme } = useGameStore();

  // Apply the color scheme as CSS variables to the document root
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Set CSS variables based on the selected color scheme
    document.documentElement.style.setProperty('--color-scheme-correct', selectedColorScheme.correct);
    document.documentElement.style.setProperty('--color-scheme-incorrect', selectedColorScheme.incorrect);
    document.documentElement.style.setProperty('--color-scheme-neutral', selectedColorScheme.neutral);
    document.documentElement.style.setProperty('--color-scheme-background', selectedColorScheme.background);
    
    // Update primary and accent colors to match the color scheme
    document.documentElement.style.setProperty('--primary', selectedColorScheme.correct);
    document.documentElement.style.setProperty('--accent', selectedColorScheme.neutral);
    document.documentElement.style.setProperty('--destructive', selectedColorScheme.incorrect);
    
    // Set background color
    document.body.style.backgroundColor = selectedColorScheme.background;
    
    // Set text colors for contrast
    document.documentElement.style.setProperty('--foreground', '#000000');
    document.documentElement.style.setProperty('--card-foreground', '#000000');
    document.documentElement.style.setProperty('--muted-foreground', '#4b5563'); // gray-600
    document.documentElement.style.setProperty('--primary-foreground', '#ffffff');
    document.documentElement.style.setProperty('--accent-foreground', '#000000');
  }, [selectedColorScheme]);

  return <>{children}</>;
}
"use client";

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGameStore, Word } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Settings = () => {
  const { 
    words, 
    audioMode,
    toggleAudioMode,
    addWord, 
    removeWord, 
    resetGame
  } = useGameStore();
  
  const [newWord, setNewWord] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim()) {
      const word: Word = {
        id: uuidv4(),
        text: newWord.trim().toLowerCase(),
        category: newCategory.trim() || undefined
      };
      
      addWord(word);
      setNewWord('');
      setNewCategory('');
    }
  };
  
  const handleRemoveWord = (id: string) => {
    removeWord(id);
  };
  
  const handleReset = () => {
    resetGame();
    setIsDialogOpen(false);
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="absolute right-4 top-24 md:top-24 flex items-center gap-2 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path>
          </svg>
          Game Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Word Wizard Settings</DialogTitle>
          <DialogDescription>
            Customize the word list and gameplay options.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea 
          className="h-[calc(80vh-180px)] pr-4"
        >
          <div className="grid gap-6 py-4">
            {/* Game Mode Section */}
            <Card>
              <CardHeader>
                <CardTitle>Game Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audio-mode">Audio Mode</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      When enabled, words will be spoken aloud instead of displayed.
                    </p>
                  </div>
                  <Switch 
                    id="audio-mode" 
                    checked={audioMode}
                    onCheckedChange={toggleAudioMode}
                  />
                </div>
              </CardContent>
            </Card>
          
            {/* Word management section */}
            <Card>
              <CardHeader>
                <CardTitle>Word List</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddWord} className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <Label htmlFor="word">New Word</Label>
                    <input
                      id="word"
                      value={newWord}
                      onChange={e => setNewWord(e.target.value)}
                      className="w-full p-2 mt-1 border rounded"
                      style={{
                        borderColor: 'var(--color-scheme-neutral, #e5e7eb)',
                        backgroundColor: 'var(--color-scheme-background, white)',
                        color: 'var(--card-foreground, #000000)'
                      }}
                      placeholder="Enter a word"
                    />
                  </div>
                  <div className="col-span-5">
                    <Label htmlFor="category">Category (optional)</Label>
                    <input
                      id="category"
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      className="w-full p-2 mt-1 border rounded"
                      style={{
                        borderColor: 'var(--color-scheme-neutral, #e5e7eb)',
                        backgroundColor: 'var(--color-scheme-background, white)',
                        color: 'var(--card-foreground, #000000)'
                      }}
                      placeholder="e.g. animal, color"
                    />
                  </div>
                  <div className="col-span-2 flex items-end">
                    <Button type="submit" className="w-full">Add</Button>
                  </div>
                </form>
                
                <div className="mt-4">
                  <Label>Current Words</Label>
                  <ScrollArea
                    className="mt-2 h-64 border rounded"
                    style={{
                      borderColor: 'var(--color-scheme-neutral, #e5e7eb)',
                    }}
                  >
                    <div className="p-2">
                      <ul className="divide-y">
                        {words.map(word => (
                          <li 
                            key={word.id} 
                            className="py-2 px-1 flex justify-between items-center"
                            style={{
                              borderColor: 'var(--color-scheme-neutral, #e5e7eb)',
                              color: 'var(--card-foreground, #000000)'
                            }}
                          >
                            <div>
                              <span className="font-medium">{word.text}</span>
                              {word.category && (
                                <span className="ml-2 text-xs text-muted-foreground">({word.category})</span>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveWord(word.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <line x1="18" x2="6" y1="6" y2="18"></line>
                                <line x1="6" x2="18" y1="6" y2="18"></line>
                              </svg>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
            
            {/* Reset game */}
            <Card>
              <CardHeader>
                <CardTitle>Game Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={handleReset}>
                  Reset Game
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  This will reset your progress but keep your word list.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
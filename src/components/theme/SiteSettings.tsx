"use client";

import React, { useState } from 'react';
import { useGameStore, ColorScheme } from '@/store/gameStore';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input'; // Import Input component

export const SiteSettings = () => {
  const { colorSchemes, selectedColorScheme, setColorScheme, openAIKey, setOpenAIKey } = useGameStore(); // Get OpenAI key state and setter
  const { theme, setTheme } = useTheme();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleColorSchemeChange = (schemeId: string) => {
    setColorScheme(schemeId);
  };
  
  const handleThemeChange = (mode: string) => {
    setTheme(mode);
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="w-9 h-9"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          <span className="sr-only">Site Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Site Settings</DialogTitle>
          <DialogDescription>
            Customize the appearance of the site.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea 
          className="h-[calc(80vh-180px)] pr-4"
         
        >
          <div className="grid gap-6 py-4">
            {/* Theme Section */}
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    onClick={() => handleThemeChange('light')}
                    className="w-full"
                  >
                    Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    onClick={() => handleThemeChange('dark')}
                    className="w-full"
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    onClick={() => handleThemeChange('system')}
                    className="w-full"
                  >
                    System
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Color scheme selection */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Select Color Scheme</Label>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {colorSchemes.map(scheme => (
                    <button
                      key={scheme.id}
                      className="p-4 rounded-lg border transition-all hover:shadow-md"
                      style={{ 
                        background: scheme.background,
                        borderColor: selectedColorScheme.id === scheme.id 
                          ? `var(--color-scheme-correct, ${selectedColorScheme.correct})` 
                          : 'var(--color-scheme-neutral, #e5e7eb)',
                        boxShadow: selectedColorScheme.id === scheme.id 
                          ? `0 0 0 2px ${selectedColorScheme.correct}40` 
                          : 'none'
                      }}
                      onClick={() => handleColorSchemeChange(scheme.id)}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="font-medium text-sm" style={{ color: "#000000" }}>{scheme.name}</span>
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ background: scheme.correct }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ background: scheme.incorrect }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ background: scheme.neutral }}></div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings Section */}
            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="openai-key">OpenAI API Key (Optional)</Label>
                  <Input 
                    id="openai-key"
                    type="password" // Use password type to obscure the key
                    placeholder="Enter your OpenAI API key"
                    value={openAIKey || ''} 
                    onChange={(e) => setOpenAIKey(e.target.value || null)} // Set to null if empty
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Provide your key to use OpenAI TTS for audio generation. If left blank, Edge TTS will be used.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility options (placeholder for future) */}
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimize animations and transitions.
                    </p>
                  </div>
                  <Switch 
                    id="reduce-motion" 
                    // This would be connected to real state in a full implementation
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                </div>
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
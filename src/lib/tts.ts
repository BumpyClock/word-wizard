import { EdgeTTS } from 'node-edge-tts';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// Initialize the TTS engine
const tts = new EdgeTTS({
  voice: 'en-US-AriaNeural',
  lang: 'en-US',
  outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
});

// Create cache directory if it doesn't exist
const createCacheDir = async () => {
  const cacheDir = path.join(process.cwd(), 'public', 'cache', 'tts');
  try {
    await fsPromises.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create cache directory:', error);
  }
  return cacheDir;
};

// Generate audio file for a word
export const generateWordAudio = async (word: string): Promise<string> => {
  try {
    // Create a unique filename based on the word
    const filename = `${word.toLowerCase().replace(/\s+/g, '-')}.mp3`;
    const cacheDir = await createCacheDir();
    const filePath = path.join(cacheDir, filename);
    
    // Check if file already exists in cache
    try {
      await fsPromises.access(filePath);
      // File exists, return the cached file path
      return `/cache/tts/${filename}`;
    } catch {
      // File doesn't exist, generate it
      await tts.ttsPromise(word, filePath);
      return `/cache/tts/${filename}`;
    }
  } catch (error) {
    console.error('Error generating audio:', error);
    throw new Error('Failed to generate audio');
  }
};

// Function to check if a file exists in the cache
export const checkAudioExists = async (word: string): Promise<boolean> => {
  const filename = `${word.toLowerCase().replace(/\s+/g, '-')}.mp3`;
  const cacheDir = await createCacheDir();
  const filePath = path.join(cacheDir, filename);
  
  try {
    await fsPromises.access(filePath);
    return true;
  } catch {
    return false;
  }
};
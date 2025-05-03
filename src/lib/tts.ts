import { EdgeTTS } from 'node-edge-tts';
import path from 'path';
import { promises as fsPromises } from 'fs';
import OpenAI from 'openai'; // Import OpenAI

// Initialize the Edge TTS engine
const edgeTts = new EdgeTTS({
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

// Generate audio file for a word, optionally using OpenAI
export const generateWordAudio = async (word: string, openAIKey?: string | null): Promise<string> => {
  try {
    // Create a unique filename based on the word
    const filename = `${word.toLowerCase().replace(/\s+/g, '-')}.mp3`;
    const cacheDir = await createCacheDir();
    const filePath = path.join(cacheDir, filename);
    const publicPath = `/cache/tts/${filename}`;
    
    // Check if file already exists in cache
    try {
      await fsPromises.access(filePath);
      console.log(`Audio file for "${word}" already exists in cache.`);
      // File exists, return the cached file path
      return publicPath;
    } catch {
      // File doesn't exist, generate it
      if (openAIKey) {
        console.log(`Generating audio for "${word}" using OpenAI TTS...`);
        try {
          const openai = new OpenAI({ apiKey: openAIKey });
          const mp3 = await openai.audio.speech.create({
            model: "gpt-4o-mini", // Or use "tts-1-hd" for higher quality
            voice: "alloy", // Choose a voice: alloy, echo, fable, onyx, nova, shimmer
            input: word,
          });
          
          // Stream the audio response to the file
          const buffer = Buffer.from(await mp3.arrayBuffer());
          await fsPromises.writeFile(filePath, buffer);
          console.log(`Successfully generated audio for "${word}" using OpenAI TTS.`);
          return publicPath;
        } catch (openaiError) {
          console.error('OpenAI TTS generation failed:', openaiError);
          console.log(`Falling back to Edge TTS for "${word}"...`);
          // Fallback to Edge TTS if OpenAI fails
          await edgeTts.ttsPromise(word, filePath);
          return publicPath;
        }
      } else {
        console.log(`Generating audio for "${word}" using Edge TTS...`);
        // Use Edge TTS if no OpenAI key is provided
        await edgeTts.ttsPromise(word, filePath);
        console.log(`Successfully generated audio for "${word}" using Edge TTS.`);
        return publicPath;
      }
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
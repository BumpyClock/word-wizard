import { NextRequest, NextResponse } from 'next/server';
import { generateWordAudio } from '@/lib/tts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word');
  const openAIKey = searchParams.get('openAIKey'); // Get OpenAI key from query params
  
  if (!word) {
    return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
  }
  
  try {
    // Pass the OpenAI key (or null if not provided) to the generation function
    const audioPath = await generateWordAudio(word, openAIKey); 
    return NextResponse.json({ audioPath });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}
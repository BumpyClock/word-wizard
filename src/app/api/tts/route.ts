import { NextRequest, NextResponse } from 'next/server';
import { generateWordAudio } from '@/lib/tts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word');
  
  if (!word) {
    return NextResponse.json({ error: 'Word parameter is required' }, { status: 400 });
  }
  
  try {
    const audioPath = await generateWordAudio(word);
    return NextResponse.json({ audioPath });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}
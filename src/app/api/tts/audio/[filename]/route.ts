import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  
  // Security check - validate filename to prevent directory traversal
  if (!filename || filename.includes('..') || !filename.match(/^[a-zA-Z0-9-_.]+\.mp3$/)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  
  const audioDir = path.join(process.cwd(), 'public', 'cache', 'tts');
  const filePath = path.join(audioDir, filename);

  try {
    // Check if file exists
    await fsPromises.access(filePath);
    
    // Read the file as buffer
    const fileBuffer = await fsPromises.readFile(filePath);
    
    // Return the audio file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400', // Cache for a day
      },
    });
  } catch (error) {
    console.error('Error serving audio file:', error);
    return NextResponse.json({ error: 'Audio file not found' }, { status: 404 });
  }
}
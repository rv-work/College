import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

function extractVideoID(url: string) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const videoId = extractVideoID(url);
  if (!videoId) {
    return NextResponse.json({ success: false, error: "Invalid YouTube URL" }, { status: 400 });
  }

  return new Promise<NextResponse>((resolve) => {
    const process = spawn('python', ['python/transcript.py', videoId]);

    let data = '';
    process.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (err) => {
      console.error("Python error:", err.toString());
    });

    process.on('close', () => {
      try {
        const json = JSON.parse(data);
        resolve(NextResponse.json(json));
      } catch (e) {
        console.log(e);
        resolve(NextResponse.json({ success: false, error: "Parsing error" }));
      }
    });
  });
}

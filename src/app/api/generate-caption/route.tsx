// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from 'assemblyai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { audioFileUrl } = await req.json()
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_AI_CAPTION_API_KEY!,
    })

    const FILE_URL = audioFileUrl

    // You can also transcribe a local file by passing in a file path
    // const FILE_URL = './path/to/file.mp3';

    // Request parameters
    const data = {
      audio: FILE_URL,
    }

    const transcript = await client.transcripts.transcribe(data)
    console.log(transcript.words)
    return NextResponse.json({ result: transcript.words })
  } catch (error) {
    return NextResponse.json({ error: error })
  }
}

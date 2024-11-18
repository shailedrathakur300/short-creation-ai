/* import textToSpeech, { protos } from '@google-cloud/text-to-speech'
import fs from 'fs'
import { NextResponse } from 'next/server'
import util from 'util'

const client = new textToSpeech.TextToSpeechClient()

export async function POST(req: Request) {
  const { text, id } = await req.json()

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: {
        audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
      },
    }

  const [response] = await client.synthesizeSpeech(request)

  if (!response.audioContent) {
    throw new Error('Audio content is empty')
  }

  const writeFile = util.promisify(fs.writeFile)
  await writeFile('output.mp3', response.audioContent, 'binary')
  console.log('Audio file generated!')

  return NextResponse.json({ Result: 'Success' })
}
 */

import fs from 'fs'
import { NextResponse } from 'next/server'
import * as PlayHT from 'playht'

// Initialize PlayHT client with user credentials.
PlayHT.init({
  userId: process.env.VOICE_USER_KEY || '', // Provide empty string as fallback
  apiKey: process.env.VOICE_API_KEY || '', // Provide empty string as fallback
})

// Function to handle POST requests and generate audio.
export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body for text input.
    const { text } = await req.json()

    // Start streaming the audio from PlayHT.
    const stream = await PlayHT.stream(text, { voiceEngine: 'Play3.0-mini' })

    // Create or overwrite 'output.mp3' with the audio chunks.
    stream.on('data', (chunk) => {
      fs.appendFileSync('output.mp3', chunk)
    })

    // Return a success response after the stream ends.
    return NextResponse.json({ result: 'Audio generation successful!' })
  } catch (error) {
    console.error('Error generating audio:', error)
    return NextResponse.json(
      { result: 'Failed to generate audio', error },
      { status: 500 },
    )
  }
}

//Google text to speech work
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

/* -----------------------------*********------------------------------ */
// For playht api but not working

/* import { NextRequest } from 'next/server'
import * as PlayHT from 'playht'

// Initialize client
PlayHT.init({
  userId: process.env.PLAYHT_USER_ID || '', // Provide empty string fallback to fix type error
  apiKey: process.env.PLAYHT_API_KEY || '', // Provide empty string fallback to fix type error
  defaultVoiceId:
    's3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json',
  defaultVoiceEngine: 'Play3.0-mini',
})

export async function POST(req: NextRequest) {
  const { text, id } = await req.json()
  const generated = await PlayHT.generate(text)

  // Grab the generated file URL
  const { audioUrl } = generated

  console.log('The url for the audio file is', audioUrl)
}
 */

/* ----------------------------****------------------------------- */
// For unreal speech api working
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import UnrealSpeech from 'unrealspeech'
const unrealSpeech = new UnrealSpeech(process.env.UNREAL_API_KEY!)

interface SpeechRequest {
  text: string
  id: string
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { text, id }: SpeechRequest = await req.json()
    const speechData = await unrealSpeech.speech(text)

    // Fetch the audio file from OutputUri
    const response = await fetch(speechData.OutputUri)
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`)
    }

    // Convert audio content to a buffer
    const audioBuffer = await response.arrayBuffer()

    // Define the path to save the audio file locally
    const outputDirectory = path.join(process.cwd(), 'src/audios')
    const outputFilePath = path.join(outputDirectory, `${id}.mp3`)

    // Ensure the directory exists
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true })
    }

    // Write the binary content to a local file
    fs.writeFileSync(outputFilePath, Buffer.from(audioBuffer))

    console.log(`Audio file successfully written to: ${outputFilePath}`)

    // Respond with something meaningful
    return new Response(
      JSON.stringify({
        message: 'Audio file saved successfully',
        filePath: outputFilePath,
      }),
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

import { FormData } from 'formdata-node'
import fetch from 'node-fetch'

export async function POST(req: Request) {
  const { prompt } = await req.json() // Adjusted to match the payload structure
  const form = new FormData()
  form.append('prompt', prompt)

  const apiKey = process.env.CLIPBOARD_IMAGE_API_KEY || ''

  try {
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: form,
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer() // Await to get the result as an ArrayBuffer

    // You can return the buffer here if necessary or convert it to a string/B64 for frontend
    const base64Image = Buffer.from(buffer).toString('base64')

    return new Response(JSON.stringify({ result: base64Image }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error: any) {
    console.error('There was a problem with the fetch operation:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}

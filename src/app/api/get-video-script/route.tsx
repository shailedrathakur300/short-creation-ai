// Importing the NextResponse module from 'next/server' for handling server-side responses.
import { NextResponse } from 'next/server'

// Importing a configuration or session object for interacting with an AI model.
import chatSession from '../../../configs/AiModel'

// Defining an asynchronous POST function to handle incoming requests.
export async function POST(req: Request) {
  try {
    // Parsing the JSON body of the incoming request to extract the 'prompt'.
    const { prompt } = await req.json()
    console.log(prompt) // Logging the extracted prompt to the console for debugging.

    // Sending the prompt to the chatSession object and awaiting a response.
    const result = await chatSession.sendMessage(prompt)
    console.log(result.response.text()) // Logging the response's text content to the console.

    // Returning the response as JSON after parsing the result text to an object.
    return NextResponse.json({ result: JSON.parse(result.response.text()) })
  } catch (error) {
    // Handling any errors that occur by returning an error object as JSON.
    return NextResponse.json({ error: error })
  }
}

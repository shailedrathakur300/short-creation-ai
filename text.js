require('dotenv').config()
const axios = require('axios')

const testPlayHtApi = async () => {
  const url = 'https://play.ht/api/v1/convert' // Update this endpoint if necessary

  const data = {
    voice: 'en-US-MichelleNeural', // Replace with your desired voice
    content: ['Hello, this is a test of the Play.ht API.'],
    title: 'Test Audio Generation',
  }

  const headers = {
    Authorization: process.env.PLAYHT_API_KEY,
    'X-User-ID': process.env.PLAYHT_USER_ID,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(url, data, { headers })
    console.log('Response:', response.data)
  } catch (error) {
    console.error(
      'Error generating audio:',
      error.response ? error.response.data : error.message,
    )
  }
}

testPlayHtApi()

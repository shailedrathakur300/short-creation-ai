const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai')

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

/* async function run() { */
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'write a script to generate 30 secounds video on topic:- interesting historical stroy along with ai image prompt in Realistic formate for each scene  give me result in JSON format with imagePrompt and contentText as field\n\n',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "Realistic painting of a bustling medieval marketplace, merchants selling goods, people in period clothing, horse-drawn carts, vibrant colors.",\n    "contentText": "In 1282, during a period of intense rivalry between Venice and Genoa, a seemingly minor incident sparked a war."\n  },\n  {\n    "imagePrompt": "Realistic image of a Venetian galley ramming a Genoese ship, splintering wood, chaotic fighting on deck, dark stormy sea.",\n    "contentText": "A brawl erupted between sailors in the port of Acre, now in modern-day Israel."\n  },\n  {\n    "imagePrompt": "Realistic painting of a medieval map showing the Mediterranean Sea with Venice and Genoa highlighted, trade routes marked.",\n    "contentText": "The two powerful maritime republics, Venice and Genoa, controlled vast trade networks across the Mediterranean."\n  },\n  {\n    "imagePrompt": "Realistic image of Venetian merchants unloading spices and silks from a ship, busy port scene, exotic goods.",\n    "contentText": "Their competition for dominance over these lucrative routes was fierce."\n  },\n  {\n    "imagePrompt": "Realistic depiction of a medieval war council, Venetian officials in ornate robes discussing strategy, maps and documents on the table.",\n    "contentText": "The fight in Acre escalated quickly, prompting Venice to declare war on Genoa."\n  },\n  {\n    "imagePrompt": "Realistic image of a naval battle between Venetian and Genoese fleets, cannons firing, ships sinking, smoke filling the air.",\n    "contentText": "The War of Curzola, as it became known, saw a series of intense naval battles."\n  },\n  {\n    "imagePrompt": "Realistic painting of Marco Polo in a Genoese prison, writing his travels, dimly lit cell.",\n    "contentText": "One notable consequence of this war was the capture of Marco Polo, who was fighting for Venice.  It was during his imprisonment in Genoa that he dictated his famous account of his travels."\n  },\n  {\n    "imagePrompt": "Realistic image of a medieval scribe writing on parchment, quill and ink, candlelight illuminating the page.",\n    "contentText": "Polo\'s tales of far-off lands, though sometimes embellished, captivated Europe and opened a window to the East."\n  },\n  {\n    "imagePrompt": "Realistic image of a medieval map showing Marco Polo\'s route to China, overland journey marked, cities and landmarks labeled.",\n    "contentText": "His journeys inspired future explorers and contributed significantly to European geographical knowledge."\n  },\n  {\n    "imagePrompt": "Realistic painting of a bustling medieval Venetian port, ships arriving and departing, merchants trading, flags waving in the breeze.",\n    "contentText": "Though the War of Curzola was ultimately a defeat for Venice, they eventually recovered their position as a dominant maritime power."\n  }\n  // ... Add more entries up to a total that fills approximately 30 seconds of video\n]\n```\n\nThis JSON provides ten scenes. You\'ll need to add more entries to reach a 30-second video length.  Remember to adjust the content and image prompts to create a cohesive and compelling narrative.  Consider adding scenes showing the aftermath of the war, the long-term impacts on trade, or other relevant historical details.  The duration of each scene will determine how many you ultimately need.\n',
        },
      ],
    },
  ],
})

/* const result = await chatSession.sendMessage('INSERT_INPUT_HERE')
  console.log(result.response.text()) */

/* run() */

export default chatSession

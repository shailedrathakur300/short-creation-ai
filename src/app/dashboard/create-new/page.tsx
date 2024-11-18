// 'use client' directive ensures that this component runs on the client side.
'use client'

// Importing necessary modules and components.
import axios from 'axios'
import { uuid } from 'drizzle-orm/pg-core'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import CustomLoading from './_components/CustomLoading'
import SelectDuration from './_components/SelectDuration'
import SelectStyle from './_components/SelectStyle'
import SelectTopic from './_components/SelectTopic'

// Interface definition for a script item with 'contentText' and 'imagePrompt' properties.
interface ScriptItem {
  contentText: string
  imagePrompt: string
}

// Main functional component.
function CreateNew() {
  // State to store form data, loading status, and video script results.
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [videoScript, setVideoScript] = useState<ScriptItem[]>([])

  const ScriptData = `The Library of Alexandria, one of the greatest libraries of the ancient world, was tragically destroyed. Its exact fate remains a mystery, but it's thought to have been gradually destroyed by a series of fires and other events.
Hadrian's Wall, built by the Roman Emperor Hadrian, stretches 73 miles across northern England. It was constructed to defend Roman Britain from the Picts.
The Terracotta Army, buried with China's first emperor Qin Shi Huang, consists of over 8,000 life-sized clay soldiers, horses, and chariots.  It was meant to protect the emperor in the afterlife.
During the Black Death, bubonic plague swept through Europe, Asia, and North Africa, killing an estimated 30-60% of Europe's population.
Genghis Khan united the nomadic tribes of Northeast Asia to form the Mongol Empire, one of history's largest contiguous land empires.
The signing of the Magna Carta in 1215 by King John of England was a pivotal moment in the development of individual rights and constitutional law.
Leonardo da Vinci's Mona Lisa is arguably the most famous painting in the world.  The identity of the subject and the meaning of her enigmatic smile are still debated today.
Johannes Gutenberg's invention of the printing press in the 15th century revolutionized the spread of information and ideas, paving the way for the Renaissance and the Reformation.`

  // Function to handle input changes for form fields.
  const OnHandleInputChange = (fieldName: string, fieldvalue: string) => {
    if (!fieldName || !fieldvalue) return // Return if the field name or value is empty.
    console.log(fieldName, fieldvalue) // Log field name and value.

    // Update formData state by merging new field values.
    setFormData((prev: any) => ({ ...prev, [fieldName]: fieldvalue }))
  }

  // Handler function to initiate video script generation.
  const onCreateClickHandler = () => {
    GetvideoScript()
    // GenerateAudioFile(ScriptData)
  }

  // Function to fetch video script data.
  const GetvideoScript = async () => {
    setLoading(true) // Set loading to true when the function is called.
    // Construct prompt for API request.
    const prompt = `write a script to generate ${formData.duration} video on topic:- ${formData.topic}  along with ai image prompt in ${formData.imageStyle}formate for each scene  give me result in JSON format with imagePrompt and contentText as field, No Plain text `

    console.log(prompt) // Log the constructed prompt.

    // Make POST request to the backend API and handle the response.
    const result = await axios
      .post('/api/get-video-script', {
        prompt: prompt,
      })
      .then((resp) => {
        console.log(resp.data.result) // Log the API response data.
        setVideoScript(resp.data.result) // Update state with the result.
        GenerateAudioFile(resp.data.result) // Call the GenerateAudioFile function with the result.
      })

    console.log(result) // Log the result of the request.
    setLoading(false) // Set loading to false after the operation.
  }

  // Placeholder function for generating audio files.
  // Function to generate audio file from video script
  const GenerateAudioFile = async (videoScriptData: ScriptItem[]) => {
    // Initialize empty string to store combined script text
    let script = ''
    const id = uuid() // Generate a unique ID for the audio file

    // Loop through each item in videoScript array
    // and concatenate the contentText with newlines
    videoScriptData.forEach((item: ScriptItem) => {
      script += item.contentText + '\n' // Add content text and newline
    })

    // Log the final combined script text
    console.log(script)

    await axios // Make POST request to the backend API
      .post('/api/audio/generate-audio', {
        // Send the script and ID as request body
        text: script, // Combined script text
        id: id, // Unique ID for the audio file
      })
      .then((resp) => {
        // Handle the response
        console.log(resp.data) // Log audio generation response.
      })
      .catch((error) => {
        console.error('Error generating audio:', error)
      })
  }

  // Return JSX with UI components.
  return (
    <div className="md:px-20">
      {/* Header for the page */}
      <h2 className="font-bold text-4xl text-primary text-center m-5 ">
        CreateNew
      </h2>
      <div className="mt-10 shadow-md p-10 ">
        {/* Input component for selecting a topic */}
        <SelectTopic onUserSelect={OnHandleInputChange} />
        {/* Input component for selecting a style */}
        <SelectStyle onUserSelect={OnHandleInputChange} />
        {/* Input component for selecting duration */}
        <SelectDuration onUserSelect={OnHandleInputChange} />

        {/* Button to create a video script */}
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
        >
          Create Short Video
        </Button>
      </div>
      {/* Loading component to show loading state */}
      <CustomLoading loading={loading} />
    </div>
  )
}

// Exporting the component as the default export.
export default CreateNew

'use client'

import axios from 'axios'
import { uuid } from 'drizzle-orm/pg-core'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import CustomLoading from './_components/CustomLoading'
import SelectDuration from './_components/SelectDuration'
import SelectStyle from './_components/SelectStyle'
import SelectTopic from './_components/SelectTopic'

interface ScriptItem {
  contentText: string
  imagePrompt: string
}

function CreateNew() {
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

  const OnHandleInputChange = (fieldName: string, fieldvalue: string) => {
    if (!fieldName || !fieldvalue) return
    console.log(fieldName, fieldvalue)
    setFormData((prev: any) => ({ ...prev, [fieldName]: fieldvalue }))
  }

  const onCreateClickHandler = () => {
    GetvideoScript()
  }

  const GetvideoScript = async () => {
    setLoading(true)
    const prompt = `write a script to generate ${formData.duration} video on topic:- ${formData.topic}  along with ai image prompt in ${formData.imageStyle}formate for each scene  give me result in JSON format with imagePrompt and contentText as field, No Plain text `

    console.log(prompt)

    const result = await axios
      .post('/api/get-video-script', {
        prompt: prompt,
      })
      .then((resp) => {
        console.log(resp.data.result)
        setVideoScript(resp.data.result)
        GenerateAudioFile(resp.data.result)
      })

    console.log(result)
    setLoading(false)
  }

  const GenerateAudioFile = async (videoScriptData: ScriptItem[]) => {
    let script = ''
    const id = uuid()

    videoScriptData.forEach((item: ScriptItem) => {
      script += item.contentText + '\n'
    })

    console.log(script)

    await axios
      .post('/api/audio/generate-audio', {
        text: script,
        id: id,
      })
      .then((resp) => {
        console.log(resp.data)
      })
      .catch((error) => {
        console.error('Error generating audio:', error)
      })
  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center m-5 ">
        CreateNew
      </h2>
      <div className="mt-10 shadow-md p-10 ">
        <SelectTopic onUserSelect={OnHandleInputChange} />
        <SelectStyle onUserSelect={OnHandleInputChange} />
        <SelectDuration onUserSelect={OnHandleInputChange} />
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
        >
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  )
}

export default CreateNew

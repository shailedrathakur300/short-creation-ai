'use client'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import SelectDuration from './_components/SelectDuration'
import SelectStyle from './_components/SelectStyle'
import SelectTopic from './_components/SelectTopic'

function CreateNew() {
  const [formData, setFormData] = useState<any>({})
  const OnHandleInputChange = (fieldName: string, fieldvalue: string) => {
    console.log(fieldName, fieldvalue)

    setFormData((prev: any) => ({ ...prev, [fieldName]: fieldvalue }))
  }

  const onCreateClickHandler = () => {
    GetvideoScript()
  }

  //Get Video Script
  const GetvideoScript = async () => {
    const prompt = `write a script to generate ${formData.duration} video on topic:- ${formData.topic}  along with ai image prompt in ${formData.imageStyle}formate for each scene  give me result in JSON format with imagePrompt and contentText as field, No Plain text `

    console.log(prompt)
    const result = await axios
      .post('/api/get-video-script', {
        prompt: prompt,
      })
      .then((resp) => {
        console.log(resp.data)
      })
    console.log(result)
  }
  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center m-5 ">
        CreateNew
      </h2>
      <div className="mt-10 shadow-md p-10 ">
        {/* Select Topic */}
        <SelectTopic onUserSelect={OnHandleInputChange} />
        {/* Select Style*/}
        <SelectStyle onUserSelect={OnHandleInputChange} />
        {/* Select Duration */}
        <SelectDuration onUserSelect={OnHandleInputChange} />

        {/* Create Button */}
        <Button
          className="mt-10 w-full"
          onClick={onCreateClickHandler}
        >
          Create Short Video
        </Button>
      </div>
    </div>
  )
}

export default CreateNew

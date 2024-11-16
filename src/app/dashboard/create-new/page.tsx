'use client'
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
        <Button className="mt-10 w-full">Create Short Video</Button>
      </div>
    </div>
  )
}

export default CreateNew

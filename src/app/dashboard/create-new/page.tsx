'use client'
import { useState } from 'react'
import SelectTopic from './_components/SelectTopic'

function CreateNew() {
  const [formData, setFormData] = useState<any>({})
  const OnHandleInputChange = (fieldName: string, fieldvalue: string) => {
    console.log(fieldName, fieldvalue)
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

        {/* Select Duration */}

        {/* Create Button */}
      </div>
    </div>
  )
}

export default CreateNew

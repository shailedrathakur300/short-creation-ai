'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { Textarea } from '../../../../components/ui/textarea'

interface SelectTopicProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void
}

function SelectTopic({ onUserSelect }: SelectTopicProps) {
  const options = [
    'Custom Prompt',
    'Random AI Story',
    'Scary Story',
    'Historical Facts',
    'Bed Time Story',
    'Comedy',
  ]
  const [selectedOption, setSelectedOption] = useState<string | undefined>()

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video</p>
      <Select
        onValueChange={(value: string) => {
          setSelectedOption(value)
          value !== 'Custom Prompt' && onUserSelect('topic', value)
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOption === 'Custom Prompt' && (
        <Textarea
          className="m-3"
          onChange={(e) => onUserSelect('topic', e.target.value)}
          placeholder="Write prompt on which you want to create video"
        />
      )}
    </div>
  )
}

export default SelectTopic

'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectDurationProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void
}
interface SelectTopicProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void
}
function SelectDuration({ onUserSelect }: SelectTopicProps) {
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Duration</h2>
      <p className="text-gray-500">How long do you want to create video</p>
      <Select
        onValueChange={(value: string) => {
          value !== 'Custom Prompt' && onUserSelect('topic', value)
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            key="30 Seconds"
            value="30 Seconds"
          >
            30 Seconds
          </SelectItem>
          <SelectItem
            key="60 Seconds"
            value="60 Seconds"
          >
            60 Seconds
          </SelectItem>
          <SelectItem
            key="1 Minutes"
            value="1 Minutes"
          >
            90 Seconds
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectDuration

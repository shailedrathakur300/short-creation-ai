import { useState } from 'react'

interface StyleOption {
  name: string
  image: string
}

interface SelectStyleProps {
  onUserSelect: (type: string, value: string) => void
}

interface CardProps {
  children: React.ReactNode
}

const styleOptions: StyleOption[] = [
  {
    name: 'Realstic',
    image: '/real.jpeg',
  },
  {
    name: 'Cartoon',
    image: '/cortoon.jpeg',
  },
  {
    name: 'Comic',
    image: '/comic.jpeg',
  },
  {
    name: 'WaterColor',
    image: '/waterColor.jpeg',
  },
  {
    name: 'GTA',
    image: '/gta.jpeg',
  },
]

const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>()

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select the style of your video</p>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            className={`relative hover:scale-110 transition-all cursor-pointer rounded-xl
              ${selectedOption === item.name ? 'border-2 border-primary' : ''}`}
          >
            <img
              src={item.image}
              width={200}
              height={200}
              alt={item.name}
              className="h-40 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name)
                onUserSelect('imageStyle', item.name)
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="box-border w-[190px] h-[190px] bg-[rgba(217,217,217,0.58)] border border-white shadow-[12px_17px_51px_rgba(0,0,0,0.22)] rounded-[17px] text-center cursor-pointer transition-all duration-500 font-extrabold text-black select-none hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]">
        {children}
      </div>
    </div>
  )
}

export default SelectStyle

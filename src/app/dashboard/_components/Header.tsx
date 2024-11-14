'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '../../../components/ui/button'
function Header() {
  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md">
      <div className="flex gap-3 items-center ml-10">
        <Image
          src={'/logo.svg'}
          alt="logo.svg"
          width={30}
          height={30}
        />
        <h2 className="font-bold text-xl">Ai Shorts Video</h2>
      </div>
      <div className="flex gap-5 items-center mr-10">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  )
}

export default Header

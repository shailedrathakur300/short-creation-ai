import { UserButton } from '@clerk/nextjs'
import { Button } from '../components/ui/button'
export default function Home() {
  return (
    <div className="flex justify-between ">
      <div>
        <p>Hello Dosto</p>
        <Button className=" px-5 py-4 m-3">Click me</Button>
      </div>
      <div className="p-10 mr-10">
        <UserButton />
      </div>
    </div>
  )
}

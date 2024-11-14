import Link from 'next/link'
import { Button } from '../../../components/ui/button'

function EmptyState() {
  return (
    <div className="p-5 py-24 flex flex-col items-center mt-10 border-2 border-dashed">
      <h2 className="p-2 font-bold">You don't have any short videos created</h2>
      <Link href={'dashboard/create-new'}>
        <Button>Create New Short Video</Button>
      </Link>
    </div>
  )
}

export default EmptyState

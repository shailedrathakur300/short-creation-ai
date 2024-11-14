'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import EmptyState from './_components/EmptyState'

function Dashboard() {
  const [videoList, setVideoList] = useState<any>([])

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={'dashboard/create-new'}>
          <Button className="m-5">+Create New</Button>
        </Link>
      </div>
      {/* Empty State */}
      {videoList.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  )
}

export default Dashboard

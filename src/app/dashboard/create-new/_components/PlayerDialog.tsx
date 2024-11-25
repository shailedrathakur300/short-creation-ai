import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Player } from '@remotion/player'
import { useEffect, useState } from 'react'
import RemotionVideo from '../../_components/RemotionVideo'
function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    setOpenDialog(playVideo)
  }, [playVideo])
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5  ">
            Your Video is Ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerDialog

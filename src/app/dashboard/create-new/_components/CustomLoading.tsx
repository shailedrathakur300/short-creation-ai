import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import Image from 'next/image'

function CustomLoading({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="bg-white flex flex-col items-center">
          <Image
            src="/work-in-progress.gif"
            alt="logo"
            width={200}
            height={200}
          />
          <h2>Work in Progress.....</h2>
          <p>Please Wait! Don't Refresh</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading

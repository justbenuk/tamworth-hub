'use client'
import { UploadButton } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"

export default function MediaUploadButton() {
  const router = useRouter()

  return (
    <UploadButton
      endpoint='mediaUpload'
      onClientUploadComplete={() => {
        //we save the file in the core.ts file... all we need to do is refresh the browser to see the new file
        router.refresh()
      }}
      onUploadError={(error: Error) => {
        alert(`Upload Failed: ${error.message}`)
      }}
    />
  )
}


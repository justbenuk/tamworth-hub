import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { headers } from 'next/headers'
import { createUploadthing, type FileRouter } from 'uploadthing/next'


const f = createUploadthing()

export const ourFileRouter = {
  //this will be used for general media files 
  mediaUpload: f({
    image: {
      maxFileCount: 10,
      maxFileSize: "4MB"
    }
  })
    .middleware(async () => {
      //Check the user has a session and get the user ID 
      const session = await auth.api.getSession({
        headers: await headers()
      })

      //If there is no session, throw an error 
      if (!session) throw new Error('Unauthorised')

      //check if the user is admin, 0only the admin user should be able to upload to the media library
      if (session.user.role !== 'ADMIN') throw new Error('Unauthorised')

      //if all checks are complete, return the user id 
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await db.media.create({
        data: {
          filename: file.name,
          originalName: file.name,
          url: file.ufsUrl,
          key: file.key,
          mimeType: file.type,
          size: file.size,
          uploadedBy: metadata.userId,
          folder: 'general'
        }
      })
      console.log("Upload Complete", media.id)
      return {
        mediaId: media.id,
        url: file.ufsUrl
      }
    }),

  //user added image
  businessImage: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      //this one needs to be slightly different as i want users to be able to add images
      //Check the user has a session and get the user ID 
      const session = await auth.api.getSession({
        headers: await headers()
      })

      //If there is no session, throw an error 
      if (!session) throw new Error('Unauthorised')

      //if all checks are complete, return the user id 
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await db.media.create({
        data: {
          filename: file.name,
          originalName: file.name,
          url: file.ufsUrl,
          key: file.key,
          mimeType: file.type,
          size: file.size,
          uploadedBy: metadata.userId,
          folder: 'business'
        }
      })

      console.log("upload Complete", media.id)
      return {
        mediaId: media.id,
        url: file.ufsUrl
      }
    }),

  //user added image
  eventImage: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      //this one needs to be slightly different as i want users to be able to add images
      //Check the user has a session and get the user ID 
      const session = await auth.api.getSession({
        headers: await headers()
      })

      //If there is no session, throw an error 
      if (!session) throw new Error('Unauthorised')

      //if all checks are complete, return the user id 
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await db.media.create({
        data: {
          filename: file.name,
          originalName: file.name,
          url: file.ufsUrl,
          key: file.key,
          mimeType: file.type,
          size: file.size,
          uploadedBy: metadata.userId,
          folder: 'event'
        }
      })

      console.log("upload Complete", media.id)
      return {
        mediaId: media.id,
        url: file.ufsUrl
      }
    }),

  //user added image
  jobImage: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      //this one needs to be slightly different as i want users to be able to add images
      //Check the user has a session and get the user ID 
      const session = await auth.api.getSession({
        headers: await headers()
      })

      //If there is no session, throw an error 
      if (!session) throw new Error('Unauthorised')

      //if all checks are complete, return the user id 
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await db.media.create({
        data: {
          filename: file.name,
          originalName: file.name,
          url: file.ufsUrl,
          key: file.key,
          mimeType: file.type,
          size: file.size,
          uploadedBy: metadata.userId,
          folder: 'event'
        }
      })

      console.log("upload Complete", media.id)
      return {
        mediaId: media.id,
        url: file.ufsUrl
      }
    }),
} satisfies FileRouter
export type OurFileRouter = typeof ourFileRouter

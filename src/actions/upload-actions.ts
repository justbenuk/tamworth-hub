'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()


//get all the media files
export async function fetchMediaFiles(folder?: string) {

  //construck where string to make things easier 
  const where = folder && folder !== 'all' ? { folder } : {}

  const media = await db.media.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  if (!media) throw new Error('Error fetchinf media files')

  return media
}

export async function deleteMedia(id: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) throw new Error('Not logged in')

  const media = await db.media.findUnique({
    where: { id },
  });

  if (!media) {
    throw new Error('Media not found');
  }

  // Delete from UploadThing
  try {
    await utapi.deleteFiles(media.key);
  } catch (error) {
    console.error('Failed to delete from UploadThing:', error);
    // Continue with database deletion even if UploadThing fails
  }

  // Delete from database
  await db.media.delete({
    where: { id },
  });

  revalidatePath('/admin/media');

  return { success: true };
}

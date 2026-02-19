import MediaUploadButton from "@/components/media/MediaUploadButton";
import { MediaFilters } from "@/components/media/MediaFilters";
import { MediaSearchParams } from "@/types";
import { Suspense } from "react";
import { fetchMediaFiles } from "@/actions/upload-actions";
import { MediaGrid } from "@/components/media/MediaGrid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MediaPage({ searchParams }: { searchParams: Promise<MediaSearchParams> }) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) return null

  const { folder: folderParam, search } = await searchParams
  const folder = folderParam || 'all'
  const media = await fetchMediaFiles(folder === 'all' ? undefined : folder)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Media Library</h1>
          <p>Manage your images and files</p>
        </div>
        <MediaUploadButton />
      </div>

      {/*Filters are placed here*/}
      <MediaFilters currentFolder={folder} />

      {/*Media grid*/}
      <MediaGrid media={media} />

      <Suspense fallback={<MediaGridSkeleton />}></Suspense>
      {/*Stats*/}
    </div>
  )
}

function MediaGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>)
}


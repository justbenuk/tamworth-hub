"use client";

import { UploadButton as UploadThingButton } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

export type UploadedMedia = {
  id: string;
  url: string;
  name: string;
  type: string;
};

type Props = {
  endpoint: keyof OurFileRouter;
  label?: string;
  onUploadComplete: (files: UploadedMedia[]) => void;
  onUploadError?: (error: Error) => void;
};

export default function ImageUploadButton({
  endpoint,
  label = "Upload file",
  onUploadComplete,
  onUploadError,
}: Props) {
  return (
    <UploadThingButton
      endpoint={endpoint}
      appearance={{
        container: "w-full",
        button:
          "h-10 w-full rounded-md border px-6 text-primary border-primary",
        allowedContent: "text-xs text-muted-foreground",
      }}
      content={{
        button({ ready, isUploading }) {
          if (!ready) return "Preparing...";
          if (isUploading) return "Uploading...";
          return label;
        },
      }}
      onClientUploadComplete={(result) => {
        const files = result.map((file) => ({
          id: file.serverData.mediaId,
          url: file.serverData.file,
          name: file.name,
          type: file.type,
        }));
        onUploadComplete(files);
      }}
      onUploadError={(error) => {
        toast.error(error.message || "Upload failed");
        onUploadError?.(error);
      }}
    />
  );
}

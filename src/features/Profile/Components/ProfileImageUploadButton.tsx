"use client";

import { toast } from "@/components/ui/toast";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

export default function ProfileImageUploadButton() {
  const router = useRouter();

  return (
    <UploadButton
      endpoint={"profileImageUploader"}
      appearance={{
        button: "bg-primary px-8 text-white",
      }}
      onClientUploadComplete={() => {
        toast.add({
          title: "Image Uploaded",
        });
        router.refresh();
      }}
    />
  );
}

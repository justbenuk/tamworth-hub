import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();

export const ourFileRouter = {
  profileImageUploader: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const image = await db.media.create({
        data: {
          key: file.key,
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          type: "IMAGE",
          uploadedById: metadata.userId,
        },
      });

      await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          image: file.ufsUrl,
        },
      });

      await db.activityLog.create({
        data: {
          userId: metadata.userId,
          feature: "Profile",
          action: "Update",
          description: "Updated profile image",
        },
      });

      revalidatePath("/dashboard/profile");
      return {
        mediaId: image.id,
        file: file.ufsUrl,
      };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;

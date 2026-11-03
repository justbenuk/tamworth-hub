import { db } from "@/lib/db";
import { requireUser } from "@/lib/sesstions";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
const f = createUploadthing();
export const utapi = new UTApi();

export const ourFileRouter = {
  profileImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await requireUser();

      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldImage = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
        select: {
          image: true,
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

      if (oldImage?.image && oldImage.image !== file.ufsUrl) {
        try {
          const oldImageUrl = new URL(oldImage.image);
          const pathParts = oldImageUrl.pathname.split("/").filter(Boolean);
          const fileKey = pathParts.at(-1);

          // Only delete files stored by UploadThing; profile images can also
          // come from external identity providers.
          if (pathParts.at(-2) === "f" && fileKey) {
            await utapi.deleteFiles(fileKey);
          }
        } catch (error) {
          console.error("Failed to delete previous profile image", error);
        }
      }

      revalidatePath("/profile");
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;

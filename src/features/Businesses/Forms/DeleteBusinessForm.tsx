import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteBusinessByIdAction } from "../BusinessActions";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash } from "@hugeicons/core-free-icons";
import { toast } from "@/components/ui/toast";

export default function DeleteBusinessForm({ id }: { id: string }) {
  async function handleDelete() {
    const response = await DeleteBusinessByIdAction(id);

    if (response.success) {
      toast.add({
        description: response.message,
      });
    } else {
      toast.add({
        description: response.message,
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant={"ghost"} size={"icon-sm"} />}
      >
        <HugeiconsIcon icon={Trash} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Business</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

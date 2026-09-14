import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ward } from "@prisma/client";
import EditWardForm from "../forms/EditWardForm";

export default function EditWardDialog({ ward }: { ward: Ward }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon-xs"} variant={"ghost"} className="text-yellow-500">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ward</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditWardForm ward={ward} />
      </DialogContent>
    </Dialog>
  );
}

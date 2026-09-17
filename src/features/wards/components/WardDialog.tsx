import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddWardForm from "../forms/AddWardForm";
import { Button } from "@/components/ui/button";

export default function WardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ward</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddWardForm />
      </DialogContent>
    </Dialog>
  );
}

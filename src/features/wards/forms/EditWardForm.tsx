import { Ward } from "@prisma/client";
import WardForm from "./WardForm";

export default function EditWardForm({ ward }: { ward: Ward }) {
  return <WardForm mode="edit" ward={ward} />;
}

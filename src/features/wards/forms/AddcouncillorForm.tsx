import { Ward } from "@prisma/client";
import CouncillorForm from "./CouncillorForm";

export default function AddCouncillorForm({ wards }: { wards: Ward[] }) {
  return <CouncillorForm mode="add" wards={wards} />;
}

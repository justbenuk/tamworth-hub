import { Prisma } from "@prisma/client";
import CouncillorForm from "./CouncillorForm";

type CouncillorWImage = Prisma.CouncillorGetPayload<{
  include: {
    image: true;
  };
}>;
export default function EditCouncillorForm({
  councillor,
}: {
  councillor: CouncillorWImage;
}) {
  return <CouncillorForm mode="edit" councillor={councillor} />;
}

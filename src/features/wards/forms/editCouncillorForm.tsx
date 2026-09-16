import { Prisma, Ward } from "@prisma/client";
import CouncillorForm from "./CouncillorForm";

type CouncillorWImage = Prisma.CouncillorGetPayload<{
  include: {
    image: true;
  };
}>;
export default function EditCouncillorForm({
  councillor,
  wards,
}: {
  councillor: CouncillorWImage;
  wards: Ward[];
}) {
  return <CouncillorForm mode="edit" councillor={councillor} wards={wards} />;
}

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";
import { Warning } from "@hugeicons/core-free-icons";
import { ReactNode } from "react";

type EmptyProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function EmptyCard({
  title,
  description,
  children,
}: EmptyProps) {
  return (
    <Empty className="border-2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Warning} size={28} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
}

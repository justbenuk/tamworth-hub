import { Folder } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { ReactNode } from "react";

export default function EmptyCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Empty className="border-3 bg-red-500/30 border-red-500/50">
      <EmptyHeader>
        <EmptyMedia variant={"icon"} className="bg-red-500/50 rounded-full">
          <Folder />
        </EmptyMedia>
        <EmptyTitle className="text-xl text-red-500">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
}

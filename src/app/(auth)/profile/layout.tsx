import { requireUser } from "@/features/authentication/lib/session";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ProfileLayout({ children }: Props) {
  await requireUser();
  return <div>{children}</div>;
}

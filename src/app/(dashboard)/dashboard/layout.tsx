import { requireUser } from "@/features/authentication/lib/session";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ProfileLayout({ children }: Props) {
  await requireUser();
  return (
    <div className="flex flex-col justify-center min-h-screen">{children}</div>
  );
}

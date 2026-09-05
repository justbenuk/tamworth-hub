import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function BaseLayout({ children }: LayoutProps) {
  return <div className="flex flex-col justify-between h-full">{children}</div>;
}

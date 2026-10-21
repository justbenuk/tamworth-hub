import MainHeader from "@/components/headers/MainHeader";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <MainHeader />
      <div className="flex-1">{children}</div>
      <footer>this is the footer</footer>
    </div>
  );
}

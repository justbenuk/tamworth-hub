import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header></header>
      <div>{children}</div>
      <footer></footer>
    </div>
  );
}

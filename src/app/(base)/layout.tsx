import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header>header</header>
      <div>{children}</div>
      <footer>this is the footer</footer>
    </div>
  );
}

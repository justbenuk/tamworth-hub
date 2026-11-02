import { ReactNode } from "react";

type BaseLayout = {
  children: ReactNode;
};

export default function BaseLayout({ children }: BaseLayout) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

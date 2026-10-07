import { ReactNode } from "react";

type SidebarBoxProps = {
  title: string;
  children: ReactNode;
};

export default function SidebarBox({ title, children }: SidebarBoxProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-2 bg-primary text-primary-foreground font-semibold">
        <h1>{title}</h1>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

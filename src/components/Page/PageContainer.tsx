import { cn } from "cn";
import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
};

const sizes = {
  small: "w-full max-w-5xl mx-auto",
  medium: "w-full max-w-7xl mx-auto",
  large: "container mx-auto",
};

export default function PageContainer({
  children,
  className,
  size = "large",
}: PageContainerProps) {
  return (
    <div className={cn("px-6 2xl:px-0", className, sizes[size])}>
      {children}
    </div>
  );
}

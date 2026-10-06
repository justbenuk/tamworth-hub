import { cn } from "cn";
import { ReactNode } from "react";

type PageContainerProps = {
  size?: "small" | "medium" | "large";
  children: ReactNode;
  className?: string;
};

const pageSizes = {
  small: "max-w-3xl mx-auto",
  medium: "max-w-7xl mx-auto",
  large: "container mx-auto",
};
export default function PageContainer({
  size = "medium",
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn("w-full px-6 py-4", pageSizes[size], className)}>
      {children}
    </div>
  );
}

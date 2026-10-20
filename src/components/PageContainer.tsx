import { cn } from "cn";
import { ReactNode } from "react";

type PageControllerProps = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizes = {
  small: "max-w-3xl",
  medium: "max-w-7xl",
  large: "container",
};

export default function PageContainer({
  children,
  className,
  size = "large",
}: PageControllerProps) {
  return (
    <div className={cn("mx-auto px-6 2xl:px-0", className, sizes[size])}>
      {children}
    </div>
  );
}

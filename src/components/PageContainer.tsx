import { cn } from "cn";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "large" | "medium" | "small";
}

const sizes = {
  large: "container mx-auto px-6 2xl:px-0",
  medium: "max-w-7xl mx-auto w-full px-6 2xl:px-0",
  small: "max-w-3xl w-full mx-auto px-6 2xl:px-0",
};

export default function PageContainer({
  children,
  size = "large",
  className,
}: Props) {
  return <div className={cn("", sizes[size], className)}>{children}</div>;
}

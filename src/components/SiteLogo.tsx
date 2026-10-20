import { cn } from "cn";
import { CastleIcon } from "lucide-react";
import Link from "next/link";

const iconSizes = {
  small: "size-4",
  medium: "size-8",
  large: "size-12",
};

const textSizes = {
  small: "text-md",
  medium: "text-2xl",
  large: "text-4xl",
};

type LogoProps = {
  size?: "small" | "medium" | "large";
};

export default function SiteLogo({ size = "medium" }: LogoProps) {
  return (
    <Link
      href={"/"}
      className="flex flex-row items-center justify-center gap-2 text-primary font-semibold"
    >
      <CastleIcon className={cn("", iconSizes[size])} />
      <span className={cn("hidden md:flex", textSizes[size])}>
        Tamworth Hub
      </span>
    </Link>
  );
}

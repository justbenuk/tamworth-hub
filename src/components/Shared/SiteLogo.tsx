import { cn } from "cn";
import { CastleIcon } from "lucide-react";
import Link from "next/link";

type SiteLogoProps = {
  size?: "large" | "medium" | "small";
};

const textSize = {
  small: "text-lg",
  medium: "text-xl",
  large: "text-4xl",
};

const iconSize = {
  small: "size-4",
  medium: "size-5",
  large: "site-7",
};

export default function SiteLogo({ size = "medium" }: SiteLogoProps) {
  return (
    <Link href={"/"} className="flex flex-row gap-2 items-center">
      <CastleIcon className={cn("", iconSize[size])} />
      <span className={cn("hidden md:block", textSize[size])}>
        Tamworth Hub
      </span>
    </Link>
  );
}

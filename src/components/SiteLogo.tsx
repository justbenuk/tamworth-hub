import { ChurchIcon } from "lucide-react";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href={"/"} className="flex flex-row gap-2 items-center">
      <div className="rounded-full bg-primary text-white p-2">
        <ChurchIcon className="size-5" />
      </div>
      <span>Tamworth Hub</span>
    </Link>
  );
}

import { RadioIcon } from "lucide-react";
import Link from "next/link";

export default function RadioTamworth() {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <RadioIcon />
      </div>
      <div className="flex flex-col items-center p-2">
        <Link href={"https://www.radiotamworth.com/player"} target="_blank">
          Radio Tamworth - Live
        </Link>
      </div>
    </div>
  );
}

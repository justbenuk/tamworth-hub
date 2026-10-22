import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link
      href={"/"}
      className="flex flex-col items-center justify-center gap-2"
    >
      <h1>
        TAMWORTH <span className="text-primary">HUB</span>
      </h1>
      <div className="flex flex-row items-center justify-evenly w-full">
        <span>NEWS</span>
        <span>|</span>
        <span>PEOPLE</span>
        <span>|</span>
        <span>PLACES</span>
        <span>|</span>
        <span>COMMUNITY</span>
      </div>
    </Link>
  );
}

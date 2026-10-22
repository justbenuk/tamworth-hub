export default function SiteTagLine() {
  return (
    <div
      className="flex flex-col items-center font-handwritten text-3xl leading-[0.85] text-foreground select-none md:text-4xl"
      aria-label="Your town. Our community."
    >
      <span aria-hidden="true" className="-rotate-6 -translate-x-5">
        Your town.
      </span>

      <span aria-hidden="true" className="rotate-[-4deg] translate-x-5">
        Our community.
      </span>
    </div>
  );
}

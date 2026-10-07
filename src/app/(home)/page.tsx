import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-semibold text-2xl text-primary">Latest News</h1>
            <Link href={"/news"} className="underline">
              View All
            </Link>
          </div>
          <div className="border h-72">News</div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-semibold text-2xl text-primary">
              Latest Crime
            </h1>
            <Link href={"/crime"} className="underline">
              View All
            </Link>
          </div>
          <div className="grid gap-2">
            <div className="border">box</div>
            <div className="border">box</div>
            <div className="border">box</div>
            <div className="border">box</div>
            <div className="border">box</div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-semibold text-2xl text-primary">Latest Events</h1>
          <Link href={"/events"} className="underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <div className="border size-72">box</div>
          <div className="border size-72">box</div>
          <div className="border size-72">box</div>
          <div className="border size-72">box</div>
          <div className="border size-72">box</div>
          <div className="border size-72">box</div>
        </div>
      </div>
      <div className="border h-25">Contact</div>
    </div>
  );
}

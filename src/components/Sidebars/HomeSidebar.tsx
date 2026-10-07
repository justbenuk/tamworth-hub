import Link from "next/link";
import SidebarBox from "./SidebarBox";
import RadioTamworth from "./SidebarSections/RadioTamworth";

export default function HomeSidebar() {
  return (
    <div className="space-y-12">
      <div className="grid gap-6">
        <SidebarBox title="Local Radio">
          <RadioTamworth />
        </SidebarBox>
        <SidebarBox title="Box 1">
          <p>text</p>
        </SidebarBox>
        <SidebarBox title="Box 2">
          <p>text</p>
        </SidebarBox>
        <SidebarBox title="Box 3">
          <p>text</p>
        </SidebarBox>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-semibold text-2xl text-primary">Latest Jobs</h1>
          <Link href={"/jobs"} className="underline">
            View All
          </Link>
        </div>
        <div className="grid gap-2">
          <div className="border">box</div>
          <div className="border">box</div>
          <div className="border">box</div>
          <div className="border">box</div>
        </div>
      </div>
    </div>
  );
}

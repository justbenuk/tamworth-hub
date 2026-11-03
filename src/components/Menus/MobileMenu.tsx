import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { HugeiconsIcon } from "@hugeicons/react";
import SiteLogo from "../Shared/SiteLogo";
import PageContainer from "../Page/PageContainer";
import { SITEMENUITEMS } from "@/data/menus";
import Link from "next/link";
import {
  ArrowRightBigIcon,
  MenuCollapseFreeIcons,
} from "@hugeicons/core-free-icons";

export default function MobileMenu() {
  return (
    <PageContainer className="lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant={"ghost"}>
              <HugeiconsIcon icon={MenuCollapseFreeIcons} className="size-8" />
            </Button>
          }
          className={"flex flex-row items-center justify-end w-full"}
        />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <SiteLogo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-6 p-6">
            {SITEMENUITEMS.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-xl font-semibold flex flex-row items-center gap-2"
              >
                {item.name}
                <HugeiconsIcon icon={ArrowRightBigIcon} />
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
}

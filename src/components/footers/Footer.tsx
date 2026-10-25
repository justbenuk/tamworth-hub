import Link from "next/link";
import PageContainer from "../PageContainer";

export default function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          <div className="col-span-1 md:col-span-2">
            <div className="grid gap-4">
              <div>
                <h2 className=" text-white">
                  Tamowrth <span className="text-primary">Hub</span>
                </h2>
                <p className="text-white text-tagline leading-none text-[0.5rem]">
                  Your Town, Our Community
                </p>
              </div>
              <p className="text-secondary md:w-2/3">
                Connecting Tamworth through local news, events, businesses, jobs
                and community stories
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white">Explore</h4>
            <nav className="flex flex-col space-y-0.5 text-secondary">
              <Link href={"/"}>Home</Link>
              <Link href={"/events"}>What&apos;s On</Link>
              <Link href={"/businesses"}>Businesses</Link>
              <Link href={"/jobs"}>Jobs</Link>
              <Link href={"/community"}>Community</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-white">Information</h4>
            <nav className="flex flex-col space-y-0.5 text-secondary">
              <Link href={"/about"}>About</Link>
              <Link href={"/contact"}>Contact Us</Link>
              <Link href={"/privacy"}>Privacy Policy</Link>
              <Link href={"/cookie"}>Cookie Policy</Link>
              <Link href={"/Terms Of Use"}>Terms of Use</Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between border-t border-neutral-100/50 py-2 text-secondary">
          <span>&copy; Tamworth Hub. All Rights Reserved</span>
          <nav className="flex flex-row gap-2 items-center">social Links</nav>
        </div>
      </PageContainer>
    </footer>
  );
}

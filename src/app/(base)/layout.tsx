import Footer from "@/components/Footer";
import Header from "@/components/header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function BaseLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

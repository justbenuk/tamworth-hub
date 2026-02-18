import Header from "@/components/shared/Header";
import { RootProps } from "@/types";

export default function MainLayout({ children }: RootProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}


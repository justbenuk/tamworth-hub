import Header from "@/components/shared/Header";
import { RootProps } from "@/types";

export default function BusinessLayout({ children }: RootProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className="flex-1">{children}</main>
      <div>footer</div>
    </div>
  )
}


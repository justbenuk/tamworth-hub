import { RootProps } from "@/types";

export default function MainLayout({ children }: RootProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}


import { isAuthenticated } from "@/actions/auth-actions";
import { RootProps } from "@/types";

export default async function DashboardTemplate({ children }: RootProps) {
  await isAuthenticated()
  return (
    <div>{children}</div>
  )
}


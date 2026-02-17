'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenu } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { authClient } from "@/lib/authclient"
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardNavUser() {

  const { isMobile } = useSidebar()
  const router = useRouter()

  const { data: session } = authClient.useSession()

  if (!session?.user) return null

  async function handleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        }
      }
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.user.image as string} alt={session.user.name} />
                <AvatarFallback className="rounded-lg">TH</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{session.user.name}</span>
                <span className="truncate text-xs">{session.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={session.user.image as string} alt={session.user.name} />
                  <AvatarFallback className="rounded-lg">TH</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session.user.name}</span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.user.role === 'admin' && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={'/admin'}>
                      <Sparkles />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


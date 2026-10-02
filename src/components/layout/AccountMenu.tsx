import type { Session } from "@supabase/supabase-js"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/format"
import { logOut } from "@/lib/supabase"
import { cn } from "@/lib/utils"

/** Avatar button in the navbar for signed-in visitors. */
export function AccountMenu({
  session,
  className,
}: {
  session: Session
  className?: string
}) {
  const { email, user_metadata } = session.user
  const name: string = user_metadata.full_name || email || "Account"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className={cn(
          "size-10 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <Avatar>
          <AvatarFallback className="bg-primary-soft text-label text-primary-soft-foreground">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate text-label text-foreground">{name}</span>
          {email && email !== name && (
            <span className="truncate text-caption font-normal text-muted-foreground">
              {email}
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logOut()}>
          <LogOut aria-hidden />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

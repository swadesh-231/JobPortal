import { useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { Menu } from "lucide-react"
import { Link } from "react-router"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { logOut } from "@/lib/supabase"
import { cn } from "@/lib/utils"

const rowClass =
  "flex h-12 items-center rounded-md px-3 text-body font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"

export function MobileNav({
  session,
  className,
}: {
  session: Session | null
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const [jobs, companies, pricing] = siteConfig.nav

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={cn("size-10 [&_svg]:size-4.5", className)}
        >
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="gap-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="text-h4">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
          {[jobs, companies].map((link) => (
            <a key={link.href} href={link.href} onClick={close} className={rowClass}>
              {link.label}
            </a>
          ))}
          <Accordion type="single" collapsible>
            <AccordionItem value="resources" className="border-none">
              <AccordionTrigger className={cn(rowClass, "w-full justify-between py-0 hover:no-underline")}>
                Resources
              </AccordionTrigger>
              <AccordionContent className="pb-1 pl-3">
                {siteConfig.resources.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={cn(rowClass, "text-body-sm text-muted-foreground")}
                  >
                    {link.label}
                  </a>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <a href={pricing.href} onClick={close} className={rowClass}>
            {pricing.label}
          </a>
        </nav>
        <div className="flex flex-col gap-3 border-t border-border p-4">
          {session ? (
            <>
              <p className="truncate text-body-sm text-muted-foreground">
                {session.user.email}
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  close()
                  logOut()
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" asChild>
                <Link to={siteConfig.routes.signUp}>Create account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={siteConfig.routes.logIn}>Log in</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

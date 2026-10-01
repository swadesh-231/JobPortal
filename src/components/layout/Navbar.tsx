import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { siteConfig } from "@/config/site"
import { useScrolled } from "@/hooks/useScrolled"
import { cn } from "@/lib/utils"
import { Container } from "./Container"
import { Logo } from "./Logo"
import { MobileNav } from "./MobileNav"

const linkClass =
  "inline-flex h-8 items-center rounded-md bg-transparent px-3 text-label text-muted-foreground transition-colors duration-120 outline-none hover:bg-accent hover:text-foreground focus:bg-transparent focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"

function NavLink({ href, label }: { href: string; label: string }) {
  const current =
    typeof location !== "undefined" && location.pathname === href
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={linkClass}>
        <a href={href} aria-current={current ? "page" : undefined}>
          {label}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export function Navbar() {
  const [sentinelRef, scrolled] = useScrolled()
  const [jobs, companies, pricing] = siteConfig.nav

  return (
    <>
      {/* 8px sentinel at the top of the page drives the scrolled state */}
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-2"
      />
      <header
        data-scrolled={scrolled}
        className="sticky top-0 z-40 h-14 border-b border-transparent transition-[background-color,border-color] duration-200 data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-md"
      >
        <Container className="flex h-full items-center gap-6">
          <Logo />
          <NavigationMenu
            viewport={false}
            aria-label="Main"
            className="hidden lg:flex"
          >
            <NavigationMenuList className="gap-1">
              <NavLink {...jobs} />
              <NavLink {...companies} />
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(linkClass, "h-8")}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:shadow-elevated group-data-[viewport=false]/navigation-menu:ring-0">
                  <ul className="w-72">
                    {siteConfig.resources.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="flex flex-col items-start gap-0.5 rounded-md p-3 hover:bg-accent focus:bg-accent"
                          >
                            <span className="text-label">{item.label}</span>
                            <span className="text-caption text-muted-foreground">
                              {item.description}
                            </span>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavLink {...pricing} />
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <a href={siteConfig.routes.logIn}>Log in</a>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <a href={siteConfig.routes.signUp}>Create account</a>
            </Button>
            <MobileNav className="lg:hidden" />
          </div>
        </Container>
      </header>
    </>
  )
}

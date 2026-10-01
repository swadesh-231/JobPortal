import { SOCIAL_ICONS } from "@/components/icons/social"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { Container } from "./Container"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-body-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="-ml-2 flex gap-1">
              {siteConfig.social.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon]
                return (
                  <li key={label}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-10 text-muted-foreground hover:text-foreground"
                      asChild
                    >
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${siteConfig.name} on ${label}`}
                      >
                        <Icon />
                      </a>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8"
          >
            {siteConfig.footer.map((group) => (
              <div key={group.title}>
                <h2 className="text-label">{group.title}</h2>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex h-10 items-center rounded-sm text-body-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-body-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  )
}

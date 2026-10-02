import { useEffect, type ReactNode } from "react"
import { Check } from "lucide-react"
import { JobDetailPane } from "@/components/jobs/JobDetailPane"
import { Logo } from "@/components/layout/Logo"
import { Panel, PanelHeader } from "@/components/shared/Panel"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { siteConfig } from "@/config/site"
import { heroJobs, sampleProfile } from "@/lib/sample-data"

const TRUST = [
  "Free for job seekers",
  "Your profile is private until you apply",
]

interface AuthLayoutProps {
  /** Browser tab title while the page is open */
  documentTitle: string
  title: string
  intro: ReactNode
  children: ReactNode
  /** Line under the form that links to the other auth page */
  footer?: ReactNode
}

/** Form on the left, product showcase on the right from lg. */
export function AuthLayout({
  documentTitle,
  title,
  intro,
  children,
  footer,
}: AuthLayoutProps) {
  useEffect(() => {
    const previous = document.title
    document.title = documentTitle
    return () => {
      document.title = previous
    }
  }, [documentTitle])

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative isolate flex flex-col px-4 sm:px-6 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-glow lg:hidden"
        />
        <header className="flex h-16 items-center justify-between">
          <Logo />
          <ThemeToggle />
        </header>
        <main
          id="main"
          className="flex flex-1 items-center justify-center py-10 sm:py-16"
        >
          <div className="w-full max-w-sm">
            <h1 className="font-display text-h2">{title}</h1>
            <p className="mt-2 text-body-sm text-muted-foreground">{intro}</p>
            <div className="mt-8">{children}</div>
            {footer && (
              <p className="mt-6 text-body-sm text-muted-foreground">{footer}</p>
            )}
          </div>
        </main>
        <footer className="flex h-16 items-center gap-5 text-label font-normal text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <a href="/privacy" className="rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            Privacy
          </a>
          <a href="/terms" className="rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            Terms
          </a>
        </footer>
      </div>

      {/* Always dark, whatever the page theme */}
      <aside className="dark relative isolate hidden overflow-hidden border-l border-border bg-background text-foreground lg:flex lg:items-center lg:justify-center lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-144 bg-glow"
        />
        <div className="w-full max-w-md">
          <h2 className="font-display text-h2">
            Know where you stand before you apply.
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Every role shows the requirements you meet and the ones you
            don't, so you spend your time on the right applications.
          </p>
          <figure inert className="mt-8">
            <Panel className="shadow-elevated">
              <PanelHeader
                title={
                  <>
                    <span className="text-muted-foreground">Ranked for </span>
                    {sampleProfile.summary}
                  </>
                }
              >
                <SampleBadge className="shrink-0" />
              </PanelHeader>
              <JobDetailPane job={heroJobs[0]} className="p-5" />
            </Panel>
          </figure>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-muted-foreground">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-foreground" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

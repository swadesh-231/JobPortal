import { Container } from "@/components/layout/Container"
import { siteConfig } from "@/config/site"

/**
 * Renders only with real data. In development an empty config shows
 * labelled placeholders; in production the section is omitted.
 */
export function SocialProof() {
  const { enabled, logos, stats } = siteConfig.socialProof
  const placeholder = !enabled && import.meta.env.DEV
  if (!enabled && !placeholder) return null

  return (
    <section
      aria-labelledby="social-proof-title"
      className="border-y border-border py-10"
    >
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <h2
            id="social-proof-title"
            className="text-label text-muted-foreground"
          >
            Hiring teams on Shortlist
          </h2>
          <ul className="grid grid-cols-3 items-center gap-4 sm:flex sm:flex-wrap sm:gap-8">
            {placeholder
              ? Array.from({ length: 6 }, (_, i) => (
                  <li
                    key={i}
                    className="flex h-6 items-center justify-center rounded-sm border border-dashed border-border-strong px-4 text-caption text-muted-foreground"
                  >
                    Logo
                  </li>
                ))
              : logos.slice(0, 6).map((logo) => (
                  <li key={logo.name} className="text-muted-foreground">
                    <img src={logo.src} alt={logo.name} className="h-6" />
                  </li>
                ))}
          </ul>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-border">
          {(placeholder
            ? Array.from({ length: 3 }, () => ({
                value: "[PLACEHOLDER]",
                label: "Stat",
              }))
            : stats.slice(0, 3)
          ).map((stat, i) => (
            <div key={i} className="flex flex-col-reverse px-4 first:pl-0 sm:px-6">
              <dt className="text-caption text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="truncate text-h4 tabular-nums sm:text-h3">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

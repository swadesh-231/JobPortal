import type { ReactNode } from "react"
import { FitLine } from "@/components/jobs/FitLine"
import { Section } from "@/components/layout/Section"
import { ResumeChip } from "@/components/shared/ResumeChip"
import { StatusBadge } from "@/components/tracker/StatusBadge"
import { heroJobs } from "@/lib/sample-data"

const ROWS: { title: string; usual: string; shortlist: string; fragment?: ReactNode }[] = [
  {
    title: "Finding roles",
    usual: "Keyword matches, newest first",
    shortlist: "Ranked by how well each role fits you",
  },
  {
    title: "Deciding",
    usual: "Read every description to guess",
    shortlist: "See requirements you meet and miss",
    fragment: <FitLine fit={heroJobs[0].fit} size="sm" className="w-40" />,
  },
  {
    title: "Applying",
    usual: "Re-type your details each time",
    shortlist: "One profile, right resume per role",
    fragment: <ResumeChip />,
  },
  {
    title: "Following up",
    usual: "A spreadsheet you forget",
    shortlist: "A board that updates when you apply",
    fragment: (
      <span className="flex gap-1.5">
        <StatusBadge status="applied" />
        <StatusBadge status="interview" />
      </span>
    ),
  },
  {
    title: "Promoted listings",
    usual: "Mixed into results",
    shortlist: "Always labelled “Promoted”", // [VERIFY]
  },
]

const PILLARS = [
  { label: "Discover", href: "#product" },
  { label: "Decide", href: "#matching" },
  { label: "Track", href: "#tracker" },
]

/** A comparison table, not an icon grid. */
export function ValueProposition() {
  return (
    <Section id="why" labelledBy="why-title" tone="card" border="y">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2
            id="why-title"
            className="text-title font-stretch-semi-condensed md:text-h2"
          >
            Most job sites stop at the listing.
          </h2>
          <p className="mt-3 max-w-2xl text-body text-muted-foreground md:text-body-lg">
            Shortlist covers the whole search: finding roles that fit, deciding
            which ones are worth your time, and keeping track of where every
            application stands.
          </p>
          <ul className="mt-6 flex gap-5">
            {PILLARS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex h-10 items-center rounded-sm text-body-sm font-medium text-primary-text underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <table className="hidden w-full text-left text-body-sm md:table">
            <caption className="sr-only">
              How most job sites compare with Shortlist at each stage of a
              search
            </caption>
            <thead>
              <tr className="border-b border-border text-label">
                <td className="w-1/5 pb-3" />
                <th scope="col" className="w-1/3 pb-3 pr-4 font-medium text-muted-foreground">
                  Most job sites
                </th>
                <th scope="col" className="pb-3 font-medium">
                  Shortlist
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.title} className="border-b border-border last:border-b-0">
                  <th scope="row" className="py-4 pr-4 align-middle text-label">
                    {row.title}
                  </th>
                  <td className="py-4 pr-4 align-middle text-muted-foreground">
                    {row.usual}
                  </td>
                  <td className="py-4 align-middle">
                    <div className="flex min-h-8 items-center justify-between gap-4">
                      <span className="font-medium">{row.shortlist}</span>
                      {row.fragment && (
                        <span className="hidden shrink-0 xl:block" aria-hidden>
                          {row.fragment}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: the same data as a definition list */}
          <dl className="divide-y divide-border md:hidden">
            {ROWS.map((row) => (
              <div key={row.title} className="py-4 first:pt-0 last:pb-0">
                <dt className="text-label">{row.title}</dt>
                <dd className="mt-1.5 text-body-sm text-muted-foreground">
                  Usually: {row.usual}
                </dd>
                <dd className="mt-1 text-body-sm font-medium">
                  On Shortlist: {row.shortlist}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}

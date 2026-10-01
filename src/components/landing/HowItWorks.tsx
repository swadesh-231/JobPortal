import type { ReactNode } from "react"
import { Check, FileText } from "lucide-react"
import { FitLine } from "@/components/jobs/FitLine"
import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { ResumeChip } from "@/components/shared/ResumeChip"
import { StatusBadge } from "@/components/tracker/StatusBadge"
import { heroJobs } from "@/lib/sample-data"

const STEPS: { title: string; body: string; artifact: ReactNode }[] = [
  {
    title: "Build your profile",
    body: "Upload your resume or start from scratch. Shortlist pulls out your skills and experience, and you review every field.",
    artifact: (
      <span className="flex items-center gap-1.5 text-label">
        <FileText className="size-3.5 text-muted-foreground" aria-hidden />
        resume.pdf
        <Check className="ml-auto size-3.5 text-success" aria-hidden />
        <span className="text-caption text-muted-foreground">Imported</span>
      </span>
    ),
  },
  {
    title: "Discover roles that fit",
    body: "Search as usual or open your ranked feed. Every role shows how many requirements you meet.",
    artifact: <FitLine fit={heroJobs[0].fit} size="sm" className="max-w-none" />,
  },
  {
    title: "Apply with your profile",
    // [VERIFY]
    body: "Pick a resume version. Your details carry over, so you only answer what's specific to the role.",
    artifact: <ResumeChip />,
  },
  {
    title: "Track everything",
    body: "Saved and applied roles land on your board. Move them forward and set follow-up reminders.",
    artifact: (
      <span className="flex flex-wrap gap-1.5">
        <StatusBadge status="applied" />
        <StatusBadge status="interview" />
      </span>
    ),
  },
]

/** A real sequence, so numbered markers are correct here. */
export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" border="t">
      <SectionHeader id="how-title" title="From resume to offer in four steps." />
      <ol className="grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {STEPS.map(({ title, body, artifact }, i) => (
          <li key={title} className="group flex gap-4 sm:flex-col">
            <div className="flex flex-col items-center sm:flex-row">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-label font-semibold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Mobile: line down. Desktop: connector to the next step. */}
              <span
                aria-hidden
                className="mt-2 w-px flex-1 bg-border group-last:hidden sm:mt-0 sm:hidden lg:-mr-6 lg:ml-3 lg:block lg:h-px lg:w-auto"
              />
            </div>
            <div className="flex-1 pb-8 group-last:pb-0 sm:pb-0">
              <h3 className="text-h4">{title}</h3>
              <p className="mt-1.5 text-body-sm text-muted-foreground">{body}</p>
              <div aria-hidden className="mt-4 rounded-md border border-border bg-card p-3">
                {artifact}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

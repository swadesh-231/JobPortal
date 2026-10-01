import { useState } from "react"
import { Check, CircleDashed, Minus, ShieldCheck } from "lucide-react"
import { FitLine } from "@/components/jobs/FitLine"
import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { Panel, PanelHeader } from "@/components/shared/Panel"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  gapSuggestions,
  heroJobs,
  rankingFactors,
  requirements,
} from "@/lib/sample-data"
import type { Requirement } from "@/types/job"

const STATE = {
  met: { icon: Check, label: "Met", className: "text-primary-text" },
  partial: { icon: CircleDashed, label: "Partly met", className: "text-primary-text" },
  missing: { icon: Minus, label: "Missing", className: "text-muted-foreground" },
} as const

const MOBILE_ROWS = 5

function RequirementRow({ requirement }: { requirement: Requirement }) {
  const { icon: Icon, label, className } = STATE[requirement.state]
  return (
    <li className="flex items-start gap-3 border-b border-border py-2.5">
      <Icon className={`mt-0.5 size-4 shrink-0 ${className}`} aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-body-sm font-medium">
          <span className="sr-only">{label}: </span>
          {requirement.label}
          {requirement.state === "partial" && (
            <span className="font-normal text-muted-foreground"> (partial)</span>
          )}
        </span>
        <span className="text-caption text-muted-foreground">
          {requirement.evidence}
        </span>
      </div>
    </li>
  )
}

export function SmartMatching() {
  const [open, setOpen] = useState(false)
  const job = heroJobs[0]

  return (
    <Section id="matching" labelledBy="matching-title" tone="card" border="y">
      <SectionHeader
        id="matching-title"
        title="Matching you can check."
        intro="Every recommendation shows its reasoning: what you meet, what you don't, and what would close the gap. No hidden scores."
      />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
        <Panel className="lg:col-span-7">
          <PanelHeader title={`Requirements for ${job.title}`}>
            <SampleBadge className="shrink-0" />
          </PanelHeader>
          <Collapsible open={open} onOpenChange={setOpen} className="px-4 pb-4">
            <ul>
              {requirements.slice(0, MOBILE_ROWS).map((requirement) => (
                <RequirementRow key={requirement.label} requirement={requirement} />
              ))}
            </ul>
            {/* Always shown from md; collapsed behind the trigger on mobile */}
            <CollapsibleContent
              forceMount
              className="data-[state=closed]:hidden md:data-[state=closed]:block"
            >
              <ul>
                {requirements.slice(MOBILE_ROWS).map((requirement) => (
                  <RequirementRow key={requirement.label} requirement={requirement} />
                ))}
              </ul>
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              <Button variant="link" size="sm" className="mt-1 h-10 md:hidden">
                {open ? "Show fewer requirements" : `Show all ${requirements.length} requirements`}
              </Button>
            </CollapsibleTrigger>
            <FitLine fit={job.fit} size="lg" className="mt-4" />
          </Collapsible>
        </Panel>

        <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-5 lg:gap-6">
          <Panel>
            <PanelHeader title="Close the gap" />
            <ul inert className="divide-y divide-border px-4">
              {gapSuggestions.map(({ text, action }) => (
                <li key={action} className="flex flex-col items-start gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-body-sm">{text}</p>
                  <Button variant="outline" size="sm" tabIndex={-1} className="shrink-0">
                    {action}
                  </Button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="flex-1">
            <PanelHeader title="How roles are ranked" />
            <ul className="divide-y divide-border px-4">
              {rankingFactors.map(({ title, detail }) => (
                <li key={title} className="py-2.5">
                  <p className="text-body-sm font-medium">{title}</p>
                  <p className="text-caption text-muted-foreground">{detail}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-border px-4 py-3 text-caption text-muted-foreground">
              Change any preference and the ranking updates.
            </p>
          </Panel>
        </div>
      </div>
      {/* [VERIFY] */}
      <p className="mt-6 flex items-start gap-2 text-body-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        Matching uses AI to read job descriptions and your profile. It never
        applies or messages anyone on your behalf.
      </p>
    </Section>
  )
}

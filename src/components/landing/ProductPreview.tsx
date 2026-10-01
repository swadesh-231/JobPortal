import { useState } from "react"
import {
  Bookmark,
  ChevronDown,
  ListChecks,
  SlidersHorizontal,
  SquareKanban,
} from "lucide-react"
import { ApplyButton } from "@/components/jobs/ApplyButton"
import { JobDetailPane } from "@/components/jobs/JobDetailPane"
import { JobRow } from "@/components/jobs/JobRow"
import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { StatusBadge } from "@/components/tracker/StatusBadge"
import { Button } from "@/components/ui/button"
import { previewCounts, previewJobs, previewStatuses } from "@/lib/sample-data"
import type { ApplicationStatus } from "@/types/job"
import { PreviewMobile } from "./PreviewMobile"
import {
  PreviewFilterChips,
  PreviewFilters,
  PreviewSidebar,
  PreviewTopBar,
} from "./PreviewPanes"

const CAPTIONS = [
  {
    icon: SlidersHorizontal,
    title: "Filters that stick",
    body: "Your work mode, salary floor and experience range carry across every search.",
  },
  {
    icon: ListChecks,
    title: "Fit on every role",
    body: "Requirements you meet and miss, right next to the description.",
  },
  {
    icon: SquareKanban,
    title: "Status everywhere",
    body: "See which roles you've saved, applied to, or heard back from.",
  },
]

const statuses: Partial<Record<string, ApplicationStatus>> = previewStatuses

export function ProductPreview() {
  const [selectedId, setSelectedId] = useState(previewJobs[0].id)
  const selected =
    previewJobs.find((job) => job.id === selectedId) ?? previewJobs[0]

  return (
    <Section id="product" labelledBy="product-title">
      <SectionHeader
        id="product-title"
        title="Your whole search on one screen."
        intro="Search, filter, compare and apply without a dozen open tabs."
      />

      <figure>
        <figcaption className="sr-only">
          Product preview with sample data. Select a result to see the role.
        </figcaption>

        <PreviewMobile
          jobs={previewJobs}
          selected={selected}
          onSelect={setSelectedId}
          statuses={statuses}
          className="mx-auto max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-elevated md:hidden"
        />

        <div className="hidden h-140 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-elevated md:flex lg:h-160">
          <PreviewTopBar />
          <div className="flex min-h-0 flex-1">
            <PreviewSidebar className="hidden lg:block" />
            <PreviewFilters className="hidden xl:block" />
            <div className="flex w-80 shrink-0 flex-col border-r border-border">
              <div inert className="flex h-11 shrink-0 items-center justify-between px-4 text-label">
                <span className="tabular-nums">{previewCounts.results} roles</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  Fit
                  <ChevronDown className="size-3.5" aria-hidden />
                </span>
              </div>
              <PreviewFilterChips className="shrink-0 px-3 pb-2 xl:hidden" />
              <ul className="min-h-0 flex-1 space-y-1 overflow-hidden p-2 pt-0">
                {previewJobs.map((job) => (
                  <li key={job.id}>
                    <JobRow
                      job={job}
                      selected={job.id === selected.id}
                      onSelect={() => setSelectedId(job.id)}
                    >
                      {statuses[job.id] && (
                        <StatusBadge status={statuses[job.id]!} />
                      )}
                    </JobRow>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden p-5 lg:p-6">
              <JobDetailPane
                job={selected}
                showDescription
                actionsFirst
                actions={
                  <div inert className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" tabIndex={-1}>
                      <Bookmark className="fill-current text-primary-text" aria-hidden />
                      Saved
                    </Button>
                    <ApplyButton job={selected} onApply={() => {}} />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </figure>

      <ul className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
        {CAPTIONS.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
            <div>
              <h3 className="text-h4">{title}</h3>
              <p className="mt-1 text-body-sm text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

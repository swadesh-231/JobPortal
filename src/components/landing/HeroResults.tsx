import { useState } from "react"
import { Bookmark } from "lucide-react"
import { ApplyButton } from "@/components/jobs/ApplyButton"
import { JobDetailPane } from "@/components/jobs/JobDetailPane"
import { JobRow } from "@/components/jobs/JobRow"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { SignUpDialog } from "@/components/shared/SignUpDialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"

interface HeroResultsProps {
  jobs: Job[]
  /** Short description of the sample profile the results are ranked for */
  rankedFor: string
  className?: string
}

/** Ranked results frame: clicking a row swaps the detail pane. */
export function HeroResults({ jobs, rankedFor, className }: HeroResultsProps) {
  const [selectedId, setSelectedId] = useState(jobs[0]?.id)
  const [dialogOpen, setDialogOpen] = useState(false)
  const selected = jobs.find((job) => job.id === selectedId) ?? jobs[0]
  const askToSignUp = () => setDialogOpen(true)

  const actions = (
    <>
      <Button type="button" variant="outline" onClick={askToSignUp}>
        <Bookmark aria-hidden />
        Save role
      </Button>
      <ApplyButton job={selected} context="detail" onApply={askToSignUp} />
    </>
  )

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-elevated",
        className
      )}
    >
      <figcaption className="flex min-h-11 items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-2 text-label">
        <span>
          <span className="text-muted-foreground">Ranked for </span>
          {rankedFor}
        </span>
        <SampleBadge className="shrink-0" />
      </figcaption>
      <div className="md:grid md:grid-cols-12">
        <ul className="space-y-1 p-2 md:col-span-5 md:border-r md:border-border">
          {jobs.map((job, i) => (
            <li key={job.id}>
              <JobRow
                job={job}
                selected={job.id === selected.id}
                onSelect={() => setSelectedId(job.id)}
                animateIndex={i}
              />
              {/* Mobile: the selected row expands in place */}
              {job.id === selected.id && (
                <JobDetailPane
                  job={job}
                  actions={actions}
                  className="px-3 pt-3 pb-4 md:hidden"
                />
              )}
            </li>
          ))}
        </ul>
        <JobDetailPane
          job={selected}
          actions={actions}
          className="hidden p-5 md:col-span-7 md:flex lg:p-6"
        />
      </div>
      <SignUpDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </figure>
  )
}

import { useState } from "react"
import { JobDetailPane } from "@/components/jobs/JobDetailPane"
import { JobRow } from "@/components/jobs/JobRow"
import { StatusBadge } from "@/components/tracker/StatusBadge"
import { TrackerCards } from "@/components/tracker/TrackerColumn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { applications } from "@/lib/sample-data"
import type { ApplicationStatus, Job } from "@/types/job"
import { PreviewFilterChips, PreviewTopBar } from "./PreviewPanes"

const TRACKED: ApplicationStatus[] = ["interview", "applied"]

interface PreviewMobileProps {
  jobs: Job[]
  selected: Job
  onSelect: (id: string) => void
  statuses: Partial<Record<string, ApplicationStatus>>
  className?: string
}

/** Phone-width product frame: tabs instead of panes, no fixed height. */
export function PreviewMobile({
  jobs,
  selected,
  onSelect,
  statuses,
  className,
}: PreviewMobileProps) {
  const [tab, setTab] = useState("results")

  return (
    <div className={className}>
      <PreviewTopBar />
      <Tabs value={tab} onValueChange={setTab} className="gap-0">
        <TabsList variant="line" className="px-4">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="role">Role</TabsTrigger>
          <TabsTrigger value="tracker">Tracker</TabsTrigger>
        </TabsList>
        <TabsContent value="results">
          <PreviewFilterChips className="px-3 pt-3" />
          <ul className="space-y-1 p-2">
            {jobs.map((job) => (
              <li key={job.id}>
                <JobRow
                  job={job}
                  selected={job.id === selected.id}
                  onSelect={() => {
                    onSelect(job.id)
                    setTab("role")
                  }}
                >
                  {statuses[job.id] && <StatusBadge status={statuses[job.id]!} />}
                </JobRow>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="role">
          <JobDetailPane job={selected} showDescription className="p-4" />
        </TabsContent>
        <TabsContent value="tracker" className="space-y-3 p-3">
          {TRACKED.map((status) => (
            <div key={status} className="space-y-2">
              <StatusBadge status={status} />
              <TrackerCards
                applications={applications.filter((a) => a.status === status)}
                className="rounded-md"
              />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"
import { CompanyMark } from "./CompanyMark"
import { FitLine } from "./FitLine"
import { JobMeta } from "./JobMeta"
import { SalaryText } from "./SalaryText"

interface JobDetailPaneProps {
  job: Job
  /** Action buttons, such as save and apply */
  actions?: ReactNode
  /** Shows the role description under the Fit line */
  showDescription?: boolean
  /** Actions sit under the header instead of at the end */
  actionsFirst?: boolean
  className?: string
}

export function JobDetailPane({
  job,
  actions,
  showDescription = false,
  actionsFirst = false,
  className,
}: JobDetailPaneProps) {
  const actionRow = actions && (
    <div className="flex flex-wrap gap-3">{actions}</div>
  )

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-start gap-3">
        <CompanyMark company={job.company} size="lg" />
        <div className="min-w-0">
          <h3 className="text-h3 font-stretch-semi-condensed">{job.title}</h3>
          <p className="text-body-sm font-medium">{job.company.name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <JobMeta job={job} />
        <SalaryText salary={job.salary} />
      </div>
      {actionsFirst && actionRow}
      <FitLine fit={job.fit} size="lg" expanded />
      {showDescription && job.description && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-label">About the role</h4>
          <p className="text-body-sm text-muted-foreground">
            {job.description}
          </p>
        </div>
      )}
      {!actionsFirst && actionRow}
    </div>
  )
}

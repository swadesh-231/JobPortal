import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"
import { CompanyMark } from "./CompanyMark"
import { FitLine } from "./FitLine"
import { SalaryText } from "./SalaryText"

interface JobRowProps {
  job: Job
  selected: boolean
  onSelect: () => void
  /** Row index for the hero Fit line animation */
  animateIndex?: number
  /** Extra content beside the Fit line, such as a status badge */
  children?: ReactNode
  className?: string
}

/** Compact, selectable job row for the hero results and the product preview. */
export function JobRow({
  job,
  selected,
  onSelect,
  animateIndex,
  children,
  className,
}: JobRowProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-left transition-colors duration-120 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-primary aria-pressed:bg-primary-soft/50",
        className
      )}
    >
      <CompanyMark company={job.company} />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="block truncate text-body-sm font-semibold">
              {job.title}
            </span>
            <span className="flex flex-wrap gap-x-2 text-caption text-muted-foreground">
              <span>{job.company.name}</span>
              <span>{job.location}</span>
            </span>
          </span>
          <SalaryText salary={job.salary} className="shrink-0 text-caption" />
        </span>
        <span className="flex items-end justify-between gap-3">
          <FitLine fit={job.fit} size="sm" animateIndex={animateIndex} />
          {children}
        </span>
      </span>
    </button>
  )
}

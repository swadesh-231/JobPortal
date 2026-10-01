import { STATUS_META } from "@/lib/status"
import { cn } from "@/lib/utils"
import type { Application, ApplicationStatus } from "@/types/job"
import { StatusBadge } from "./StatusBadge"
import { TrackerCard } from "./TrackerCard"

export function TrackerCards({
  applications,
  className,
}: {
  applications: Application[]
  className?: string
}) {
  return (
    <ul className={cn("space-y-2 bg-muted/30 p-2", className)}>
      {applications.map((application) => (
        <li key={application.id}>
          <TrackerCard application={application} />
        </li>
      ))}
    </ul>
  )
}

/** Header count is always the number of cards rendered. */
export function TrackerColumn({
  status,
  applications,
  className,
}: {
  status: ApplicationStatus
  applications: Application[]
  className?: string
}) {
  return (
    <section
      aria-label={`${STATUS_META[status].label}, ${applications.length} roles`}
      className={cn("flex flex-col", className)}
    >
      <header className="flex h-11 items-center justify-between gap-2 border-b border-border px-3">
        <StatusBadge status={status} />
        <span className="text-caption text-muted-foreground tabular-nums">
          {applications.length}
        </span>
      </header>
      <TrackerCards applications={applications} className="flex-1" />
    </section>
  )
}

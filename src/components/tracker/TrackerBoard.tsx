import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STATUS_META, STATUS_ORDER } from "@/lib/status"
import type { Application, ApplicationStatus } from "@/types/job"
import { TrackerCards, TrackerColumn } from "./TrackerColumn"

interface TrackerBoardProps {
  applications: Application[]
  /** Tab opened first on mobile */
  defaultStatus?: ApplicationStatus
}

export function TrackerBoard({
  applications,
  defaultStatus = "interview",
}: TrackerBoardProps) {
  const byStatus = (status: ApplicationStatus) =>
    applications.filter((application) => application.status === status)

  return (
    <>
      {/* Mobile: one status at a time */}
      <Tabs defaultValue={defaultStatus} className="gap-0 sm:hidden">
        <TabsList variant="line" className="gap-4 px-3">
          {STATUS_ORDER.map((status) => (
            <TabsTrigger key={status} value={status}>
              {STATUS_META[status].label}
              <span className="text-caption text-muted-foreground tabular-nums">
                {byStatus(status).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {STATUS_ORDER.map((status) => (
          <TabsContent key={status} value={status}>
            <TrackerCards applications={byStatus(status)} />
          </TabsContent>
        ))}
      </Tabs>

      {/* Tablet: scroll with snap. Desktop: six columns. */}
      <div
        tabIndex={0}
        role="group"
        aria-label="Application board"
        className="hidden snap-x snap-mandatory overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:flex"
      >
        {STATUS_ORDER.map((status) => (
          <TrackerColumn
            key={status}
            status={status}
            applications={byStatus(status)}
            className="w-60 shrink-0 snap-start border-r border-border last:border-r-0 lg:w-auto lg:min-w-40 lg:flex-1 lg:shrink"
          />
        ))}
      </div>
    </>
  )
}

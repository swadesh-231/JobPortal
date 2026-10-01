import { BellRing, CalendarClock } from "lucide-react"
import { CompanyMark } from "@/components/jobs/CompanyMark"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatSalary, formatWeekday } from "@/lib/format"
import type { Application } from "@/types/job"

export function TrackerCard({ application }: { application: Application }) {
  const { title, company, salary, appliedAt, followUpAt, interviewAt, respondBy } =
    application

  return (
    <article className="space-y-2 rounded-md border border-border bg-card p-3">
      <div className="flex items-start gap-2">
        <CompanyMark company={company} size="sm" />
        <div className="min-w-0">
          <h4 className="line-clamp-2 text-label font-semibold">{title}</h4>
          <p className="truncate text-caption text-muted-foreground">
            {company.name}
          </p>
        </div>
      </div>
      <Badge variant="neutral" className="tabular-nums">
        {formatSalary(salary)}
      </Badge>
      {(appliedAt || followUpAt || interviewAt || respondBy) && (
        <ul className="space-y-1 text-caption text-muted-foreground">
          {appliedAt && <li>Applied {formatDate(appliedAt)}</li>}
          {interviewAt && (
            <li className="flex items-center gap-1.5">
              <CalendarClock className="size-3.5 shrink-0" aria-hidden />
              Interview {formatDate(interviewAt)}
            </li>
          )}
          {followUpAt && (
            <li className="flex items-center gap-1.5">
              <BellRing className="size-3.5 shrink-0" aria-hidden />
              Follow up {formatWeekday(followUpAt)}
            </li>
          )}
          {respondBy && (
            <li className="font-medium text-warning">
              Respond by {formatDate(respondBy)}
            </li>
          )}
        </ul>
      )}
    </article>
  )
}

import { formatSalary } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Salary } from "@/types/job"

/** Salary is never hidden or blurred. Undisclosed keeps its row. */
export function SalaryText({
  salary,
  className,
}: {
  salary: Salary | null
  className?: string
}) {
  return (
    <span
      className={cn(
        "text-body-sm tabular-nums",
        salary ? "font-semibold" : "text-muted-foreground",
        className
      )}
    >
      {formatSalary(salary)}
    </span>
  )
}

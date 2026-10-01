import { Badge } from "@/components/ui/badge"
import { STATUS_META } from "@/lib/status"
import type { ApplicationStatus } from "@/types/job"

export function StatusBadge({
  status,
  className,
}: {
  status: ApplicationStatus
  className?: string
}) {
  const { label, icon: Icon } = STATUS_META[status]
  return (
    <Badge variant={`status-${status}`} className={className}>
      <Icon aria-hidden />
      {label}
    </Badge>
  )
}

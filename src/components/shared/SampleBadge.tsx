import { Badge } from "@/components/ui/badge"

export function SampleBadge({
  label = "Sample data",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <Badge variant="sample" className={className}>
      {label}
    </Badge>
  )
}

import { ChevronDown, FileText } from "lucide-react"

/** Static resume version picker shown in product fragments. */
export function ResumeChip({ label = "Resume v2" }: { label?: string }) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border-strong bg-card px-3 text-label">
      <FileText className="size-3.5 text-muted-foreground" aria-hidden />
      {label}
      <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
    </span>
  )
}

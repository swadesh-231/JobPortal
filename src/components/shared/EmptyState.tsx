import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmptyState({
  icon: Icon,
  title,
  body,
  children,
  className,
}: {
  icon: LucideIcon
  title: string
  body: string
  /** Action buttons */
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 px-4 py-16 text-center",
        className
      )}
    >
      <Icon className="size-8 text-muted-foreground" aria-hidden />
      <h3 className="text-h4">{title}</h3>
      <p className="max-w-sm text-body-sm text-muted-foreground">{body}</p>
      {children && (
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {children}
        </div>
      )}
    </div>
  )
}

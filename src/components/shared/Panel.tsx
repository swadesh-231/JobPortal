import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Card with an app-like header strip. Used for feature fragments and product frames. */
export function Panel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
      {...props}
    />
  )
}

export function PanelHeader({
  title,
  children,
  className,
}: {
  title: ReactNode
  /** Right-aligned content, such as a sample badge */
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-2 text-label",
        className
      )}
    >
      <div className="min-w-0">{title}</div>
      {children}
    </div>
  )
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-sm px-2 text-caption font-medium whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-muted-foreground",
        remote: "bg-primary-soft text-primary-soft-foreground",
        tech: "border border-border bg-card text-foreground",
        "tech-matched": "bg-primary-soft text-primary-soft-foreground",
        "tech-gap":
          "border border-dashed border-border-strong text-muted-foreground",
        "status-saved": "bg-status-saved-soft text-status-saved",
        "status-applied": "bg-status-applied-soft text-status-applied",
        "status-screening": "bg-status-screening-soft text-status-screening",
        "status-interview": "bg-status-interview-soft text-status-interview",
        "status-offer": "bg-status-offer-soft text-status-offer",
        "status-rejected": "bg-status-rejected-soft text-status-rejected",
        warning: "bg-warning-soft text-warning",
        closed: "bg-muted text-muted-foreground",
        sample:
          "border border-dashed border-border-strong text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant = "neutral",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

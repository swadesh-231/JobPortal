import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  /** Heading id, referenced by the section's aria-labelledby */
  id: string
  title: string
  intro?: string
  /** Right-aligned action on tablet and up */
  children?: ReactNode
  className?: string
}

export function SectionHeader({
  id,
  title,
  intro,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex items-end justify-between gap-6 md:mb-10 lg:mb-12",
        className
      )}
    >
      <div>
        <h2
          id={id}
          className="text-title font-stretch-semi-condensed md:text-h2"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-3 max-w-2xl text-body text-muted-foreground md:text-body-lg">
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

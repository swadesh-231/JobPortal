import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Container } from "./Container"

interface SectionProps {
  id?: string
  /** Id of the heading that names this section */
  labelledBy: string
  /** Section backgrounds are only `background` or `card` */
  tone?: "background" | "card"
  border?: "y" | "t"
  children: ReactNode
  className?: string
}

/** Owns section padding and width so sections never set their own. */
export function Section({
  id,
  labelledBy,
  tone = "background",
  border,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "card" && "bg-card",
        border === "y" && "border-y border-border",
        border === "t" && "border-t border-border",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

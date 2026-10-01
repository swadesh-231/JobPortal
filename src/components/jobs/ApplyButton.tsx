import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { isExpired } from "@/lib/format"
import type { Job } from "@/types/job"

interface ApplyButtonProps {
  job: Pick<Job, "slug" | "status" | "applyMethod" | "deadline">
  /** card: compact, secondary emphasis. detail: the main action. */
  context?: "card" | "detail"
  /** Intercepts the click, for example to ask a signed-out visitor to sign up */
  onApply?: () => void
  className?: string
}

/** Renders nothing for closed or expired roles; the caller shows the notice. */
export function ApplyButton({
  job,
  context = "card",
  onApply,
  className,
}: ApplyButtonProps) {
  if (job.status === "closed" || isExpired(job)) return null

  const external = job.applyMethod === "external"
  const size = context === "card" ? "sm" : "default"
  const variant =
    context === "card"
      ? external
        ? "ghost"
        : "outline"
      : external
        ? "outline"
        : "default"
  const label = external ? (
    <>
      Apply on company site
      <ExternalLink aria-hidden />
    </>
  ) : (
    "Apply with profile"
  )

  if (onApply) {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={onApply}
      >
        {label}
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a
        href={`${siteConfig.routes.jobs}/${job.slug}/apply`}
        {...(external && { target: "_blank", rel: "noreferrer" })}
      >
        {label}
      </a>
    </Button>
  )
}

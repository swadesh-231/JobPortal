import type { ComponentProps } from "react"
import { Check, Globe, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const ICONS = {
  remote: Globe,
  "tech-matched": Check,
  "tech-gap": Minus,
} as const

/** Badge that adds the icon its variant requires, so meaning never rests on color alone. */
export function JobBadge({
  variant = "neutral",
  children,
  ...props
}: ComponentProps<typeof Badge>) {
  const Icon = variant && variant in ICONS ? ICONS[variant as keyof typeof ICONS] : null
  return (
    <Badge variant={variant} {...props}>
      {Icon && <Icon aria-hidden />}
      {children}
    </Badge>
  )
}

function MoreTags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null
  return (
    <li className={className}>
      <Tooltip>
        <TooltipTrigger
          aria-label={`${tags.length} more: ${tags.join(", ")}`}
          className="relative z-10 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Badge variant="neutral">+{tags.length}</Badge>
        </TooltipTrigger>
        <TooltipContent>{tags.join(", ")}</TooltipContent>
      </Tooltip>
    </li>
  )
}

/** Up to 4 tags (2 on mobile), then +n with a tooltip. */
export function JobTags({
  tags,
  max = 4,
  mobileMax = 2,
  className,
}: {
  tags: string[]
  max?: number
  mobileMax?: number
  className?: string
}) {
  return (
    <ul aria-label="Skills" className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.slice(0, max).map((tag, i) => (
        <li key={tag} className={cn(i >= mobileMax && "hidden sm:block")}>
          <JobBadge variant="tech">{tag}</JobBadge>
        </li>
      ))}
      <MoreTags tags={tags.slice(mobileMax)} className="sm:hidden" />
      <MoreTags tags={tags.slice(max)} className="hidden sm:block" />
    </ul>
  )
}

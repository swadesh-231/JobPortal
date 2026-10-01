import { siteConfig } from "@/config/site"
import { getFitLabel, getFitSegments, getFitTier } from "@/lib/fit"
import { cn } from "@/lib/utils"
import type { Fit } from "@/types/job"
import { JobBadge } from "./JobBadge"

const SEGMENT = {
  met: "bg-primary",
  partial: "bg-primary/40",
  missing: "bg-border-strong",
} as const

// Static classes so Tailwind can see them: 80ms stagger per row.
const STAGGER = [
  "",
  "animation-delay-80",
  "animation-delay-160",
  "animation-delay-240",
  "animation-delay-320",
  "animation-delay-400",
] as const

interface FitLineProps {
  /** Undefined when the visitor has no profile yet */
  fit?: Fit
  /** sm: inline in job rows; default: cards; lg: detail panes */
  size?: "sm" | "default" | "lg"
  /** Adds matched and missing skills and the reason line */
  expanded?: boolean
  /** Row index for the hero load animation. Omit for no animation. */
  animateIndex?: number
  className?: string
}

function SkillList({
  title,
  skills,
  variant,
}: {
  title: string
  skills: string[]
  variant: "tech-matched" | "tech-gap"
}) {
  if (skills.length === 0) return null
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-label text-muted-foreground">{title}</p>
      <ul className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li key={skill}>
            <JobBadge variant={variant}>{skill}</JobBadge>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Fit as requirements met out of total. Never a percentage. */
export function FitLine({
  fit,
  size = "default",
  expanded = false,
  animateIndex,
  className,
}: FitLineProps) {
  if (!fit) {
    return (
      <a
        href={siteConfig.routes.signUp}
        className={cn(
          "relative z-10 rounded-sm text-label text-primary-text underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        Add your resume to see your fit
      </a>
    )
  }

  const count =
    size === "sm"
      ? `${fit.met} of ${fit.total}`
      : `${fit.met} of ${fit.total} requirements`

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3",
        size === "sm" && "max-w-40",
        size === "default" && "max-w-60",
        className
      )}
    >
      <div role="img" aria-label={getFitLabel(fit)}>
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className={size === "lg" ? "text-body-sm font-medium" : "text-label"}>
            {getFitTier(fit)}
          </span>
          <span className="text-caption text-muted-foreground tabular-nums">
            {count}
          </span>
        </div>
        <div
          className={cn(
            "flex gap-0.5",
            size === "lg" ? "h-2" : "h-1.5",
            animateIndex !== undefined && [
              "origin-left animate-fit-fill",
              STAGGER[Math.min(animateIndex, STAGGER.length - 1)],
            ]
          )}
        >
          {getFitSegments(fit).map((segment, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-xs", SEGMENT[segment])}
            />
          ))}
        </div>
      </div>
      {expanded && (
        <>
          <SkillList
            title="You have"
            skills={fit.matchedSkills}
            variant="tech-matched"
          />
          <SkillList
            title="Missing"
            skills={fit.missingSkills}
            variant="tech-gap"
          />
          {fit.reason && (
            <p className="text-body-sm text-muted-foreground">{fit.reason}</p>
          )}
        </>
      )}
    </div>
  )
}

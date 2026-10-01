import {
  BriefcaseBusiness,
  Building2,
  Clock,
  Globe,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import {
  JOB_TYPE_LABEL,
  WORK_MODE_LABEL,
  formatExperience,
} from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"

function MetaItem({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: LucideIcon
  label: string
  children: string
  className?: string
}) {
  return (
    <li className={cn("flex items-center gap-1.5", className)}>
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span className="sr-only">{label}: </span>
      {children}
    </li>
  )
}

export function JobMeta({
  job,
  hideTypeOnMobile = false,
  className,
}: {
  job: Pick<Job, "location" | "workMode" | "experience" | "type">
  hideTypeOnMobile?: boolean
  className?: string
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-4 gap-y-1.5 text-label text-muted-foreground",
        className
      )}
    >
      <MetaItem icon={MapPin} label="Location">
        {job.location}
      </MetaItem>
      <MetaItem
        icon={job.workMode === "remote" ? Globe : Building2}
        label="Work mode"
      >
        {WORK_MODE_LABEL[job.workMode]}
      </MetaItem>
      <MetaItem icon={BriefcaseBusiness} label="Experience">
        {formatExperience(job.experience)}
      </MetaItem>
      <MetaItem
        icon={Clock}
        label="Job type"
        className={cn(hideTypeOnMobile && "hidden sm:flex")}
      >
        {JOB_TYPE_LABEL[job.type]}
      </MetaItem>
    </ul>
  )
}

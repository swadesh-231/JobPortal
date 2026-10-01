import {
  BadgeCheck,
  Bookmark,
  CalendarClock,
  CircleSlash,
  ScanSearch,
  Send,
} from "lucide-react"
import type { ApplicationStatus } from "@/types/job"

/** One map drives status badges and tracker column headers. */
export const STATUS_META = {
  saved: { label: "Saved", icon: Bookmark },
  applied: { label: "Applied", icon: Send },
  screening: { label: "Screening", icon: ScanSearch },
  interview: { label: "Interview", icon: CalendarClock },
  offer: { label: "Offer", icon: BadgeCheck },
  rejected: { label: "Rejected", icon: CircleSlash },
} as const

export const STATUS_ORDER = Object.keys(STATUS_META) as ApplicationStatus[]

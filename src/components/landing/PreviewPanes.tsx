import {
  Bookmark,
  Check,
  CircleUser,
  FileText,
  MapPin,
  Menu,
  Search,
  Send,
} from "lucide-react"
import { LogoMark } from "@/components/layout/Logo"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { Toggle } from "@/components/ui/toggle"
import { previewCounts, sampleProfile } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Discover", icon: Search, active: true },
  { label: "Saved", icon: Bookmark, count: previewCounts.saved },
  { label: "Applied", icon: Send, count: previewCounts.applied },
  { label: "Profile", icon: CircleUser },
  { label: "Resumes", icon: FileText, count: previewCounts.resumes },
]

const FILTERS = [
  { title: "Work mode", options: ["Remote", "Hybrid", "On-site"], on: ["Remote", "Hybrid"] },
  { title: "Experience", options: ["0–2 yrs", "3–5 yrs", "6+ yrs"], on: ["3–5 yrs"] },
  { title: "Salary min", options: ["₹25 LPA"], on: ["₹25 LPA"] },
  { title: "Job type", options: ["Full-time", "Contract"], on: ["Full-time"] },
  { title: "Posted", options: ["Past week", "Past month"], on: ["Past week"] },
]

function Chip({ label, on }: { label: string; on: boolean }) {
  return (
    <Toggle variant="chip" pressed={on} tabIndex={-1}>
      {on && <Check aria-hidden />}
      {label}
    </Toggle>
  )
}

function FakeField({ icon: Icon, value, className }: { icon: typeof Search; value: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center gap-2 rounded-md border border-input bg-card px-3 text-label",
        className
      )}
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="truncate">{value}</span>
    </span>
  )
}

export function PreviewTopBar() {
  return (
    <div inert className="flex h-12 items-center gap-3 border-b border-border bg-muted/50 px-4">
      <Menu className="size-4 text-muted-foreground lg:hidden" aria-hidden />
      <LogoMark />
      <span className="hidden text-label font-semibold sm:block">Shortlist</span>
      <FakeField icon={Search} value={sampleProfile.query} className="ml-2 min-w-0 flex-1 sm:max-w-56" />
      <FakeField icon={MapPin} value={sampleProfile.location} className="hidden sm:flex" />
      <SampleBadge className="ml-auto shrink-0" />
      <span className="hidden size-7 shrink-0 items-center justify-center rounded-full bg-muted text-caption font-semibold text-muted-foreground sm:flex">
        {sampleProfile.initials}
      </span>
    </div>
  )
}

export function PreviewSidebar({ className }: { className?: string }) {
  return (
    <ul inert className={cn("w-48 shrink-0 space-y-0.5 border-r border-border p-2", className)}>
      {NAV.map(({ label, icon: Icon, count, active }) => (
        <li
          key={label}
          className={cn(
            "flex h-9 items-center gap-2 rounded-md px-3 text-label",
            active
              ? "bg-primary-soft text-primary-soft-foreground"
              : "text-muted-foreground"
          )}
        >
          <Icon className="size-4" aria-hidden />
          {label}
          {count !== undefined && (
            <span className="ml-auto text-caption tabular-nums">{count}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function PreviewFilters({ className }: { className?: string }) {
  return (
    <div inert className={cn("w-56 shrink-0 space-y-4 border-r border-border p-4", className)}>
      {FILTERS.map(({ title, options, on }) => (
        <div key={title} className="space-y-2">
          <p className="text-label text-muted-foreground">{title}</p>
          <div className="flex flex-wrap gap-1.5">
            {options.map((option) => (
              <Chip key={option} label={option} on={on.includes(option)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Active filters as one scrolling row, used when the filters pane is hidden. */
export function PreviewFilterChips({ className }: { className?: string }) {
  return (
    <div inert className={cn("scrollbar-none flex gap-1.5 overflow-x-auto", className)}>
      {FILTERS.flatMap(({ on }) => on).map((label) => (
        <Chip key={label} label={label} on />
      ))}
    </div>
  )
}

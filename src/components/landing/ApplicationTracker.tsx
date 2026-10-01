import { BellRing, CalendarClock, FileText } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { PanelHeader } from "@/components/shared/Panel"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { TrackerBoard } from "@/components/tracker/TrackerBoard"
import { applications } from "@/lib/sample-data"

const FEATURES = [
  { icon: BellRing, label: "Follow-up reminders" },
  { icon: CalendarClock, label: "Interview dates and notes" },
  { icon: FileText, label: "See which resume you sent" },
]

export function ApplicationTracker() {
  return (
    <Section id="tracker" labelledBy="tracker-title">
      <SectionHeader
        id="tracker-title"
        title="Every application, one board."
        // [VERIFY]
        intro="Roles you apply to here move to Applied on their own. Add anything you applied to elsewhere in one click, and set reminders so nothing goes quiet."
        className="mb-6 md:mb-6 lg:mb-6"
      />
      <ul className="mb-8 flex flex-col gap-2 text-body-sm sm:flex-row sm:flex-wrap sm:gap-x-6 md:mb-10 lg:mb-12">
        {FEATURES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            <Icon className="size-4 text-muted-foreground" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <figure className="overflow-hidden rounded-xl border border-border bg-card">
        <figcaption className="sr-only">
          Application board with sample data, grouped by status
        </figcaption>
        <PanelHeader
          title={
            <span className="flex items-baseline gap-2">
              Applications
              <span className="text-caption text-muted-foreground tabular-nums">
                {applications.length} roles
              </span>
            </span>
          }
        >
          <SampleBadge className="shrink-0" />
        </PanelHeader>
        <TrackerBoard applications={applications} />
      </figure>
    </Section>
  )
}

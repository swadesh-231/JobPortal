import { useState } from "react"
import { SearchX } from "lucide-react"
import { JobCard } from "@/components/jobs/JobCard"
import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton"
import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { EmptyState } from "@/components/shared/EmptyState"
import { ErrorState } from "@/components/shared/ErrorState"
import { SampleBadge } from "@/components/shared/SampleBadge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { siteConfig } from "@/config/site"
import { useFeaturedJobs } from "@/hooks/useFeaturedJobs"
import type { Job } from "@/types/job"

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "data", label: "Data" },
] as const

const gridClass = "grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6"

function ViewAll({ className }: { className?: string }) {
  return (
    <Button variant="outline" className={className} asChild>
      <a href={siteConfig.routes.jobs}>View all jobs</a>
    </Button>
  )
}

export function FeaturedJobs() {
  const { state, retry } = useFeaturedJobs()
  const [category, setCategory] = useState<string>("all")

  const jobsIn = (value: string, jobs: Job[]) =>
    value === "all" ? jobs : jobs.filter((job) => job.category === value)

  return (
    <Section id="jobs" labelledBy="jobs-title">
      <SectionHeader
        id="jobs-title"
        title="Recently posted roles"
        intro="Fresh listings across engineering, design, product and data. Save any role to start tracking it."
      >
        <ViewAll className="hidden shrink-0 sm:inline-flex" />
      </SectionHeader>

      <Tabs value={category} onValueChange={setCategory} className="gap-6">
        <div className="flex items-end gap-4">
          <TabsList variant="line" aria-label="Job category">
            {CATEGORIES.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {state.status === "ready" && state.jobs.some((job) => job.isSample) && (
            <SampleBadge label="Sample listings" className="mb-2 shrink-0" />
          )}
        </div>

        {CATEGORIES.map(({ value, label }) => (
          <TabsContent key={value} value={value}>
            {state.status === "loading" && (
              <div className={gridClass} aria-busy aria-label="Loading roles">
                {Array.from({ length: 6 }, (_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            )}
            {state.status === "error" && <ErrorState onRetry={retry} />}
            {state.status === "ready" &&
              (jobsIn(value, state.jobs).length > 0 ? (
                <div className={gridClass}>
                  {jobsIn(value, state.jobs).map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={SearchX}
                  title={`No roles match “${label}”`}
                  body="Try removing a filter or searching a nearby city."
                >
                  <Button variant="outline" onClick={() => setCategory("all")}>
                    Clear filters
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href={siteConfig.routes.jobs}>Search anywhere</a>
                  </Button>
                </EmptyState>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      <ViewAll className="mt-6 w-full sm:hidden" />
    </Section>
  )
}

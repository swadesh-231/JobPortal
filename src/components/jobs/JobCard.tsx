import { BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"
import { formatPosted, isExpired } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job"
import { ApplyButton } from "./ApplyButton"
import { BookmarkButton } from "./BookmarkButton"
import { CompanyMark } from "./CompanyMark"
import { FitLine } from "./FitLine"
import { JobTags } from "./JobBadge"
import { JobMeta } from "./JobMeta"
import { SalaryText } from "./SalaryText"

interface JobCardProps {
  job: Job
  /** Signed-out visitors see the resume prompt instead of a Fit line */
  signedIn?: boolean
  className?: string
}

export function JobCard({ job, signedIn = false, className }: JobCardProps) {
  const href = `${siteConfig.routes.jobs}/${job.slug}`
  const closed = job.status === "closed"
  const expired = !closed && isExpired(job)

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 ring-offset-background transition-[border-color,box-shadow] duration-180 hover:border-border-strong hover:shadow-card has-[[data-card-link]:focus-visible]:ring-2 has-[[data-card-link]:focus-visible]:ring-ring has-[[data-card-link]:focus-visible]:ring-offset-2 sm:p-5",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <CompanyMark company={job.company} />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-h4">
            <a
              href={href}
              data-card-link
              className="outline-none group-hover:underline after:absolute after:inset-0 after:content-['']"
            >
              {job.title}
            </a>
          </h3>
          <p className="flex items-center gap-1 text-body-sm font-medium">
            {job.company.name}
            {job.company.verified && (
              <>
                <BadgeCheck
                  className="size-3.5 text-primary-text"
                  aria-hidden
                />
                <span className="sr-only">(verified company)</span>
              </>
            )}
          </p>
        </div>
        <BookmarkButton
          title={job.title}
          company={job.company.name}
          signedIn={signedIn}
          className="-mt-1 -mr-1"
        />
      </div>

      <div className="flex flex-col gap-3 sm:pl-13">
        <JobMeta job={job} hideTypeOnMobile />
        <div className="flex items-baseline justify-between gap-3">
          <SalaryText salary={job.salary} />
          <time
            dateTime={job.postedAt}
            className="shrink-0 text-caption text-muted-foreground"
          >
            <span className="sm:hidden">{formatPosted(job.postedAt, true)}</span>
            <span className="hidden sm:inline">{formatPosted(job.postedAt)}</span>
          </time>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {closed && (
            <Badge variant="closed">No longer accepting applications</Badge>
          )}
          {expired && <Badge variant="warning">Deadline passed</Badge>}
          <JobTags tags={job.tags} />
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
        <FitLine
          fit={signedIn ? job.fit : undefined}
          className={cn(signedIn && "max-w-none sm:max-w-60")}
        />
        {closed || expired ? (
          <a
            href={`${siteConfig.routes.jobs}?similar=${job.slug}`}
            className="relative z-10 shrink-0 rounded-sm text-label text-primary-text underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            See similar roles
          </a>
        ) : (
          <ApplyButton
            job={job}
            className="z-10 hidden shrink-0 sm:inline-flex"
          />
        )}
      </div>
    </article>
  )
}

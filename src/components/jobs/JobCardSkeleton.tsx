import { Skeleton } from "@/components/ui/skeleton"

/** Same footprint as JobCard so the list does not shift when data arrives. */
export function JobCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <Skeleton className="size-10 rounded-md" />
        <div className="flex flex-1 flex-col gap-2 py-0.5">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:pl-13">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-6 w-3/5" />
      </div>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="hidden h-8 w-36 sm:block" />
      </div>
    </div>
  )
}

import { CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ErrorState({
  title = "Couldn't load jobs",
  body = "Check your connection and try again.",
  onRetry,
  className,
}: {
  title?: string
  body?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl bg-destructive-soft px-4 py-16 text-center",
        className
      )}
    >
      <CircleAlert className="size-8 text-destructive" aria-hidden />
      <h3 className="text-h4">{title}</h3>
      <p className="max-w-sm text-body-sm text-muted-foreground">{body}</p>
      {onRetry && (
        <Button variant="outline" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

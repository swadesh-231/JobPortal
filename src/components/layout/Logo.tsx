import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/** Three stacked bars of decreasing length: a ranked list. */
export function LogoMark({
  inverse = false,
  className,
}: {
  inverse?: boolean
  className?: string
}) {
  const rest = inverse ? "bg-inverse-muted" : "bg-foreground"
  return (
    <span aria-hidden className={cn("flex w-5 flex-col gap-0.5", className)}>
      <span
        className={cn(
          "h-1 w-5 rounded-xs",
          inverse ? "bg-inverse-foreground" : "bg-primary"
        )}
      />
      <span className={cn("h-1 w-3.5 rounded-xs", rest)} />
      <span className={cn("h-1 w-2 rounded-xs", rest)} />
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.routes.home}
      className={cn(
        "flex h-10 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <LogoMark />
      <span className="text-h4 font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </a>
  )
}

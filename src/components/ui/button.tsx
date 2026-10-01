import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors duration-120 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline:
          "border border-border-strong bg-card text-foreground shadow-xs hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "h-auto px-0 text-primary-text underline-offset-4 hover:underline",
        inverse:
          "bg-inverse-foreground text-inverse hover:bg-inverse-foreground/90 focus-visible:ring-inverse-foreground focus-visible:ring-offset-inverse",
        "inverse-outline":
          "border border-inverse-muted/40 text-inverse-foreground hover:bg-inverse-foreground/10 focus-visible:ring-inverse-foreground focus-visible:ring-offset-inverse",
      },
      size: {
        sm: "h-8 px-3 text-label",
        default: "h-9 px-4 text-body-sm",
        lg: "h-11 px-5 text-body-sm",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    compoundVariants: [
      { variant: "link", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Swaps the leading icon for a spinner; the label stays. */
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "[&>svg+svg]:hidden",
        className
      )}
      {...props}
    >
      {loading && !asChild ? (
        <>
          <LoaderCircle className="animate-spin" aria-hidden />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }

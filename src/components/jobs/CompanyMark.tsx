import { cva, type VariantProps } from "class-variance-authority"
import { getInitials } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Company } from "@/types/job"

const companyMarkVariants = cva(
  "flex shrink-0 items-center justify-center overflow-hidden rounded-md font-semibold select-none",
  {
    variants: {
      size: {
        sm: "size-7 text-caption",
        md: "size-10 text-label",
        lg: "size-12 text-body-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

/** Square company logo, with initials as the fallback. */
export function CompanyMark({
  company,
  size,
  className,
}: {
  company: Pick<Company, "name" | "logoUrl">
  className?: string
} & VariantProps<typeof companyMarkVariants>) {
  if (company.logoUrl) {
    return (
      <img
        src={company.logoUrl}
        alt=""
        className={cn(
          companyMarkVariants({ size }),
          "border border-border bg-card object-contain p-1",
          className
        )}
      />
    )
  }
  return (
    <span
      aria-hidden
      className={cn(
        companyMarkVariants({ size }),
        "bg-muted text-muted-foreground",
        className
      )}
    >
      {getInitials(company.name)}
    </span>
  )
}

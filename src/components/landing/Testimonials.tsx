import { Section } from "@/components/layout/Section"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { siteConfig, type Testimonial } from "@/config/site"
import { getInitials } from "@/lib/format"
import { cn } from "@/lib/utils"

function Quote({ item, featured = false }: { item: Testimonial; featured?: boolean }) {
  return (
    <figure className="flex flex-col gap-4">
      <blockquote
        className={cn(
          featured ? "text-body-lg font-medium lg:text-h3" : "text-body"
        )}
      >
        <p>“{item.quote}”</p>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar>
          {item.avatarUrl && <AvatarImage src={item.avatarUrl} alt="" />}
          <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <span className="text-body-sm font-medium">{item.name}</span>
          <span className="text-caption text-muted-foreground">
            {item.role} at {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Renders only with real, consented quotes. No cards, no stars. */
export function Testimonials() {
  const { enabled, items } = siteConfig.testimonials
  if (!enabled || items.length === 0) return null
  const [featured, ...rest] = items

  return (
    <Section labelledBy="testimonials-title" border="t">
      <SectionHeader
        id="testimonials-title"
        title="From people who used Shortlist in their search"
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Quote item={featured} featured />
        </div>
        <div className="divide-y divide-border lg:col-span-5">
          {rest.slice(0, 2).map((item) => (
            <div key={item.name} className="py-6 first:pt-0 last:pb-0">
              <Quote item={item} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

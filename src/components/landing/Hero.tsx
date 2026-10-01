import { Check } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { heroJobs, sampleProfile } from "@/lib/sample-data"
import { HeroResults } from "./HeroResults"
import { SearchBar } from "./SearchBar"

const TRUST = [
  "Free for job seekers",
  "Your profile is private until you apply",
  "Import a PDF or DOCX resume", // [VERIFY]
]

export function Hero() {
  return (
    <Section id="top" labelledBy="hero-title">
      {/* Mobile order: headline, search, CTAs, trust, results */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="order-1 sm:order-none lg:col-span-7">
          <h1
            id="hero-title"
            className="text-h2 font-stretch-semi-condensed sm:text-h1 lg:text-display"
          >
            Find work that actually fits you.
          </h1>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground md:text-body-lg">
            Shortlist ranks open roles by how well they match your skills and
            experience, shows you exactly why, and tracks every application
            from saved to offer.
          </p>
        </div>

        <div className="order-3 mt-6 flex flex-col gap-3 sm:order-none sm:flex-row lg:col-span-7 lg:row-start-2">
          <Button size="lg" asChild>
            <a href={siteConfig.routes.signUp}>Create free account</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#jobs">Browse jobs</a>
          </Button>
        </div>

        <ul className="order-4 mt-6 flex flex-col gap-2 text-body-sm text-muted-foreground sm:order-none sm:flex-row sm:flex-wrap sm:gap-x-6 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:flex-col lg:self-end">
          {TRUST.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="size-4 shrink-0 text-foreground" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <SearchBar className="order-2 mt-6 sm:order-none sm:mt-10 lg:col-span-12" />

        <HeroResults
          jobs={heroJobs}
          rankedFor={sampleProfile.summary}
          className="order-5 mt-8 sm:order-none sm:mt-6 lg:col-span-12"
        />
      </div>
    </Section>
  )
}

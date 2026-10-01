import { useRef, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ANYWHERE, LocationCombobox } from "./LocationCombobox"

// Mobile: each field is its own control. From md: one shared shell.
const fieldClass =
  "h-12 rounded-md border border-input bg-card shadow-xs transition-[border-color,box-shadow] duration-120 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20 md:h-full md:rounded-sm md:border-0 md:bg-transparent md:shadow-none md:focus-within:ring-0"

export function SearchBar({ className }: { className?: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState<string>(ANYWHERE)

  function searchPopular(term: string) {
    if (term === "Remote only") {
      setQuery("")
      setLocation("Remote")
    } else {
      setQuery(term)
    }
    // Submit after state has reached the form fields.
    requestAnimationFrame(() => formRef.current?.requestSubmit())
  }

  return (
    <div className={className}>
      <form
        ref={formRef}
        role="search"
        action={siteConfig.routes.jobs}
        method="get"
        className="flex flex-col gap-2 md:h-14 md:flex-row md:items-center md:gap-0 md:rounded-lg md:border md:border-input md:bg-card md:p-1 md:shadow-xs md:transition-[border-color,box-shadow] md:duration-120 md:focus-within:border-primary md:focus-within:ring-3 md:focus-within:ring-primary/20"
      >
        <div className={cn(fieldClass, "relative flex items-center md:flex-1")}>
          <label htmlFor="search-q" className="sr-only">
            Job title, skill or company
          </label>
          <Search
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
            aria-hidden
          />
          <input
            id="search-q"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Job title, skill or company"
            autoComplete="off"
            className="size-full rounded-md bg-transparent pr-3 pl-9 text-body outline-none placeholder:text-placeholder"
          />
        </div>
        <span aria-hidden className="hidden h-6 w-px bg-border md:block" />
        <span id="search-location-label" className="sr-only">
          Location
        </span>
        <input
          type="hidden"
          name="location"
          value={location === ANYWHERE ? "" : location}
        />
        <LocationCombobox
          value={location}
          onChange={setLocation}
          labelledBy="search-location-label"
          className={cn(fieldClass, "md:w-52")}
        />
        <Button type="submit" size="lg" className="h-12 md:ml-1 md:h-full">
          Search jobs
        </Button>
      </form>
      <div className="mt-3 flex items-center gap-2">
        <span id="popular-searches" className="shrink-0 text-label text-muted-foreground">
          Popular
        </span>
        <ul
          aria-labelledby="popular-searches"
          className="scrollbar-none -mr-4 flex gap-2 overflow-x-auto py-1 pr-4 sm:mr-0 sm:flex-wrap sm:pr-0"
        >
          {siteConfig.popularSearches.map((term) => (
            <li key={term} className="shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => searchPopular(term)}
              >
                {term}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

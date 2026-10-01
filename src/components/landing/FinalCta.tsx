import { Container } from "@/components/layout/Container"
import { LogoMark } from "@/components/layout/Logo"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

/** The one inverse section, and the one centered block on the page. */
export function FinalCta() {
  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className="bg-inverse py-20 text-inverse-foreground lg:py-24"
    >
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LogoMark inverse />
          <h2
            id="cta-title"
            className="mt-6 text-title font-stretch-semi-condensed sm:text-h1"
          >
            Your search, ranked and tracked.
          </h2>
          <p className="mt-4 max-w-xl text-body text-inverse-muted md:text-body-lg">
            Create a free profile, add your resume, and get a shortlist of
            roles that match it.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="inverse" size="lg" asChild>
              <a href={siteConfig.routes.signUp}>Create free account</a>
            </Button>
            <Button variant="inverse-outline" size="lg" asChild>
              <a href={siteConfig.routes.jobs}>Browse jobs first</a>
            </Button>
          </div>
          {/* [VERIFY] */}
          <p className="mt-4 text-body-sm text-inverse-muted">
            No credit card. Takes about two minutes.
          </p>
        </div>
      </Container>
    </section>
  )
}

import { FeaturedJobs } from "@/components/landing/FeaturedJobs"
import { Hero } from "@/components/landing/Hero"
import { SocialProof } from "@/components/landing/SocialProof"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"

/** Composes sections only. */
export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-card px-4 py-2 text-body-sm font-medium shadow-elevated outline-none focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <SocialProof />
        <FeaturedJobs />
      </main>
      <Footer />
    </>
  )
}

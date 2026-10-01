import { featuredJobs } from "@/lib/sample-data"
import type { Job } from "@/types/job"

/**
 * Featured jobs for the landing page.
 * Returns sample listings until GET /api/jobs/featured exists.
 */
export async function getFeaturedJobs(): Promise<Job[]> {
  return featuredJobs
}

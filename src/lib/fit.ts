import type { Fit } from "@/types/job"

export type FitTier = "Strong fit" | "Good fit" | "Stretch"
export type FitSegment = "met" | "partial" | "missing"

const MAX_SEGMENTS = 12

export function getFitTier(fit: Fit): FitTier {
  const score = fit.total > 0 ? (fit.met + 0.5 * fit.partial) / fit.total : 0
  if (score >= 0.75) return "Strong fit"
  if (score >= 0.5) return "Good fit"
  return "Stretch"
}

/** One segment per requirement, scaled proportionally beyond 12. Order: met, partial, missing. */
export function getFitSegments(fit: Fit): FitSegment[] {
  const scale = fit.total > MAX_SEGMENTS ? MAX_SEGMENTS / fit.total : 1
  const total = Math.min(fit.total, MAX_SEGMENTS)
  const met = Math.min(total, Math.round(fit.met * scale))
  const partial = Math.min(total - met, Math.round(fit.partial * scale))
  return Array.from({ length: total }, (_, i) =>
    i < met ? "met" : i < met + partial ? "partial" : "missing"
  )
}

export function getFitCount(fit: Fit) {
  return `${fit.met} of ${fit.total} requirements`
}

export function getFitLabel(fit: Fit) {
  return `${getFitTier(fit)}: meets ${getFitCount(fit)}`
}

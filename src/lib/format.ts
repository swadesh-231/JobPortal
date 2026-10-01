import type { Job, JobType, Salary, WorkMode } from "@/types/job"

const DAY = 86_400_000
const trim = (n: number) => String(Math.round(n * 10) / 10)
const range = (min: string, max?: string) => (max ? `${min}–${max}` : min)

/** ₹32–42 LPA; ₹50–70k / month; $120k–150k / yr */
export function formatSalary(salary: Salary | null) {
  if (!salary) return "Salary not disclosed"
  const { min, max, currency, period } = salary
  if (currency === "INR" && period === "year") {
    const lakh = (n: number) => trim(n / 100_000)
    return `₹${range(lakh(min), max && lakh(max))} LPA`
  }
  const k = (n: number) => trim(n / 1000)
  if (currency === "INR") return `₹${range(k(min), max && k(max))}k / month`
  const suffix = period === "year" ? "yr" : "month"
  return `$${range(`${k(min)}k`, max ? `${k(max)}k` : undefined)} / ${suffix}`
}

export function formatExperience({ min, max }: Job["experience"]) {
  if (max === undefined) return min === 0 ? "No experience needed" : `${min}+ yrs`
  return `${min}–${max} yrs`
}

function daysSince(iso: string, now: Date) {
  return Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / DAY))
}

/** "Posted 2 days ago", or "2d ago" when short */
export function formatPosted(iso: string, short = false, now = new Date()) {
  const days = daysSince(iso, now)
  if (short) {
    if (days === 0) return "Today"
    return days < 7 ? `${days}d ago` : `${Math.floor(days / 7)}w ago`
  }
  if (days === 0) return "Posted today"
  if (days === 1) return "Posted yesterday"
  if (days < 7) return `Posted ${days} days ago`
  const weeks = Math.floor(days / 7)
  return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
}

/** 12 Sep */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso))
}

/** Thu */
export function formatWeekday(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
    new Date(iso)
  )
}

export function isExpired(job: Pick<Job, "deadline">, now = new Date()) {
  return !!job.deadline && new Date(job.deadline).getTime() < now.getTime()
}

export const WORK_MODE_LABEL: Record<WorkMode, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
}

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
}

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  const letters =
    words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)
  return letters.toUpperCase()
}

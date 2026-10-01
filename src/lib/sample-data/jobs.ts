import type { Fit, Job } from "@/types/job"
import { companies, daysFromNow } from "./companies"

const lakh = (n: number) => n * 100_000

const base = {
  type: "full-time",
  status: "open",
  applyMethod: "platform",
  category: "engineering",
  isSample: true,
} satisfies Partial<Job>

const fit = (
  met: number,
  partial: number,
  total: number,
  matchedSkills: string[],
  missingSkills: string[],
  reason?: string
): Fit => ({ met, partial, total, matchedSkills, missingSkills, reason })

export const sampleProfile = {
  summary: "Frontend engineer, 4 yrs, React + TypeScript",
  initials: "SR",
  query: "frontend engineer",
  location: "Bengaluru",
}

/** Featured jobs: the six sample listings. */
export const featuredJobs: Job[] = [
  {
    ...base,
    id: "job-quillbase-sfe",
    slug: "senior-frontend-engineer-quillbase",
    title: "Senior Frontend Engineer",
    company: companies.quillbase,
    location: "Bengaluru",
    workMode: "hybrid",
    experience: { min: 4, max: 6 },
    salary: { min: lakh(32), max: lakh(42), currency: "INR", period: "year" },
    tags: ["React", "TypeScript", "Next.js", "GraphQL", "Design systems"],
    postedAt: daysFromNow(-2),
    description:
      "You will own the editor surface used by every Quillbase customer: the document canvas, the comment sidebar and the shared component library behind them. The team is six engineers and a designer, and ships to production daily.",
    fit: fit(
      7,
      1,
      9,
      ["React", "TypeScript", "Next.js", "Design systems"],
      ["GraphQL", "Web performance"],
      "Why it ranks first: matches your stack and seniority, in your preferred city, and pays above your minimum."
    ),
  },
  {
    ...base,
    id: "job-halden-backend",
    slug: "backend-engineer-payments-halden-pay",
    title: "Backend Engineer, Payments",
    company: companies.halden,
    location: "Remote (India)",
    workMode: "remote",
    experience: { min: 3, max: 5 },
    salary: { min: lakh(26), max: lakh(34), currency: "INR", period: "year" },
    tags: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
    postedAt: daysFromNow(-1),
    fit: fit(3, 0, 8, ["PostgreSQL", "REST APIs"], ["Java", "Kafka"]),
  },
  {
    ...base,
    id: "job-ferngate-designer",
    slug: "product-designer-ferngate-studio",
    title: "Product Designer",
    company: companies.ferngate,
    location: "Pune",
    workMode: "onsite",
    experience: { min: 2, max: 4 },
    salary: { min: lakh(14), max: lakh(20), currency: "INR", period: "year" },
    tags: ["Figma", "Design systems"],
    postedAt: daysFromNow(-3),
    applyMethod: "external",
    category: "design",
    fit: fit(2, 0, 7, ["Design systems"], ["Figma", "User research"]),
  },
  {
    ...base,
    id: "job-tidewater-analyst",
    slug: "data-analyst-tidewater-health",
    title: "Data Analyst",
    company: companies.tidewater,
    location: "Hyderabad",
    workMode: "hybrid",
    experience: { min: 1, max: 3 },
    salary: { min: lakh(9), max: lakh(13), currency: "INR", period: "year" },
    tags: ["SQL", "Python", "Looker"],
    postedAt: daysFromNow(-5),
    category: "data",
    fit: fit(1, 0, 6, ["SQL"], ["Python", "Looker"]),
  },
  {
    ...base,
    id: "job-marlow-platform",
    slug: "platform-engineer-marlow-logistics",
    title: "Platform Engineer",
    company: companies.marlow,
    location: "Bengaluru",
    workMode: "onsite",
    experience: { min: 5, max: 8 },
    salary: null,
    tags: ["Kubernetes", "Terraform", "AWS"],
    postedAt: daysFromNow(-6),
    applyMethod: "external",
    fit: fit(1, 0, 8, ["AWS"], ["Kubernetes", "Terraform"]),
  },
  {
    ...base,
    id: "job-kestrel-ml-intern",
    slug: "ml-intern-kestrel-analytics",
    title: "ML Intern",
    company: companies.kestrel,
    location: "Remote (India)",
    workMode: "remote",
    type: "internship",
    experience: { min: 0 },
    salary: { min: 50_000, max: 70_000, currency: "INR", period: "month" },
    tags: ["Python", "PyTorch"],
    postedAt: daysFromNow(-9),
    category: "data",
    fit: fit(2, 0, 6, ["Git", "REST APIs"], ["Python", "PyTorch"]),
  },
]

const [quillbase] = featuredJobs

/** Hero rows: ranked for the sample profile. */
export const heroJobs: Job[] = [
  quillbase,
  {
    ...base,
    id: "job-halden-checkout",
    slug: "frontend-engineer-checkout-halden-pay",
    title: "Frontend Engineer, Checkout",
    company: companies.halden,
    location: "Remote (India)",
    workMode: "remote",
    experience: { min: 3, max: 5 },
    salary: { min: lakh(28), max: lakh(36), currency: "INR", period: "year" },
    tags: ["React", "TypeScript", "Accessibility", "Playwright"],
    postedAt: daysFromNow(-1),
    description:
      "Build and maintain the hosted checkout that merchants embed on their sites. You will work on form performance, accessibility and the test suite that keeps payment flows stable across browsers.",
    fit: fit(
      6,
      0,
      7,
      ["React", "TypeScript", "Accessibility"],
      ["Playwright"],
      "Why it ranks second: matches your stack and is fully remote, with one tool you haven't listed."
    ),
  },
  {
    ...base,
    id: "job-tidewater-ui",
    slug: "ui-engineer-tidewater-health",
    title: "UI Engineer",
    company: companies.tidewater,
    location: "Hyderabad",
    workMode: "hybrid",
    experience: { min: 3, max: 6 },
    salary: { min: lakh(24), max: lakh(30), currency: "INR", period: "year" },
    tags: ["React", "TypeScript", "Storybook", "Vue"],
    postedAt: daysFromNow(-4),
    description:
      "Join the design systems group that builds the component library used across Tidewater's patient and clinician apps. The role sits between design and product engineering.",
    fit: fit(
      5,
      0,
      8,
      ["React", "TypeScript", "Storybook"],
      ["Vue", "Healthcare domain"],
      "Why it ranks third: strong on skills, but outside your preferred cities and below your salary minimum at the low end."
    ),
  },
]

/** Product preview: the hero rows plus two more results. */
export const previewJobs: Job[] = [
  ...heroJobs,
  {
    ...base,
    id: "job-marlow-growth",
    slug: "frontend-engineer-growth-marlow-logistics",
    title: "Frontend Engineer, Growth",
    company: companies.marlow,
    location: "Bengaluru",
    workMode: "onsite",
    experience: { min: 2, max: 5 },
    salary: null,
    tags: ["React", "A/B testing", "Analytics"],
    postedAt: daysFromNow(-6),
    description:
      "Run experiments on the shipper onboarding flow and the public tracking pages. You will pair with a product analyst and own the experiment tooling on the frontend.",
    fit: fit(4, 1, 8, ["React", "TypeScript"], ["A/B testing", "Analytics"]),
  },
  {
    ...base,
    id: "job-osprey-rn",
    slug: "react-native-engineer-osprey-labs",
    title: "React Native Engineer",
    company: companies.osprey,
    location: "Bengaluru",
    workMode: "hybrid",
    experience: { min: 3, max: 5 },
    salary: { min: lakh(22), max: lakh(30), currency: "INR", period: "year" },
    tags: ["React Native", "TypeScript", "iOS"],
    postedAt: daysFromNow(-8),
    description:
      "Ship the Osprey field app on iOS and Android from a single React Native codebase, working closely with the backend team on offline sync.",
    fit: fit(3, 1, 8, ["React", "TypeScript"], ["React Native", "iOS"]),
  },
]

/** Application status shown next to preview results, keyed by job id. */
export const previewStatuses = {
  "job-halden-checkout": "applied",
} as const

export const previewCounts = { results: 24, saved: 6, applied: 9, resumes: 2 }

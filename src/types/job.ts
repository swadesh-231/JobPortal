export type WorkMode = "remote" | "hybrid" | "onsite"
export type JobType = "full-time" | "part-time" | "contract" | "internship"
export type ApplicationStatus =
  | "saved"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
export type JobCategory = "engineering" | "design" | "product" | "data"

export interface Company {
  id: string
  name: string
  logoUrl?: string
  industry: string
  verified: boolean
}

export interface Salary {
  min: number
  max?: number
  currency: "INR" | "USD"
  period: "year" | "month"
}

export interface Fit {
  met: number
  partial: number
  total: number
  matchedSkills: string[]
  missingSkills: string[]
  reason?: string
}

export interface Job {
  id: string
  slug: string
  title: string
  company: Company
  location: string
  workMode: WorkMode
  type: JobType
  experience: { min: number; max?: number }
  /** null = not disclosed */
  salary: Salary | null
  tags: string[]
  postedAt: string
  deadline?: string
  status: "open" | "closed"
  applyMethod: "platform" | "external"
  category: JobCategory
  description?: string
  fit?: Fit
  isSample?: boolean
}

export interface Application {
  id: string
  title: string
  company: Company
  salary: Salary | null
  status: ApplicationStatus
  appliedAt?: string
  followUpAt?: string
  interviewAt?: string
  respondBy?: string
}

export type RequirementState = "met" | "partial" | "missing"

export interface Requirement {
  label: string
  state: RequirementState
  evidence: string
}

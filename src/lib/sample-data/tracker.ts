import type { Application, ApplicationStatus, Company, Salary } from "@/types/job"
import { companies, daysFromNow } from "./companies"

const lpa = (min: number, max?: number): Salary => ({
  min: min * 100_000,
  max: max === undefined ? undefined : max * 100_000,
  currency: "INR",
  period: "year",
})

let count = 0
const app = (
  status: ApplicationStatus,
  title: string,
  company: Company,
  salary: Salary | null,
  dates: Partial<Application> = {}
): Application => ({
  id: `app-${++count}`,
  status,
  title,
  company,
  salary,
  ...dates,
})

export const applications: Application[] = [
  app("saved", "Senior Frontend Engineer", companies.quillbase, lpa(32, 42)),
  app("saved", "UI Engineer", companies.tidewater, lpa(24, 30)),
  app("saved", "Frontend Engineer, Growth", companies.marlow, null),

  app("applied", "Frontend Engineer, Checkout", companies.halden, lpa(28, 36), {
    appliedAt: daysFromNow(-3),
    followUpAt: daysFromNow(4),
  }),
  app("applied", "React Native Engineer", companies.osprey, lpa(22, 30), {
    appliedAt: daysFromNow(-6),
  }),
  app("applied", "Web Engineer", companies.bramblewood, lpa(20, 26), {
    appliedAt: daysFromNow(-9),
    followUpAt: daysFromNow(1),
  }),

  app("screening", "Frontend Engineer", companies.corbel, lpa(26, 34), {
    appliedAt: daysFromNow(-12),
  }),
  app("screening", "Software Engineer, Web", companies.juniper, lpa(25, 32), {
    appliedAt: daysFromNow(-14),
    followUpAt: daysFromNow(2),
  }),

  app("interview", "Senior UI Engineer", companies.pinecrest, lpa(30, 38), {
    appliedAt: daysFromNow(-18),
    interviewAt: daysFromNow(3),
  }),
  app("interview", "Frontend Engineer, Design Systems", companies.kestrel, lpa(27, 35), {
    appliedAt: daysFromNow(-21),
    interviewAt: daysFromNow(6),
  }),

  app("offer", "Frontend Engineer", companies.ferngate, lpa(28), {
    appliedAt: daysFromNow(-30),
    respondBy: daysFromNow(5),
  }),

  app("rejected", "Staff Frontend Engineer", companies.corbel, lpa(45, 55), {
    appliedAt: daysFromNow(-25),
  }),
  app("rejected", "Frontend Engineer", companies.juniper, null, {
    appliedAt: daysFromNow(-34),
  }),
]

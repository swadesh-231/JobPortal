import type { Company } from "@/types/job"

// All companies are fictional.
const company = (
  id: string,
  name: string,
  industry: string,
  verified = false
): Company => ({ id, name, industry, verified })

export const companies = {
  quillbase: company("quillbase", "Quillbase", "Developer tools", true),
  halden: company("halden-pay", "Halden Pay", "Payments", true),
  ferngate: company("ferngate-studio", "Ferngate Studio", "Design agency"),
  tidewater: company("tidewater-health", "Tidewater Health", "Healthcare"),
  marlow: company("marlow-logistics", "Marlow Logistics", "Logistics"),
  kestrel: company("kestrel-analytics", "Kestrel Analytics", "Analytics"),
  osprey: company("osprey-labs", "Osprey Labs", "Software"),
  bramblewood: company("bramblewood", "Bramblewood", "Retail"),
  corbel: company("corbel-systems", "Corbel Systems", "Infrastructure"),
  juniper: company("juniper-grid", "Juniper Grid", "Energy"),
  pinecrest: company("pinecrest-mobility", "Pinecrest Mobility", "Mobility"),
} satisfies Record<string, Company>

const DAY = 86_400_000

/** Sample dates are relative to today so the demo never looks stale. */
export const daysFromNow = (days: number) =>
  new Date(Date.now() + days * DAY).toISOString()

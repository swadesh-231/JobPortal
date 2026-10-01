import type { Requirement } from "@/types/job"

/** Requirements for the Quillbase Senior Frontend Engineer role: 7 met, 1 partial, 1 missing. */
export const requirements: Requirement[] = [
  { label: "React", state: "met", evidence: "From your role at Larkfield Software" },
  { label: "TypeScript", state: "met", evidence: "Listed in your skills and two projects" },
  { label: "Next.js", state: "met", evidence: "From your role at Larkfield Software" },
  { label: "4+ years of frontend experience", state: "met", evidence: "4 years across two roles" },
  { label: "Design systems", state: "met", evidence: "From your component library project" },
  { label: "Automated testing", state: "met", evidence: "Jest and Testing Library in your skills" },
  { label: "REST API integration", state: "met", evidence: "From your role at Larkfield Software" },
  { label: "GraphQL", state: "partial", evidence: "In your profile, but not in Resume v2" },
  { label: "Web performance", state: "missing", evidence: "Not found in your profile" },
]

export const gapSuggestions = [
  {
    text: "Your GraphQL work is in your profile but not in Resume v2.",
    action: "Add to resume",
  },
  {
    text: "Web performance appears in 3 of your saved roles.",
    action: "Add a skill",
  },
]

export const rankingFactors = [
  { title: "Skills match", detail: "Requirements you meet, partly meet and miss" },
  { title: "Experience vs range", detail: "Your years against the range the role asks for" },
  { title: "Location and work mode", detail: "Your preferred cities and remote preference" },
  { title: "Salary vs your minimum", detail: "Whether the posted range clears your floor" },
]

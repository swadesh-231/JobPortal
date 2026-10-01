export interface SocialProofLogo {
  name: string
  src: string
}

export interface SocialProofStat {
  value: string
  label: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatarUrl?: string
}

export const siteConfig = {
  name: "Shortlist",
  description:
    "Job search that ranks roles by fit and tracks every application.",
  cities: ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai"],
  popularSearches: [
    "React developer",
    "Java backend",
    "Product designer",
    "Data analyst",
    "Remote only",
  ],
  // true only with real data
  socialProof: {
    enabled: false,
    logos: [] as SocialProofLogo[],
    stats: [] as SocialProofStat[],
  },
  // true only with real, consented quotes
  testimonials: { enabled: false, items: [] as Testimonial[] },
  routes: {
    home: "/",
    jobs: "/jobs",
    signUp: "/signup",
    logIn: "/login",
  },
  nav: [
    { label: "Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    {
      label: "Career guide",
      href: "/resources/career-guide",
      description: "Plan your next move, from first job to senior roles.",
    },
    {
      label: "Blog",
      href: "/blog",
      description: "Hiring trends and practical job search advice.",
    },
    {
      label: "Interview prep",
      href: "/resources/interview-prep",
      description: "Question sets and checklists by role.",
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { label: "Jobs", href: "/jobs" },
        { label: "Companies", href: "/companies" },
        { label: "Applications", href: "/applications" },
        { label: "Resume", href: "/resume" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Career guide", href: "/resources/career-guide" },
        { label: "Blog", href: "/blog" },
        { label: "Interview prep", href: "/resources/interview-prep" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "GitHub", href: "https://github.com", icon: "github" },
  ],
} as const

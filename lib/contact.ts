import { siteConfig } from "@/lib/site";

export const contactConfig = {
  availabilityTitle: siteConfig.availability.label,
  availabilityNote: siteConfig.availability.note,
  emailLabel: "Email",
  locationLabel: "Location",
  location: "Remote",
  responseTimeLabel: "Response time",
  responseTime: "Within 24 hours",
} as const;

export const projectTypes = [
  { value: "web_app", label: "Web application" },
  { value: "mobile_app", label: "Mobile application" },
  { value: "saas", label: "SaaS / Product build" },
  { value: "web3", label: "Web3 / Blockchain" },
  { value: "landing_page", label: "Landing page" },
  { value: "other", label: "Other" },
] as const;

export const budgetRanges = [
  { value: "under_1k", label: "Under $1,000" },
  { value: "1k_3k", label: "$1,000 – $3,000" },
  { value: "3k_5k", label: "$3,000 – $5,000" },
  { value: "5k_10k", label: "$5,000 – $10,000" },
  { value: "10k_plus", label: "$10,000+" },
  { value: "not_sure_yet", label: "Not sure yet" },
] as const;

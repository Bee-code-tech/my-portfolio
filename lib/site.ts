const PRODUCTION_URL = "https://thetechod.vercel.app";

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_URL;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Babawale Al-Ameen",
  brand: "TheTechOD",
  role: "Full Stack Engineer",
  title: "Babawale Al-Ameen | Full Stack Engineer",
  description:
    "Full stack engineer specializing in React, Next.js, and TypeScript. I build and ship production-ready web and mobile products end to end. Open to remote full-time and contract roles.",
  shortDescription:
    "Full stack engineer specializing in React, Next.js, and TypeScript. Building fast, shipping to production.",
  url: getSiteUrl(),
  author: "Babawale Al-Ameen",
  email: "babawaleolatunji64@gmail.com",
  location: "Remote",
  tagline:
    "Full-stack developer building refined digital products with clarity, craft, and real-world impact.",
  availability: {
    label: "Open to remote roles",
    note: "Full-time and contract",
    cta: "Hire me",
  },
  keywords: [
    "Babawale Al-Ameen",
    "Al-Ameen Babawale",
    "full stack engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "remote software engineer",
    "software engineer",
  ],
  links: {
    github: "https://github.com/Bee-code-tech",
    linkedin: "https://www.linkedin.com/in/al-ameen-babawale-89ba85209",
    website: "https://thetechod.vercel.app",
  },
  ogImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Babawale Al-Ameen — Full stack engineer who ships production-ready products.",
    type: "image/png",
  },
} as const;

export const navLinks = [
  { label: "Projects", href: "/portfolio" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Why Me", href: "/#why-me" },
  { label: "Process", href: "/#thought-process" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
] as const;

export const pageLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Website", href: siteConfig.links.website },
] as const;

export const sections = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "My Projects" },
  { id: "expertise", label: "My Expertise" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "why-me", label: "Why Me" },
  { id: "thought-process", label: "Thought Process" },
  { id: "testimonials", label: "Testimonials" },
] as const;

export const sitemapRoutes = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

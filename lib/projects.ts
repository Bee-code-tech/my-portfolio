export type Project = {
  name: string;
  category: string;
  year: string;
  description: string;
};

export const projects: Project[] = [
  {
    name: "Project One",
    category: "Web App",
    year: "2025",
    description: "A responsive web application built with modern tooling and clean UX.",
  },
  {
    name: "Project Two",
    category: "Brand & Web",
    year: "2025",
    description: "Brand identity and marketing site for a growing creative studio.",
  },
  {
    name: "Project Three",
    category: "Product Design",
    year: "2024",
    description: "End-to-end product design for a SaaS dashboard and onboarding flow.",
  },
  {
    name: "Project Four",
    category: "E-commerce",
    year: "2024",
    description: "High-converting storefront with refined product detail experiences.",
  },
  {
    name: "Project Five",
    category: "Mobile App",
    year: "2024",
    description: "Cross-platform mobile experience focused on clarity and speed.",
  },
  {
    name: "Project Six",
    category: "Design System",
    year: "2023",
    description: "Scalable component library and documentation for a product team.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-with-clarity",
    title: "Designing with clarity",
    excerpt:
      "How I approach layout, typography, and hierarchy to make interfaces feel intentional.",
    date: "2025-11-12",
    readTime: "5 min read",
  },
  {
    slug: "shipping-faster-with-nextjs",
    title: "Shipping faster with Next.js",
    excerpt:
      "A practical workflow for moving from concept to production without sacrificing polish.",
    date: "2025-09-28",
    readTime: "7 min read",
  },
  {
    slug: "building-trust-through-process",
    title: "Building trust through process",
    excerpt:
      "Why a transparent design process helps clients feel confident at every stage.",
    date: "2025-08-03",
    readTime: "4 min read",
  },
];

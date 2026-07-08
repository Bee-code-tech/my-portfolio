export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  link?: string;
  avatar: string;
};

export const featuredTestimonial: Testimonial = {
  quote:
    "Working with Al-Ameen felt incredibly smooth. The architecture was clear from the beginning, and the final product shipped with precision and confidence.",
  name: "Ethan Brooks",
  role: "Founder",
  link: "https://x.com",
  avatar:
    "https://framerusercontent.com/images/qeYrxqQc9vll222pCTtaYWDxo.jpg?width=515&height=515",
};

export const mayaTestimonial: Testimonial = {
  quote:
    "The process was thoughtful, fast, and highly organized. Every technical decision felt intentional, and the final result made our product feel much more polished.",
  name: "Maya Chen",
  role: "Designer",
  link: "https://x.com",
  avatar:
    "https://framerusercontent.com/images/rZmnnPdh2NfRFd8GwnJmVeCq5Ow.jpg?width=555&height=555",
};

export const liamTestimonial: Testimonial = {
  quote:
    "Al-Ameen helped turn a rough MVP into a refined product. The work felt clean, strategic, and exactly aligned with where we wanted to go.",
  name: "Liam Carter",
  role: "Director",
  link: "https://x.com",
  avatar:
    "https://framerusercontent.com/images/nFTyhTg9mtSiD0Oh51DGHixETM.jpg?width=583&height=583",
};

export const testimonialsMeta = {
  trustLabel: "Trusted by 24+ clients",
  ctaLabel: "Let's work together",
  ctaHref: "/contact",
};

export const trustAvatars = [
  featuredTestimonial.avatar,
  mayaTestimonial.avatar,
  liamTestimonial.avatar,
  "https://framerusercontent.com/images/7n35wdG8jtT2LMgYCpqeBkSo6s.jpg?width=527&height=527",
];

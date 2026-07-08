export type ExpertiseIconId = "code" | "ai" | "web3";

export type ExpertiseItem = {
  title: string;
  description: string;
  icon: ExpertiseIconId;
};

export const expertiseItems: ExpertiseItem[] = [
  {
    title: "Web and system development",
    description:
      "Full stack applications, APIs, and system architecture — clean code, scalable patterns, shipped to production.",
    icon: "code",
  },
  {
    title: "AI/ML engineering",
    description:
      "Designing and deploying machine learning pipelines, intelligent features, and data-driven products that solve real business problems.",
    icon: "ai",
  },
  {
    title: "Web3 and Blockchain",
    description:
      "Developing smart contracts, decentralized apps, and on-chain experiences with security, clarity, and user trust in mind.",
    icon: "web3",
  },
];

export const EXPERTISE_TYPING = {
  /** Milliseconds per character — drives progress bar and typing together */
  msPerChar: 22,
} as const;

export function getTypingDurationMs(charCount: number) {
  return Math.max(charCount * EXPERTISE_TYPING.msPerChar, 1200);
}

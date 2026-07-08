import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import { TbBrandOpenai } from "react-icons/tb";
import {
  SiAnthropic,
  SiDart,
  SiDocker,
  SiEthereum,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFlutter,
  SiFramer,
  SiGithub,
  SiGooglecloud,
  SiHuggingface,
  SiIpfs,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSolidity,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVllm,
  SiWeb3Dotjs,
} from "react-icons/si";

export type TechItem = {
  name: string;
  icon: IconType;
};

export type TechCategory = {
  id: string;
  title: string;
  side: "left" | "right";
  items: TechItem[];
};

export const techStackCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    side: "left",
    items: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next JS", icon: SiNextdotjs },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Shadcn UI", icon: SiShadcnui },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    side: "right",
    items: [
      { name: "Node JS", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    side: "left",
    items: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
      { name: "React Native", icon: SiReact },
      { name: "Expo", icon: SiExpo },
    ],
  },
  {
    id: "web3",
    title: "Web3 & Blockchain",
    side: "right",
    items: [
      { name: "Web3.js", icon: SiWeb3Dotjs },
      { name: "Solidity", icon: SiSolidity },
      { name: "Ethereum", icon: SiEthereum },
      { name: "IPFS", icon: SiIpfs },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    side: "left",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "GitHub", icon: SiGithub },
      { name: "AWS", icon: FaAws },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Kubernetes", icon: SiKubernetes },
    ],
  },
  {
    id: "ai",
    title: "AI / Machine Learning",
    side: "right",
    items: [
      { name: "OpenAI API", icon: TbBrandOpenai },
      { name: "LangChain", icon: SiLangchain },
      { name: "vLLM", icon: SiVllm },
      { name: "Anthropic API", icon: SiAnthropic },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Hugging Face", icon: SiHuggingface },
    ],
  },
];

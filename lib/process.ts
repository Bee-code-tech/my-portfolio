import type { ComponentType, SVGProps } from "react";
import {
  DeliveryIcon,
  DesignIcon,
  DevelopmentIcon,
  DirectionIcon,
  DiscoveryIcon,
  StrategyIcon,
} from "@/components/process/ProcessIcons";

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description:
      "We start by understanding your goals, users, technical constraints, and the direction the product should take.",
    Icon: DiscoveryIcon,
    iconClassName: "text-foreground",
  },
  {
    id: "strategy",
    title: "Strategy",
    description:
      "I define the architecture, stack, milestones, and delivery plan before moving into implementation.",
    Icon: StrategyIcon,
    iconClassName: "text-foreground/60",
  },
  {
    id: "direction",
    title: "Direction",
    description:
      "A clear technical and product direction is shaped through system patterns, UI language, and scope boundaries.",
    Icon: DirectionIcon,
    iconClassName: "text-foreground/60",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Interfaces, flows, and component systems are crafted with attention to usability, consistency, and scalability.",
    Icon: DesignIcon,
    iconClassName: "text-foreground/60",
  },
  {
    id: "development",
    title: "Development",
    description:
      "Designs become production-ready software — APIs, frontends, integrations, and deployment pipelines included.",
    Icon: DevelopmentIcon,
    iconClassName: "text-foreground/50",
  },
  {
    id: "delivery",
    title: "Delivery",
    description:
      "Final builds, documentation, and handoff assets are prepared clearly so everything is ready to launch.",
    Icon: DeliveryIcon,
    iconClassName: "text-foreground/60",
  },
];

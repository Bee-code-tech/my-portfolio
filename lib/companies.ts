const LOGO_HEIGHT = 36;

function logoSize(width: number, height: number) {
  return {
    width: Math.round((width / height) * LOGO_HEIGHT),
    height: LOGO_HEIGHT,
  };
}

export const companyLogos = [
  {
    id: "codepulse",
    name: "CodePulse",
    ...logoSize(352, 95),
  },
  {
    id: "looprail",
    name: "LoopRail",
    ...logoSize(293, 95),
  },
  {
    id: "rutoai",
    name: "Ruto AI",
    ...logoSize(263, 95),
  },
  {
    id: "lodgr",
    name: "Lodgr",
    ...logoSize(183, 95),
  },
  {
    id: "afrixta",
    name: "Afrixta",
    ...logoSize(297, 95),
  },
  {
    id: "hoa",
    name: "HOA",
    ...logoSize(205, 95),
  },
  {
    id: "dropa",
    name: "Dropa",
    ...logoSize(252, 85),
  },
] as const;

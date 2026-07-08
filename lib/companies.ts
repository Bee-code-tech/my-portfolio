const LOGO_HEIGHT = 36;

function logoSize(width: number, height: number) {
  return {
    width: Math.round((width / height) * LOGO_HEIGHT),
    height: LOGO_HEIGHT,
  };
}

export const companyLogos = [
  {
    id: "universoul",
    name: "Universoul Barbers",
    ...logoSize(352, 95),
  },
  {
    id: "gofix",
    name: "Gofix",
    ...logoSize(293, 95),
  },
  {
    id: "zidoo",
    name: "Zidoo",
    ...logoSize(263, 95),
  },
  {
    id: "isoft",
    name: "iSoft",
    ...logoSize(183, 95),
  },
  {
    id: "doormann",
    name: "Doormann",
    ...logoSize(297, 95),
  },
  {
    id: "farmwise",
    name: "Farmwise",
    ...logoSize(205, 95),
  },
  {
    id: "my-estation",
    name: "My-Estation",
    ...logoSize(252, 85),
  },
] as const;

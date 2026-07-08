/** GSAP easing — close to the prior cubic-bezier(0.22, 1, 0.36, 1) feel */
export const GSAP_EASE = "power3.out";

/** CSS cubic-bezier used in hero entrance keyframes */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const ANIMATION_DURATION = {
  fade: 0.65,
  scale: 0.55,
  lineY: 1.1,
  lineX: 0.5,
} as const;

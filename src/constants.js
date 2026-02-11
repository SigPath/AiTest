/**
 * Global constants for the Retail Ad application
 * 
 * PERFORMANCE NOTE: These are singletons - defined once, reused everywhere.
 * No memory allocation on every render.
 */

export const COLORS = {
  white: '#FFFFFF',
  gold: '#FFD700',
  orange: '#FFA500',
  // Note: darkGold, goldenrod, deepOrange, black removed - were unused (verified via grep)
};

export const TIMINGS = {
  slideDuration: 90,
  fps: 30,
};

export const DIMENSIONS = {
  width: 1920,
  height: 1080,
};

export const ANIMATION_CONFIG = {
  spring: {
    standard: { stiffness: 300, damping: 8 },
    bounce: { stiffness: 400, damping: 6 },
    smooth: { stiffness: 100, damping: 20 },
    soft: { stiffness: 50, damping: 20 },
  },
};

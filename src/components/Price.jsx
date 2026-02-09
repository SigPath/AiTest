import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Price Component
 * 
 * Displays price with a scale-emphasis animation.
 * Uses spring physics for natural, professional motion.
 * 
 * WHY spring over interpolate: Spring gives a subtle bounce that draws
 * attention without looking amateurish. This is a retail price — 
 * it should feel impactful but trustworthy.
 * 
 * WHY separate currency: Allows different styling if needed,
 * common pattern in European retail (smaller currency unit).
 */
export const Price = ({ 
  price, 
  style = {}, 
  startFrame = 30,
  emphasize = true 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Scale animation using spring for natural feel
  const scale = emphasize
    ? spring({
        frame: frame - startFrame,
        fps,
        config: {
          damping: 20,
          mass: 0.5,
        },
      })
    : 1;
  
  // Fade in separate from scale
  // WHY: Decoupling animations gives more control over timing
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        fontSize: '120px',
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {price}
    </div>
  );
};

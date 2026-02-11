import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { ANIMATION_CONFIG } from '../../constants';
import { useMemo } from 'react';

export const EnergyRing = ({ delay, color, maxScale = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const ringSpring = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: ANIMATION_CONFIG.spring.soft,
  });
  
  const scale = interpolate(ringSpring, [0, 1], [0.5, maxScale]);
  const opacity = interpolate(ringSpring, [0, 0.3, 1], [0, 0.8, 0]);
  
  // Memoize transform and boxShadow strings
  const transform = useMemo(() => `scale(${scale})`, [scale]);
  const boxShadow = useMemo(
    () => `0 0 40px ${color}, inset 0 0 40px ${color}`,
    [color]
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: `4px solid ${color}`,
        borderRadius: '50%',
        opacity: opacity,
        transform,
        boxShadow,
        pointerEvents: 'none',
      }}
    />
  );
};

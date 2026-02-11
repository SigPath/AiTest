import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION_CONFIG } from '../../constants';
import { useMemo } from 'react';

export const Particle = ({ index, startFrame, totalParticles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Pre-calculate angle once - doesn't change per frame
  const angle = useMemo(
    () => (index / totalParticles) * Math.PI * 2,
    [index, totalParticles]
  );
  
  const delay = startFrame + (index * 2);
  
  const particleSpring = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: ANIMATION_CONFIG.spring.smooth,
  });
  
  const distance = interpolate(particleSpring, [0, 1], [0, 150]);
  const opacity = interpolate(
    frame,
    [delay, delay + 20, delay + 40],
    [0, 1, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const rotation = interpolate(
    frame,
    [delay, delay + 60],
    [0, 720],
    { extrapolateRight: 'clamp' }
  );
  
  // Memoize position calculations
  const position = useMemo(() => {
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  }, [angle, distance]);

  const transform = useMemo(
    () => `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${particleSpring})`,
    [position.x, position.y, rotation, particleSpring]
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.orange})`,
        opacity: opacity,
        transform,
        boxShadow: `0 0 20px rgba(255, 215, 0, 0.8)`,
      }}
    />
  );
};

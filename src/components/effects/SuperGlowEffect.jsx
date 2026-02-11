import { useCurrentFrame, interpolate } from 'remotion';
import { TIMINGS } from '../../constants';
import { useMemo } from 'react';

const GLOW_DURATION = TIMINGS.slideDuration;

const glowStyle = {
  position: 'absolute',
  pointerEvents: 'none',
};

export const SuperGlowEffect = ({ startFrame = 30 }) => {
  const frame = useCurrentFrame();
  
  const rotation1 = interpolate(
    frame,
    [startFrame, startFrame + GLOW_DURATION],
    [0, 360],
    { extrapolateRight: 'extend' }
  );
  const rotation2 = interpolate(
    frame,
    [startFrame, startFrame + GLOW_DURATION],
    [360, 0],
    { extrapolateRight: 'extend' }
  );
  const rotation3 = interpolate(
    frame,
    [startFrame, startFrame + GLOW_DURATION],
    [0, 180],
    { extrapolateRight: 'extend' }
  );
  
  const pulse = interpolate(
    frame,
    [
      startFrame,
      startFrame + 15,
      startFrame + 30,
      startFrame + 45,
      startFrame + 60,
      startFrame + 75,
      startFrame + GLOW_DURATION,
    ],
    [0.3, 0.8, 0.4, 0.9, 0.5, 0.8, 0.6],
    { extrapolateRight: 'clamp' }
  );

  // Memoize transforms to reduce string operations
  const transform1 = useMemo(
    () => `rotate(${rotation1}deg) scale(${1 + pulse * 0.3})`,
    [rotation1, pulse]
  );
  const transform2 = useMemo(
    () => `rotate(${rotation2}deg) scale(${1.1 + pulse * 0.2})`,
    [rotation2, pulse]
  );
  const transform3 = useMemo(
    () => `rotate(${rotation3}deg) scale(${0.8 + pulse * 0.4})`,
    [rotation3, pulse]
  );

  return (
    <>
      <div
        style={{
          ...glowStyle,
          width: '500px',
          height: '150px',
          background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.9) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: pulse,
          transform: transform1,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: '450px',
          height: '130px',
          background: 'radial-gradient(ellipse, rgba(255, 165, 0, 0.7) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: pulse * 0.8,
          transform: transform2,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: '300px',
          height: '100px',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: pulse * 0.9,
          transform: transform3,
        }}
      />
    </>
  );
};

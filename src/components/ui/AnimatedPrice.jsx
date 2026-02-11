import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION_CONFIG, TIMINGS } from '../../constants';
import { SuperGlowEffect } from '../effects/SuperGlowEffect';
import { Particle } from '../effects/Particle';
import { useMemo } from 'react';

// Constants extracted - no recalculation on every render
const PARTICLE_COUNT = 12;
const PARTICLE_INDICES = Array.from({ length: PARTICLE_COUNT }, (_, i) => i);

// Timing constants derived from slide duration for maintainability
const PRICE_START_FRAME = Math.floor(TIMINGS.slideDuration * 0.33); // ~30
const PRICE_FADE_END = PRICE_START_FRAME + 8;
const PRICE_VIBRATION_START = PRICE_START_FRAME + 10;
const PARTICLE_START = PRICE_START_FRAME + 2;

// Pre-calculated style objects to reduce allocations
const containerStyle = {
  position: 'relative',
  marginBottom: '70px',
};

const particleContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const AnimatedPrice = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const priceExplosion = spring({
    frame: frame - PRICE_START_FRAME,
    fps,
    from: 0,
    to: 1,
    config: ANIMATION_CONFIG.spring.bounce,
  });
  
  const priceScale = interpolate(
    priceExplosion,
    [0, 1],
    [0.1, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const priceOpacity = interpolate(
    frame,
    [PRICE_START_FRAME, PRICE_FADE_END],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  // Avoid recalculation when not visible
  const priceVibration = frame > PRICE_VIBRATION_START 
    ? Math.sin((frame - PRICE_VIBRATION_START) * 0.5) * 1.5 
    : 0;
  
  const priceGigaPulse = interpolate(
    frame,
    [40, 50, 60, 70, 80, TIMINGS.slideDuration],
    [1.0, 1.08, 1.0, 1.10, 1.0, 1.06],
    { extrapolateRight: 'clamp' }
  );

  // Memoize combined transform to avoid string concatenation on every frame
  const textTransform = useMemo(
    () => `scale(${priceScale * priceGigaPulse}) rotate(${priceVibration}deg)`,
    [priceScale, priceGigaPulse, priceVibration]
  );

  const showParticles = frame > PRICE_START_FRAME;

  return (
    <div style={containerStyle}>
      <SuperGlowEffect startFrame={PRICE_START_FRAME} />
      {showParticles && (
        <div style={particleContainerStyle}>
          {PARTICLE_INDICES.map((i) => (
            <Particle 
              key={i} 
              index={i} 
              startFrame={PARTICLE_START} 
              totalParticles={PARTICLE_COUNT} 
            />
          ))}
        </div>
      )}
      <div
        style={{
          fontSize: '220px',
          fontWeight: '900',
          color: COLORS.gold,
          opacity: priceOpacity,
          transform: textTransform,
          textShadow: '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.6), 0 0 160px rgba(255, 255, 255, 0.4), 0 12px 60px rgba(0, 0, 0, 0.8)',
          letterSpacing: '-6px',
          position: 'relative',
          zIndex: 2,
          WebkitTextStroke: '3px rgba(255, 140, 0, 0.5)',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 60px rgba(255, 165, 0, 0.6))',
        }}
      >
        {price}
      </div>
    </div>
  );
};

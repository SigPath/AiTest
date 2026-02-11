import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION_CONFIG, TIMINGS } from '../../constants';
import { useMemo } from 'react';

// Timing constants derived from slide duration
const LOGO_FADE_END = 12;
const LOGO_SHAKE_START = 5;
const LOGO_SHAKE_END = 14;
const LOGO_PULSE_START = 15;

// Static text styles - no recreation needed
const baseTextStyle = {
  fontSize: '52px',
  fontWeight: '200',
  letterSpacing: '12px',
  textTransform: 'uppercase',
  marginBottom: '40px',
  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5), 0 4px 30px rgba(0, 0, 0, 0.5)',
};

export const BrandLogo = ({ brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoSpring = spring({
    frame: frame,
    fps,
    from: -200,
    to: 0,
    config: ANIMATION_CONFIG.spring.standard,
  });
  
  // Shake only during active period - avoid calculation waste
  const logoShake = frame >= LOGO_SHAKE_START && frame <= LOGO_SHAKE_END
    ? interpolate(
        frame,
        [LOGO_SHAKE_START, 8, 11, LOGO_SHAKE_END],
        [0, -5, 3, 0],
        { extrapolateRight: 'clamp' }
      )
    : 0;
  
  const logoOpacity = interpolate(
    frame,
    [0, LOGO_FADE_END],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  // Simplified pulse - sine wave is cleaner and more performant than 11 keyframes
  const logoPulse = frame >= LOGO_PULSE_START
    ? 1.0 + Math.sin((frame - LOGO_PULSE_START) * 0.12) * 0.08 // Oscillates between 0.92-1.08
    : 1.0;

  // Memoize complex transform string
  const transform = useMemo(
    () => `translateY(${logoSpring}px) translateX(${logoShake}px) scale(${logoPulse})`,
    [logoSpring, logoShake, logoPulse]
  );

  const filter = frame > 10 
    ? `drop-shadow(0 0 ${logoPulse * 15}px rgba(255, 255, 255, 0.6))` 
    : 'none';

  return (
    <div
      style={{
        ...baseTextStyle,
        color: COLORS.white,
        opacity: logoOpacity,
        transform,
        filter,
      }}
    >
      {brand}
    </div>
  );
};

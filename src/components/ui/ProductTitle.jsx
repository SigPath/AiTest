import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION_CONFIG, TIMINGS } from '../../constants';
import { useMemo } from 'react';

// Timing constants
const TITLE_START_FRAME = 15;
const TITLE_FADE_END = 25;
const TITLE_ROTATE_END = 30;
const TITLE_SHAKE_START = 30;

// Static styles
const baseTextStyle = {
  fontSize: '110px',
  fontWeight: '900',
  textAlign: 'center',
  lineHeight: '1.0',
  maxWidth: '1300px',
  marginBottom: '60px',
  textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.5), 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 100px rgba(255, 255, 255, 0.3)',
  letterSpacing: '-3px',
  WebkitTextStroke: '2px rgba(255, 215, 0, 0.3)',
};

export const ProductTitle = ({ productName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const productSpring = spring({
    frame: frame - TITLE_START_FRAME,
    fps,
    from: 0,
    to: 1,
    config: ANIMATION_CONFIG.spring.standard, // FIX: Use consistent config
  });
  
  const productScale = interpolate(
    productSpring,
    [0, 1],
    [0.2, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const productOpacity = interpolate(
    frame,
    [TITLE_START_FRAME, TITLE_FADE_END],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const productRotate = interpolate(
    frame,
    [TITLE_START_FRAME, TITLE_ROTATE_END],
    [-15, 0],
    { extrapolateRight: 'clamp' }
  );
  
  // Only calculate shake when active - avoid Math.sin() waste
  const productShake = frame >= TITLE_SHAKE_START 
    ? Math.sin((frame - TITLE_SHAKE_START) * 0.3) * 2 
    : 0;

  // Memoize complex transform
  const transform = useMemo(
    () => `scale(${productScale}) rotate(${productRotate}deg) translateX(${productShake}px)`,
    [productScale, productRotate, productShake]
  );

  const filter = frame > 25 
    ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))' 
    : 'none';

  return (
    <div
      style={{
        ...baseTextStyle,
        color: COLORS.white,
        opacity: productOpacity,
        transform,
        filter,
      }}
    >
      {productName}
    </div>
  );
};

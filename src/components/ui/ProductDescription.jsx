import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, TIMINGS } from '../../constants';
import { useMemo } from 'react';

// Timing constants - 50% through slide
const DESC_START = Math.floor(TIMINGS.slideDuration * 0.5);
const DESC_END = DESC_START + 13;
const DESC_FILTER_START = DESC_END - 3;

// Static styles
const baseTextStyle = {
  fontSize: '44px',
  fontWeight: '500',
  textAlign: 'center',
  fontStyle: 'italic',
  maxWidth: '1000px',
  textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 4px 25px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)',
  lineHeight: '1.4',
  letterSpacing: '1px',
};

export const ProductDescription = ({ description }) => {
  const frame = useCurrentFrame();
  
  const descriptionOpacity = interpolate(
    frame,
    [DESC_START, DESC_END],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const descriptionSlideUp = interpolate(
    frame,
    [DESC_START, DESC_END],
    [50, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const descriptionScale = interpolate(
    frame,
    [DESC_START, DESC_END],
    [0.8, 1],
    { extrapolateRight: 'clamp' }
  );

  const transform = useMemo(
    () => `translateY(${descriptionSlideUp}px) scale(${descriptionScale})`,
    [descriptionSlideUp, descriptionScale]
  );

  const filter = frame > DESC_FILTER_START
    ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))'
    : 'none';

  return (
    <div
      style={{
        ...baseTextStyle,
        color: COLORS.white,
        opacity: descriptionOpacity,
        transform,
        filter,
      }}
    >
      {description}
    </div>
  );
};

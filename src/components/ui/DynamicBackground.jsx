import { useCurrentFrame, interpolate } from 'remotion';
import { TIMINGS } from '../../constants';
import { useMemo } from 'react';

// Static style objects - allocated once, not on every render
const baseLayerStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: -1,
};

const vignetteStyle = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
};

const bottomGradientStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '400px',
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)',
  pointerEvents: 'none',
};

const topGradientStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '200px',
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent)',
  pointerEvents: 'none',
};

const accentBaseStyle = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  pointerEvents: 'none',
};

const ACCENT_START_FRAME = Math.floor(TIMINGS.slideDuration * 0.33); // ~30

export const DynamicBackground = () => {
  const frame = useCurrentFrame();
  
  const backgroundShift = interpolate(
    frame,
    [0, 45, TIMINGS.slideDuration],
    [0, 25, -15],
    { extrapolateRight: 'clamp' }
  );
  const backgroundLightness = interpolate(
    frame,
    [0, 30, 60, TIMINGS.slideDuration],
    [12, 25, 18, 28],
    { extrapolateRight: 'clamp' }
  );
  const backgroundSaturation = interpolate(
    frame,
    [0, 45, TIMINGS.slideDuration],
    [40, 65, 50],
    { extrapolateRight: 'clamp' }
  );
  
  const vignettePulse = interpolate(
    frame,
    [0, 15, 30, 45, 60, 75, TIMINGS.slideDuration],
    [0.4, 0.6, 0.3, 0.7, 0.4, 0.6, 0.5],
    { extrapolateRight: 'clamp' }
  );

  // Memoize expensive string operations
  const dynamicBackground = useMemo(
    () => `hsl(${155 + backgroundShift}, ${backgroundSaturation}%, ${backgroundLightness}%)`,
    [backgroundShift, backgroundSaturation, backgroundLightness]
  );

  const vignetteBackground = useMemo(
    () => `radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, ${vignettePulse}))`,
    [vignettePulse]
  );

  // Calculate accent opacities only when visible
  const showAccents = frame > ACCENT_START_FRAME;
  const topRightOpacity = showAccents ? interpolate(
    frame,
    [ACCENT_START_FRAME, 45, 60],
    [0, 0.8, 0.4],
    { extrapolateRight: 'clamp' }
  ) : 0;
  
  const bottomLeftOpacity = showAccents ? interpolate(
    frame,
    [ACCENT_START_FRAME + 5, 50, 65],
    [0, 0.8, 0.4],
    { extrapolateRight: 'clamp' }
  ) : 0;

  return (
    <>
      <div style={{ ...baseLayerStyle, backgroundColor: dynamicBackground }} />
      <div style={{ ...vignetteStyle, background: vignetteBackground }} />
      <div style={bottomGradientStyle} />
      <div style={topGradientStyle} />
      {showAccents && (
        <>
          <div
            style={{
              ...accentBaseStyle,
              top: 0,
              right: 0,
              background: 'radial-gradient(circle at top right, rgba(255, 215, 0, 0.2), transparent)',
              opacity: topRightOpacity,
            }}
          />
          <div
            style={{
              ...accentBaseStyle,
              bottom: 0,
              left: 0,
              background: 'radial-gradient(circle at bottom left, rgba(255, 165, 0, 0.2), transparent)',
              opacity: bottomLeftOpacity,
            }}
          />
        </>
      )}
    </>
  );
};

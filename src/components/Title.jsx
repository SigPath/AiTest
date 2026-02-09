import { interpolate, useCurrentFrame } from 'remotion';

/**
 * Title Component
 * 
 * Displays text with a subtle slide-fade animation.
 * Animation timing is controlled via startFrame and duration props
 * to allow flexible sequencing in compositions.
 * 
 * WHY: Separating animation timing from the component makes it reusable
 * across different compositions without hardcoding values.
 */
export const Title = ({ 
  text, 
  style = {}, 
  startFrame = 0, 
  duration = 30 
}) => {
  const frame = useCurrentFrame();
  
  // Slide in from left + fade in
  // WHY: Using individual properties instead of transform string
  // makes it easier to debug and maintain
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const translateX = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [-30, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        fontSize: '48px',
        fontWeight: '300',
        letterSpacing: '2px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        opacity,
        transform: `translateX(${translateX}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

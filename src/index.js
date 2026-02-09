import { Composition, registerRoot } from 'remotion';
import { RetailAd } from './compositions/RetailAd';
import data from './data/data.json';

/**
 * Remotion Root Configuration
 * 
 * This file registers all compositions and makes them available
 * in the Remotion Studio and for rendering.
 * 
 * CONFIGURATION EXPLAINED:
 * - id: Unique identifier for the composition (used in CLI rendering)
 * - component: The React component to render
 * - durationInFrames: 180 frames = 6 seconds at 30fps
 * - fps: Standard for web video, smooth enough for motion
 * - width/height: Full HD - standard for digital signage
 * - defaultProps: Data injection point for the composition
 * 
 * WHY this structure: Makes it trivial to add more compositions
 * or switch data sources (could be API, database, etc.) without
 * touching the component code.
 * 
 * SCALING CONSIDERATION:
 * For batch rendering, you would:
 * 1. Load multiple data files or fetch from API
 * 2. Register multiple composition instances with different IDs
 * 3. Render programmatically using @remotion/renderer
 */

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="RetailAd"
        component={RetailAd}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: data,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);

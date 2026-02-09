# Retail Video Generator

Production-ready MVP for programmatic retail video generation using Remotion.

## 🎯 Overview

Generates 6-second Full HD (1920x1080) retail video ads for digital signage.
Videos are data-driven, silent, loopable, and designed for physical store displays.

## 📁 Project Structure

```
src/
 ├─ components/
 │   ├─ Title.jsx       # Reusable title component with slide-fade animation
 │   └─ Price.jsx       # Price component with spring emphasis animation
 ├─ compositions/
 │   └─ RetailAd.jsx    # Main video composition
 ├─ data/
 │   └─ data.json       # Product data input
 └─ index.js            # Remotion root and composition registration
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the Remotion Studio to preview your video:

```bash
npm start
```

This opens a browser-based player where you can scrub through frames and see changes in real-time.

### Rendering

Render the final video:

```bash
npm run build
```

Output: `out/video.mp4` (Full HD, 6 seconds, 30fps)

## 📊 Data Format

Edit `src/data/data.json` to change video content:

```json
{
  "brand": "GreenHive",
  "product": "Eko Miód Leśny",
  "price": "19,99 zł",
  "promoText": "Naturalnie z polskich lasów",
  "backgroundColor": "#0F3D2E"
}
```

## 🎬 Animation Timeline

- **Frame 0-30**: Brand fades in
- **Frame 15-45**: Product name appears
- **Frame 30-60**: Price emphasizes (key moment)
- **Frame 45-75**: Promo text appears
- **Frame 75-180**: Hold (readability + loop preparation)

## 🏗️ Architecture Principles

### Component Design
- **Small and reusable**: Each component has a single responsibility
- **Timing as props**: Animation timing is controlled via props, not hardcoded
- **Style overrides**: Components accept style prop for composition-level customization

### Data-Driven
- All content comes from JSON input
- Components never hardcode business logic
- Easy to extend for batch rendering with multiple data files

### Professional Motion
- Frame-based animations using `interpolate()` and `useCurrentFrame()`
- Spring physics for natural emphasis (`spring()` in Price component)
- Staggered timing creates visual rhythm

## 📈 Scaling to Production

### Batch Rendering

To generate multiple videos:

1. **Prepare data files**: Create multiple JSON files in `src/data/`
2. **Register compositions**: Dynamically register compositions in `index.js`
3. **Automated rendering**:

```javascript
// Example batch render script
const { bundle } = require('@remotion/bundler');
const { renderMedia } = require('@remotion/renderer');

const compositions = [
  { id: 'RetailAd_1', data: require('./data/product1.json') },
  { id: 'RetailAd_2', data: require('./data/product2.json') },
  // ... more products
];

// Render each composition
for (const comp of compositions) {
  await renderMedia({
    composition: comp.id,
    inputProps: { data: comp.data },
    outputLocation: `out/${comp.id}.mp4`,
  });
}
```

### API Integration

Replace static JSON with API calls:

```javascript
// In index.js
const data = await fetch('/api/products/123').then(r => r.json());
```

### Template Variations

Create multiple composition templates:
- `RetailAdHorizontal.jsx` for landscape screens
- `RetailAdVertical.jsx` for portrait displays
- `RetailAdSeasonal.jsx` with holiday theming

## 🎨 Customization Guide

### Changing Colors

Edit `backgroundColor` in data.json. Ensure high contrast with white text.

### Adjusting Timing

Animation timing is controlled in `RetailAd.jsx`:
- Modify `startFrame` props to change when elements appear
- Adjust `duration` to speed up or slow down animations

### Typography

Change font in `RetailAd.jsx`:
```javascript
fontFamily: 'YourFont, sans-serif'
```

Remember to include web-safe fonts or load custom fonts via `@remotion/google-fonts`.

## 🛠️ Troubleshooting

### Video doesn't render
- Check Node.js version (>= 18.0.0)
- Ensure all dependencies are installed: `npm install`

### Animation looks janky
- Check fps setting (should be 30)
- Verify durationInFrames matches your desired length

### Text is cut off
- Adjust padding in `RetailAd.jsx`
- Check maxWidth on promo text

## 📚 Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion API Reference](https://www.remotion.dev/docs/api)
- [React Documentation](https://react.dev)

## 📄 License

MIT

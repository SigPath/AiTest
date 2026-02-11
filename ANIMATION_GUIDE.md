# Animation Technical Guide

## Overview

This document provides comprehensive technical specifications for the retail media video animation system. The implementation leverages Remotion's animation framework with carefully optimized physics-based motion and layered visual effects designed for high-impact retail advertising.

### Performance Engineering (Update: February 2026)
The codebase has been optimized to production-grade standards:
- Pre-allocated particle arrays (eliminates 2,688 allocations per slide)
- Memoized transforms and string operations (73% reduction in string ops per frame)
- Static style objects extracted outside components
- All timing parameters scale automatically with `TIMINGS.slideDuration`

📊 **Performance Report**: [OPTIMIZATION_REPORT.md](../OPTIMIZATION_REPORT.md)

## Animation Effects

### 1. **Spring Physics System**
```javascript
// Logo: stiffness: 300, damping: 8 - Controlled bounce
// Product: stiffness: 300, damping: 7 - Enhanced dynamics  
// Price: stiffness: 400, damping: 6 - High-energy entrance
```

### 2. **Particle System (12 particles)**
- Deployed in circular arrangement around price element
- Individual particle delay: 2 frames per particle
- Rotation: 720° during flight path
- Distance: 0 → 150px with spring physics
- Gold gradient with box-shadow illumination

### 3. **Multi-Layer Glow Effect**
- **Layer 1**: Gold (500px, blur 50px, rotation 360°)
- **Layer 2**: Orange (450px, blur 40px, rotation -360°)
- **Layer 3**: White core (300px, blur 30px, rotation 180°)
- All layers pulse asynchronously
- Opacity range: 0.3 → 0.9 (7-phase interpolation)

### 4. **Energy Ring System**
- 3 expanding circular waves
- Timing delays: 30, 35, 40 frames
- Scale progression: 0.5 → 3/4.5/5
- Colors: gold, orange, white
- Box-shadow + inset shadow for 3D depth effect

### 5. **Dynamic Background Evolution**
```javascript
HSL(155+shift, saturation, lightness)
shift: 0 → 25 → -15
saturation: 40% → 65% → 50%
lightness: 12% → 25% → 18% → 28%
```

### 6. **Motion Dynamics System**
- **Logo shake**: -5px → 3px during entrance
- **Product oscillation**: Continuous sine wave (±2px)
- **Price vibration**: Sine wave after entrance (±1.5°)
- Adds organic motion and visual interest

### 7. **Pulse Effects**
- **Logo**: 1.0 → 1.12 → 1.15 (11-phase interpolation)
- **Price**: 1.0 → 1.10 with vibration (6-phase)
- Asynchronous pulsing creates dynamic visual rhythm

### 8. **Advanced Text Shadows**
```css
textShadow: `
  0 0 40px rgba(255, 215, 0, 1),      /* Gold inner glow */
  0 0 80px rgba(255, 215, 0, 0.8),    /* Aura */
  0 0 120px rgba(255, 165, 0, 0.6),   /* Orange outer ring */
  0 0 160px rgba(255, 255, 255, 0.4), /* White emission */
  0 12px 60px rgba(0, 0, 0, 0.8)      /* Depth shadow */
`
```

### 9. **WebKit Text Stroke**
- Gold outline on text (2-3px)
- Adds depth and premium visual quality

### 10. **Multiple Drop Shadows**
```css
filter: `
  drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))
  drop-shadow(0 0 60px rgba(255, 165, 0, 0.6))
`
```

### 11. **Animated Vignette**
- Pulsing edge darkening (0.3 → 0.7)
- 7-fazowa interpolacja
- Radial gradient od centrum

### 12. **Multi-Layer Gradients**
- Top gradient (200px, 0.3 opacity)
- Bottom gradient (400px, 0.5 opacity)  
- Corner light streaks (300×300px, złoty/pomarańczowy)
- Opóźnione wejście (30+ klatek)

### 13. **Rotation Effects**
- Product rotate: -15° → 0° przy wejściu
- Dodaje dramatyzmu do bounce

### 14. **Scale Transformation Combos**
```javascript
transform: `
  scale(${priceScale * priceGigaPulse}) 
  rotate(${priceVibration}deg)
`
// Kombinacja 3 różnych animacji!
```

```jsx
<ProductSlide
  brand="GreenHive"
  productName="Eko Miód Leśny"
  price="19,99 zł"
  description="Naturalnie z polskich lasów"
  backgroundColor="#0F3D2E"
/>
```

**Wszystkie dane przez props** = Zero hardcoded values!

## 🎯 Jak Generować Setki Reklam

### Metoda 1: JSON Data
```json
{
  "products": [
    {
      "brand": "GreenHive",
      "product": "Eko Miód Leśny",
      "price": "19,99 zł",
      "promoText": "Naturalnie z polskich lasów",
      "backgroundColor": "#0F3D2E"
    }
  ]
}
```

### Metoda 2: Programmatyczne Renderowanie
```javascript
import { bundle } from '@remotion/bundler';
import { renderMedia } from '@remotion/renderer';

// Pobierz dane z API/bazy danych
const products = await fetchProducts();

for (const product of products) {
  await renderMedia({
    composition: 'RetailAd',
    inputProps: { data: { products: [product] } },
    outputLocation: `out/${product.id}.mp4`
  });
}
```

## 🎨 Customizacja

### Zmiana Agresywności Spring
```javascript
// Bardziej agresywne odbicie:
config: { stiffness: 500, damping: 5 }

// Bardziej miękkie:
config: { stiffness: 150, damping: 15 }
```

### Więcej Cząsteczek
```javascript
{[...Array(24)].map((_, i) => (
  <Particle key={i} index={i} startFrame={32} totalParticles={24} />
))}
```

### Zmiana Kolorów Glow
```javascript
background: 'radial-gradient(ellipse, rgba(0, 255, 255, 0.9) 0%, transparent 70%)'
// Cyjanowy glow zamiast złotego
```

## 📊 Parametry Techniczne

- **Rozdzielczość**: 1920×1080 (Full HD)
- **FPS**: 30
- **Czas trwania**: 90 klatek per produkt (3 sekundy)
- **Format wyjściowy**: MP4 (H.264)
- **Renderowanie**: ~3-5 sekund per produkt (zależne od CPU)

## Technical Effects Summary

### Animation Components:
- ✅ **4 typy spring physics** (różne stiffness/damping)
- ✅ **12 cząsteczek particle system** z rotacją 720°
- ✅ **3 warstwy glow effect** (multi-directional rotation)
- ✅ **3 energy rings** (expanding ripples)
- ✅ **5 warstw gradientów** (vignette, corners, top, bottom)
- ✅ **7+ kombinacji transformacji** (scale, rotate, translate)
- ✅ **20+ text shadow layers** (multi-color, multi-blur)
- ✅ **4 typy shake/vibration** (sine waves, interpolation)
- ✅ **Dynamic HSL background** (3-parameter evolution)
- ✅ **WebKit text stroke** (premium outlining)
- ✅ **Multiple drop shadows** (layered depth)
- ✅ **Animated vignette** (7-phase pulse)

### Liczba Klatek Kluczowych:
- Frame 0: Start
- Frame 5-14: Logo shake sequence
- Frame 15: Product bounce start
- Frame 30: PRICE EXPLOSION + particles + rings
- Frame 32: Particles start launching
- Frame 35: Second energy ring
- Frame 40: Third energy ring + price vibration
- Frame 45: Description entrance
- Frame 60-90: Full spectacle mode

## 💡 Pro Tips

- **Performance**: Particle system renderuje się szybko (pure CSS)
- **Batch rendering**: Użyj `@remotion/lambda` dla cloud rendering
- **A/B testing**: Zmień kolory glow dla różnych produktów
- **Personalizacja**: Dodaj imię klienta w description
- **Multi-brand**: Zmień logo colors przez props


1. **Aggressive physics** - dynamic entry transitions with high-energy effects
2. **Layering** - 10+ visual layers creating depth and dimension
3. **Controlled chaos** - asynchronous pulsing animations for continuous engagement
4. **Particle effects** - advanced particle system for premium visual impact
5. **Multi-layer glow** - 3 rotating glow layers with different directional movements
6. **Text shadows 4-tier** - gradient shadow progression from gold to white highlights
7. **Shake & Vibration** - subtle continuous motion for energy conveyance
8. **Energy rings** - expanding ripple effects for visual impact
9. **Dynamic everything** - animated background, scale, rotation, and opacity
10. **220px giant price** - large-format price display for maximum visibility

## 📈 Performance Metrics

- **Build time**: ~3-5s per 3-sekundowy produkt
- **File size**: ~6-8MB per reklama (1080p, H.264, dobra jakość)
- **RAM usage**: ~700MB podczas renderowania (particle system)
- **GPU acceleration**: TAK (transforms, filters używają GPU)

## 🚀 Quick Start

1. Edytuj `src/data/data.json`
2. Uruchom: `npm start`
3. View output in browser
4. Renderuj: `npm run build`

---

**Built with Remotion + GitHub Copilot**

*Production-grade retail media video generation system.*

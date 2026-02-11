# Retail Media Video Generator

**Production-Optimized MVP** - High-performance programmatic video generation for retail advertising.

## Overview

Generates professional 9-second Full HD (1920×1080) video advertisements for retail media displays with advanced visual effects.

### Performance Characteristics (v2.0.0, February 2026)
- 🚀 **99.6% reduction in allocations** (2,700 → 12 per slide)
- ⚡ **35-45% performance improvement** through memory optimization
- 💎 **Production-grade architecture** with useMemo, static styles, calculated constants
- 📊 **Stable build times**: 25-168ms
- 🔧 **Zero breaking changes** - 100% backward compatible

### Visual Features
- **Advanced spring physics**: Configurable stiffness and damping parameters
- **12-particle animation system**: Circular arrangement with independent timing
- **3-layer glow effects**: Multi-directional rotating illumination
- **Energy wave animations**: Three expanding circular rings
- **Dynamic HSL background**: Real-time color evolution
- **Multi-level text shadows**: Depth and premium aesthetics
- **Continuous motion effects**: Sine wave-based vibration and pulsing

**Default content**: 3 product slides (3 seconds each):
- Eko Miód Leśny (19,99 zł)
- Miód Akacjowy Premium (9,99 zł)
- Pizza Margaritta (14,99 zł)

## 📁 Struktura Projektu

```
src/
 ├─ constants.js        # 🎯 Globalne stałe (kolory, timings, spring configs)
 ├─ compositions/
 │   └─ RetailAd.jsx    # Main composition (clean 60 lines)
 ├─ components/
 │   ├─ effects/        # ✨ Efekty wizualne (Particle, Glow, EnergyRing)
 │   │   ├── Particle.jsx
 │   │   ├── SuperGlowEffect.jsx
 │   │   ├── EnergyRing.jsx
 │   │   └── index.js
 │   └─ ui/             # 🎨 Komponenty UI (Logo, Title, Price, etc.)
 │       ├── DynamicBackground.jsx
 │       ├── BrandLogo.jsx
 │       ├── ProductTitle.jsx
 │       ├── AnimatedPrice.jsx
 │       ├── ProductDescription.jsx
 │       └── index.js
 ├─ data/
 │   └─ data.json       # Dane produktów (JSON) - łatwe do automatyzacji
 └─ index.js            # Rejestracja kompozycji Remotion
```

📖 **Szczegóły struktury**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)  
⚡ **Raport optymalizacji**: [OPTIMIZATION_REPORT.md](OPTIMIZATION_REPORT.md)

## 🎨 Efekty Animacyjne

###Animation Timeline

### Frame Sequence
```
Frame 0-12:   Logo entrance with shake effect (spring: stiffness 300, damping 8)
Frame 15-30:  Product name animation with rotation transition (-15° → 0°)
Frame 30-32:  Price animation initiation
Frame 30-40:  12 particles deploy in circular pattern (720° rotation)
Frame 30-40:  3 energy rings expand sequentially (delays: 30, 35, 40)
Frame 40-90:  Price vibration and pulse effects (continuous sine waves)
Frame 45-58:  Description slide-up animation with scale
Frame 60-90:  Full animation ensemble active
```

### Technical Details

#### Particle System
- 12 particles arranged in 360° circular pattern (30° spacing)
- Distance interpolation: 0 → 150px with spring physics
- Rotation range: 0 → 720° (two complete rotations)
- Opacity curve: 0 → 1 → 0 (fade in/out)
- Gradient: Gold to orange
- Box-shadow: 20px glow effect

#### Multi-Layer Glow (3 layers)
1. **Gold layer** (500px): 360° rotation, 50px blur, max opacity 0.9
2. **Orange layer** (450px): -360° rotation, 40px blur, max opacity 0.7
3. **White core** (300px): 180° rotation, 30px blur, max opacity 0.6

#### Energy Rings
- Ring 1: Delay 30 frames, scale 0.5 → 4, gold color
- Ring 2: Delay 35 frames, scale 0.5 → 4.5, orange color
- Ring 3: Delay 40 frames, scale 0.5 → 5, white color
- All rings: box-shadow + inset shadow for depth

#### Text Shadow Effects
```css
/* Price - 4-level shadow depth */
0 0 40px gold,           /* Inner glow */
0 0 80px gold,           /* Aura */  
0 0 120px orange,        /* Outer ring */
0 0 160px white          /* Emission */
```

📖 Getting Started

### Installation

```bash
npm install
```

### Development Mode

Launch Remotion Studio for live preview:

```bash
npm start
```

Opens a browser with the player where you can scrub through frames and preview animations in real-time.

### Rendering

Generate final video output:

Wyrenderuj finalne wideo do pliku MP4:

```bash
npm run build
```

Wyjście: `out/video.mp4` (Full HD, 9 sekund, 30fps)

**Alternatywnie**: kliknij dwukrotnie `render.bat` w folderze projektu.

## 📊 Format Danych

Edytuj `src/data/data.json`, aby zmienić zawartość wideo. Struktura obsługuje wiele produktów w formacie array:

```json
{
  "products": [
    {
      "brand": "GreenHive",
      "product": "Eko Miód Leśny",
      "price": "19,99 zł",
      "promoText": "Naturalnie z polskich lasów",
      "backgroundColor": "#0F3D2E"
    },
    {
      "brand": "GreenHive",
      "product": "Miód Akacjowy Premium",
      "price": "9,99 zł",
      "promoText": "Delikatny smak, pełnia natury",
      "backgroundColor": "#2E5A3D"
    },
    {
      "brand": "Bella Italia",
      "product": "Pizza Margaritta",
      "price": "14,99 zł",
      "promoText": "Klasyczna pizza z San Marzano",
      "backgroundColor": "#8B2C2C"
    }
  ]
}
```

**Aby dodać kolejne produkty:** po prostu dodaj więcej obiektów do array `products` - żadnych zmian w kodzie!

**Dla kompatybilności wstecznej:** Stara struktura (pojedynczy produkt) również działa.

## 🎬 Timeline Animacji (dla każdego slajdu)

Każdy produkt ma 90 klatek (3 sekundy @ 30fps):

- **Klatka 0-30**: Nazwa marki fade in
- **Klatka 15-45**: Nazwa produktu pojawia się
- **Klatka 30-60**: Cena z emphasis (kluczowy moment)
- **Klatka 45-75**: Tekst promocyjny fade in
- **Klatka 75-90**: Hold (czytelność)

**Całość**: 270 klatek = 9 sekund (3 produkty × 3 sekundy)

## 🏗️ Zasady Architektury

### Projekt Komponentów
- **Małe i reużywalne**: Każdy komponent ma jedną odpowiedzialność
- **Timing jako props**: Czas animacji kontrolowany przez props, nie zahardkodowany
- **Nadpisywanie stylów**: Komponenty akceptują props `style` dla customizacji

### Data-Driven (Sterowane Danymi)
- Cała zawartość pochodzi z formatów danych (JSON)
- Komponenty nigdy nie zawierają logiki biznesowej
- Łatwe rozszerzenie do renderowania wsadowego (batch rendering)

### Profesjonalny Ruch
- Animacje oparte na klatkach: `interpolate()` i `useCurrentFrame()`
- Fizyka spring dla naturalnego akcentu (komponent `Price`)
- Przesunięty timing tworzy rytm wizualny

## 📈 Skalowanie do Produkcji

### Renderowanie Wsadowe (Batch Rendering)

Aby wygenerować wiele wideo jednocześnie:

1. **Przygotuj pliki danych**: Stwórz wiele plików JSON w `src/data/`
2. **Zarejestruj kompozycje**: Dynamicznie rejestruj kompozycje w `index.js`
3. **Automatyczne renderowanie**:

```javascript
// Przykład skryptu batch render
const { bundle } = require('@remotion/bundler');
const { renderMedia } = require('@remotion/renderer');

const compositions = [
  { id: 'RetailAd_1', data: require('./data/produkt1.json') },
  { id: 'RetailAd_2', data: require('./data/produkt2.json') },
  // ... więcej produktów
];

// Renderuj każdą kompozycję
for (const comp of compositions) {
  await renderMedia({
    composition: comp.id,
    inputProps: { data: comp.data },
    outputLocation: `out/${comp.id}.mp4`,
  });
}
```

### Integracja z API

Zamień statyczny JSON na wywołania API:

```javascript
// W index.js
const data = await fetch('/api/products/123').then(r => r.json());
```

### Warianty Szablonów

Stwórz wiele szablonów kompozycji:
- `RetailAdHorizontal.jsx` - dla ekranów poziomych
- `RetailAdVertical.jsx` - dla wyświetlaczy pionowych
- `RetailAdSeasonal.jsx` - z motywami sezonowymi

## 🎨 Przewodnik Dostosowywania

### Zmiana Kolorów

Edytuj `backgroundColor` w data.json. Upewnij się, że kontrast z białym tekstem jest wysoki.

### Dostosowanie Timingu

Timing animacji jest kontrolowany w `RetailAd.jsx`:
- Modyfikuj props `startFrame`, aby zmienić moment pojawienia się elementów
- Dostosuj `duration`, aby przyspieszyć lub spowolnić animacje

### Zmiana Czasu Trwania Slajdów

W `RetailAd.jsx` zmień `durationInFrames` w `<Sequence>`:
```javascript
// 3 sekundy = 90 klatek @ 30fps
// 5 sekund = 150 klatek @ 30fps
<Sequence from={0} durationInFrames={150}>
```

### Typografia

Zmień czcionkę w `RetailAd.jsx`:
```javascript
fontFamily: 'TwojaCzcionka, sans-serif'
```

Pamiętaj o użyciu bezpiecznych czcionek webowych lub załaduj niestandardowe przez `@remotion/google-fonts`.

## 🛠️ Rozwiązywanie Problemów

### Wideo się nie renderuje
- Sprawdź wersję Node.js (>= 18.0.0): `node --version`
- Upewnij się, że wszystkie zależności są zainstalowane: `npm install`

### Animacje wyglądają rwanie
- Sprawdź ustawienie fps (powinno być 30)
- Zweryfikuj czy `durationInFrames` jest zgodne z zamierzoną długością

### Tekst jest obcięty
- Dostosuj padding w `RetailAd.jsx`
- Sprawdź `maxWidth` na tekście promocyjnym

### Hot reload nie działa
- Uruchom ponownie `npm start`
- Wyczyść cache: usuń folder `node_modules/.cache/`

## 📚 Dokumentacja

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion API Reference](https://www.remotion.dev/docs/api)
- [React Documentation](https://react.dev)

## 🎯 Technologie

- **Node.js** - środowisko uruchomieniowe
- **React** - biblioteka UI
- **Remotion** - framework do programowego tworzenia wideo
- **JavaScript** - język programowania

## 📄 Licencja

MIT

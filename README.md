# �💥 Generator Wideo dla Retail Media - ULTRA EXTREME EDITION 💥🔥

MVP gotowe do produkcji - programatyczne generowanie **EKSTREMALNIE SPEKTAKULARNYCH** wideo reklamowych.

## 🎯 Przegląd

Generuje profesjonalne 9-sekundowe wideo reklamowe Full HD (1920x1080) dla ekranów retail media z efektami wizualnymi.
**🔥 ULTRA-EKSTREMALNE FUNKCJE:**
- 💥 **Ultra-Aggressive Spring**: Logo i produkty EKSPLODUJĄ na ekran (stiffness: 300-400, damping: 6-8)
- ✨ **12-Particle System**: Cząsteczki wylatują wokół ceny z rotacją 720°
- 🌟 **3-Layer Super Glow**: Multi-directional rotating light show
- 💫 **Energy Rings**: 3 rozprzestrzeniające się fale energii
- 🎨 **Dynamic HSL Evolution**: Tło zmienia 3 parametry jednocześnie
- 🌀 **Shake & Vibration**: Continuous motion dla max energii
- 💎 **4-Level Text Shadows**: Od złota przez pomarańcz do białej eksplozji
- 📐 **Multi-Transform Combos**: Scale × Rotate × Translate jednocześnie
- 🎭 **Animated Vignette**: Pulsujące brzegi ekranu
- ⚡ **220px MEGA Price**: Największa cena w historii retail ads

**Film zawiera 3 slajdy produktów** (po 3 sekundy każdy):
- Eko Miód Leśny (19,99 zł)
- Miód Akacjowy Premium (9,99 zł)
- Pizza Margaritta (14,99 zł)

## 📁 Struktura Projektu

```
src/
 ├─ compositions/
 │   └─ RetailAd.jsx    # 🔥 GŁÓWNA KOMPOZYCJA - Professional Animation Engine
 ├─ data/
 │   └─ data.json       # Dane produktu (JSON) - łatwe do automatyzacji
 └─ index.js            # Rejestracja kompozycji Remotion
```

## 🎨 Efekty Animacyjne

### Sekwencja Klatek (Epic Timeline)
```
Frame 0-12:   Logo WPADA z góry + shake effect (stiffness: 300)
Frame 15-30:  Nazwa produktu EKSPLODUJE z rotacją -15° → 0°
Frame 30-32:  🔥 PRICE EXPLOSION START - najważniejszy moment
Frame 30-40:  12 cząsteczek wylatuje (720° rotation każda)
Frame 30-35-40: 3 energy rings rozprzestrzeniają się (max scale: 5x)
Frame 40-90:  Cena WIBRUJE i PULSUJE (continuous sine waves)
Frame 45-58:  Opis slide-up + scale (dramatyczne wejście)
Frame 60-90:  FULL SPECTACLE MODE - wszystko świeci i pulsuje
```

### 🔥 Szczegóły Efektów

#### Particle System
- 12 cząsteczek w układzie kołowym (360° / 12 = 30° każda)
- Odległość: 0 → 150px (spring physics)
- Rotacja: 0 → 720° (2 pełne obroty)
- Opacity: 0 → 1 → 0 (fade in/out)
- Gradient: złoty → pomarańczowy
- Box-shadow: 20px glow

#### Multi-Layer Glow (3 warstwy)
1. **Złota** (500px): Rotacja 360°, blur 50px, opacity max 0.9
2. **Pomarańczowa** (450px): Rotacja -360°, blur 40px, opacity max 0.7
3. **Biała** (300px): Rotacja 180°, blur 30px, opacity max 0.6

#### Energy Rings
- Ring 1: Delay 30, scale 0.5 → 4, złoty
- Ring 2: Delay 35, scale 0.5 → 4.5, pomarańczowy
- Ring 3: Delay 40, scale 0.5 → 5, biały
- Wszystkie z box-shadow + inset shadow

#### Text Effects
```css
/* Cena - 4 poziomy cienia */
0 0 40px gold,           /* Blask */
0 0 80px gold,           /* Aura */  
0 0 120px orange,        /* Otoczka */
0 0 160px white          /* Eksplozja */
```

📖 **Pełna dokumentacja techniczna**: [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md)

## 🚀 Jak Zacząć

### Instalacja

```bash
npm install
```

### Tryb Deweloperski

Uruchom Remotion Studio, aby zobaczyć podgląd wideo na żywo:

```bash
npm start
```

Otworzy się przeglądarka z odtwarzaczem, gdzie możesz przewijać klatki i widzieć animacje w czasie rzeczywistym.

### Renderowanie

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

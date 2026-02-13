# Generator Wideo dla Retail Media

**Zoptymalizowane MVP dla Produkcji** - Wysokowydajne programatyczne generowanie wideo dla reklam detalicznych.

## Przegląd

Generuje profesjonalne 9-sekundowe reklamy wideo w Full HD (1920×1080) dla ekranów retail media z zaawansowanymi efektami wizualnymi.

### Charakterystyka Wydajności (v2.0.0, Luty 2026)
- 🚀 **99,6% redukcja alokacji pamięci** (2 700 → 12 na slajd)
- ⚡ **35-45% wzrost wydajności** dzięki optymalizacji pamięci
- 💎 **Architektura produkcyjna** z useMemo, statycznymi stylami, wyliczonymi stałymi
- 📊 **Stabilne czasy budowania**: 25-168ms
- 🔧 **Zero zmian łamiących kompatybilność** - 100% wstecznie kompatybilne

### Funkcje Wizualne
- **Zaawansowana fizyka sprężyn**: Konfigurowalna sztywność i parametry tłumienia
- **System 12 cząsteczek**: Ułożenie kołowe z niezależnym timingiem
- **3-warstwowe efekty glow**: Wielokierunkowe obracające się oświetlenie
- **Animacje fal energii**: Trzy rozszerzające się pierścienie
- **Dynamiczne tło HSL**: Ewolucja kolorów w czasie rzeczywistym
- **Wielopoziomowe cienie tekstu**: Głębia i estetyka premium
- **Ciągłe efekty ruchu**: Wibracje i pulsacje oparte na falach sinusoidalnych

**Domyślna zawartość**: 4 slajdy produktowe (po 3 sekundy każdy):
- Eko Miód Leśny (19,99 zł)
- Miód Akacjowy Premium (9,99 zł)
- Pizza Margaritta (14,99 zł)
- Chleb Razowy Bio (7,99 zł) - PROMOCJA!

## 📁 Struktura Projektu

```
src/
 ├─ constants.js        # 🎯 Globalne stałe (kolory, timings, spring configs)
 ├─ compositions/
 │   └─ RetailAd.jsx    # Główna kompozycja (czyste 60 linii)
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

# Konfiguracja Dockera 🐳
Dockerfile               # Multi-stage build (dev + production)
.dockerignore           # Wykluczenie zbędnych plików
docker-compose.yml      # Orchestracja kontenerów
DOCKER.md              # Dokumentacja użycia Dockera
```

📖 **Szczegóły struktury**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)  
⚡ **Raport optymalizacji**: [OPTIMIZATION_REPORT.md](OPTIMIZATION_REPORT.md)

## 🎨 Efekty Animacyjne

### Oś Czasu Animacji

### Sekwencja Klatek
```
Klatka 0-12:   Wejście logo z efektem shake (spring: sztywność 300, tłumienie 8)
Klatka 15-30:  Animacja nazwy produktu z rotacją (-15° → 0°)
Klatka 30-32:  Rozpoczęcie animacji ceny
Klatka 30-40:  12 cząsteczek rozmieszcza się w kole (obrót 720°)
Klatka 30-40:  3 pierścienie energii rozszerzają się sekwencyjnie (opóźnienia: 30, 35, 40)
Klatka 40-90:  Wibracje i pulsacje ceny (ciągłe fale sinusoidalne)
Klatka 45-58:  Animacja opisu przesuwającego się w górę ze skalowaniem
Klatka 60-90:  Pełny zespół animacji aktywny
```

### Szczegóły Techniczne

#### System Cząsteczek
- 12 cząsteczek rozmieszczonych w kole 360° (odstęp 30°)
- Interpolacja odległości: 0 → 150px z fizyką sprężyn
- Zakres rotacji: 0 → 720° (dwa pełne obroty)
- Krzywa przezroczystości: 0 → 1 → 0 (zanikanie)
- Gradient: od złota do pomarańczy
- Box-shadow: efekt świecenia 20px

#### Wielowarstwowy Glow (3 warstwy)
1. **Warstwa złota** (500px): obrót 360°, rozmycie 50px, maks. przezroczystość 0.9
2. **Warstwa pomarańczowa** (450px): obrót -360°, rozmycie 40px, maks. przezroczystość 0.7
3. **Białe jądro** (300px): obrót 180°, rozmycie 30px, maks. przezroczystość 0.6

#### Pierścienie Energii
- Pierścień 1: Opóźnienie 30 klatek, skala 0.5 → 4, kolor złoty
- Pierścień 2: Opóźnienie 35 klatek, skala 0.5 → 4.5, kolor pomarańczowy
- Pierścień 3: Opóźnienie 40 klatek, skala 0.5 → 5, kolor biały
- Wszystkie pierścienie: box-shadow + inset shadow dla głębi

#### Efekty Cieni Tekstu
```css
/* Cena - 4-poziomowa głębia cienia */
0 0 40px gold,           /* Wewnętrzne świecenie */
0 0 80px gold,           /* Aura */  
0 0 120px orange,        /* Zewnętrzny pierścień */
0 0 160px white          /* Emisja */
```

📖 Pierwsze Kroki

### Instalacja

```bash
npm install
```

### Tryb Deweloperski

Uruchom Remotion Studio do podglądu na żywo:

```bash
npm start
```

Otwiera przeglądarkę z odtwarzaczem, w którym możesz przewijać klatki i oglądać animacje w czasie rzeczywistym.

### Renderowanie

Wygeneruj finalne wideo:

Wyrenderuj finalne wideo do pliku MP4:

```bash
npm run build
```

Wyjście: `out/video.mp4` (Full HD, 12 sekund, 30fps)

**Alternatywnie**: kliknij dwukrotnie `render.bat` w folderze projektu.

### 🐳 Docker (Opcjonalnie)

Jeśli preferujesz Docker, projekt zawiera pełne wsparcie konteneryzacji:

```bash
# Development - Remotion Studio w kontenerze
docker-compose up remotion-dev

# Production - Renderowanie wideo
docker-compose run --rm remotion-render
```

📖 **Szczegółowa dokumentacja Dockera**: [DOCKER.md](DOCKER.md)

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

**Całość**: 360 klatek = 12 sekund (4 produkty × 3 sekundy)

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

# Przewodnik Techniczny Animacji

## Przegląd

Ten dokument zawiera kompleksowe specyfikacje techniczne dla systemu animacji wideo retail media. Implementacja wykorzystuje framework animacji Remotion z dokładnie zoptymalizowaną fizyką ruchu i warstwowymi efektami wizualnymi zaprojektowanymi dla reklam detalicznych o wysokim wpływie.

### Inżynieria Wydajności (Aktualizacja: Luty 2026)
Kod został zoptymalizowany do standardów produkcyjnych:
- Wstępnie przydzielone tablice cząsteczek (eliminuje 2688 alokacji na slajd)
- Zmemoizowane transformacje i operacje na stringach (73% redukcja operacji stringowych na klatkę)
- Obiekty statycznych stylów wyciągnięte poza komponenty
- Wszystkie parametry czasu skalują się automatycznie z `TIMINGS.slideDuration`

📊 **Raport wydajności**: [OPTIMIZATION_REPORT.md](../OPTIMIZATION_REPORT.md)

## Efekty Animacyjne

### 1. **System Fizyki Sprężyn**
```javascript
// Logo: sztywność: 300, tłumienie: 8 - Kontrolowane odbicie
// Produkt: sztywność: 300, tłumienie: 7 - Zwiększona dynamika  
// Cena: sztywność: 400, tłumienie: 6 - Wejście wysokoenergetyczne
```

### 2. **System Cząsteczek (12 cząsteczek)**
- Rozmieszczone w układzie kołowym wokół elementu ceny
- Indywidualne opóźnienie cząsteczki: 2 klatki na cząsteczkę
- Rotacja: 720° podczas ścieżki lotu
- Odległość: 0 → 150px z fizyką sprężyn
- Złoty gradient z oświetleniem box-shadow

### 3. **Wielowarstwowy Efekt Glow**
- **Warstwa 1**: Złoto (500px, rozmycie 50px, rotacja 360°)
- **Warstwa 2**: Pomarańczowy (450px, rozmycie 40px, rotacja -360°)
- **Warstwa 3**: Białe jądro (300px, rozmycie 30px, rotacja 180°)
- Wszystkie warstwy pulsują asynchronicznie
- Zakres przezroczystości: 0.3 → 0.9 (7-fazowa interpolacja)

### 4. **System Pierścieni Energii**
- 3 rozszerzające się fale kołowe
- Opóźnienia czasowe: 30, 35, 40 klatek
- Progresja skalowania: 0.5 → 3/4.5/5
- Kolory: złoty, pomarańczowy, biały
- Box-shadow + inset shadow dla efektu głębi 3D

### 5. **Dynamiczna Ewolucja Tła**
```javascript
HSL(155+shift, saturation, lightness)
shift: 0 → 25 → -15
saturation: 40% → 65% → 50%
lightness: 12% → 25% → 18% → 28%
```

### 6. **System Dynamiki Ruchu**
- **Shake logo**: -5px → 3px podczas wejścia
- **Oscylacja produktu**: Ciągła fala sinusoidalna (±2px)
- **Wibracje ceny**: Fala sinusoidalna po wejściu (±1.5°)
- Dodaje organiczny ruch i zainteresowanie wizualne

### 7. **Efekty Pulsowania**
- **Logo**: 1.0 → 1.12 → 1.15 (11-fazowa interpolacja)
- **Cena**: 1.0 → 1.10 z wibracjami (6 faz)
- Asynchroniczne pulsowanie tworzy dynamiczny wizualny rytm

### 8. **Zaawansowane Cienie Tekstowe**
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
- Złoty kontur na tekście (2-3px)
- Dodaje głębię i wizualną jakość premium

### 10. **Wielokrotne Drop Shadows**
```css
filter: `
  drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))
  drop-shadow(0 0 60px rgba(255, 165, 0, 0.6))
`
```

### 11. **Animowane Vignette**
- Pulsujące przyciemnienie krawędzi (0.3 → 0.7)
- 7-fazowa interpolacja
- Radialny gradient od centrum

### 12. **Wielowarstwowe Gradienty**
- Górny gradient (200px, przezroczystość 0.3)
- Dolny gradient (400px, przezroczystość 0.5)  
- Narożne smugi świetlne (300×300px, złoty/pomarańczowy)
- Opóźnione wejście (30+ klatek)

### 13. **Efekty Rotacji**
- Rotacja produktu: -15° → 0° przy wejściu
- Dodaje dramatyzmu do odbicia

### 14. **Kombinacje Transformacji Skali**
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

## Podsumowanie Efektów Technicznych

### Komponenty Animacji:
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
- ✅ **Wielokrotne drop shadows** (warstwowa głębia)
- ✅ **Animowane vignette** (7-fazowy puls)

### Liczba Klatek Kluczowych:
- Klatka 0: Start
- Klatka 5-14: Sekwencja shake logo
- Klatka 15: Start odbicia produktu
- Klatka 30: START ANIMACJI CENY + cząsteczki + pierścienie
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


1. **Agresywna fizyka** - dynamiczne przejścia wejściowe z wysokoenergetycznymi efektami
2. **Warstwowość** - 10+ warstw wizualnych tworzących głębię i wymiary
3. **Kontrolowany chaos** - asynchroniczne pulsujące animacje dla ciągłego zaangażowania
4. **Efekty cząsteczkowe** - zaawansowany system cząsteczek dla wizualnego oddziaływania premium
5. **Wielowarstwowy glow** - 3 obracające się warstwy glow z różnymi kierunkami ruchu
6. **Cienie tekstowe 4-poziomowe** - gradientowa progresja cieni od złota do białych akcentjów
7. **Shake & Vibracja** - subtelny ciągły ruch przekazujący energię
8. **Pierścienie energii** - rozszerzające się efekty fal dla wizualnego wpływu
9. **Dynamiczne wszystko** - animowane tło, skala, rotacja i przezroczystość
10. **Gigantyczna cena 220px** - duży format wyświetlania ceny dla maksymalnej widoczności

## 📈 Performance Metrics

- **Build time**: ~3-5s per 3-sekundowy produkt
- **File size**: ~6-8MB per reklama (1080p, H.264, dobra jakość)
- **RAM usage**: ~700MB podczas renderowania (particle system)
- **GPU acceleration**: TAK (transforms, filters używają GPU)

## 🚀 Quick Start

1. Edytuj `src/data/data.json`
2. Uruchom: `npm start`
3. Oglądaj wynik w przeglądarce
4. Renderuj: `npm run build`

---

**Zbudowane z Remotion + GitHub Copilot**

*Profesjonalny system generowania wideo retail media.*

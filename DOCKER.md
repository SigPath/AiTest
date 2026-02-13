# Docker - Instrukcja użycia

## 📋 Wymagania

- Docker Desktop (macOS, Windows) lub Docker Engine (Linux)
- Docker Compose (zazwyczaj dołączony do Docker Desktop)

## 🚀 Szybki start

### Development - Remotion Studio

Uruchom Remotion Studio w przeglądarce:

```bash
docker-compose up remotion-dev
```

Otwórz przeglądarkę na: `http://localhost:3000`

### Production - Renderowanie wideo

Zrenderuj wideo do pliku:

```bash
docker-compose run --rm remotion-render
```

Wideo zostanie zapisane w folderze `out/`

## 🔧 Zaawansowane użycie

### Budowanie obrazu

```bash
# Development
docker build --target development -t remotion-dev .

# Production
docker build --target production -t remotion-prod .
```

### Renderowanie z niestandardowymi parametrami

```bash
# Render do konkretnego pliku
docker-compose run --rm remotion-render npm run build

# Render z custom konfiguracją
docker-compose run --rm remotion-render \
  npx remotion render RetailAd out/custom-video.mp4 --codec h264
```

### Development z hot-reload

Kod źródłowy jest automatycznie montowany, więc zmiany w plikach są widoczne natychmiast bez restartu kontenera.

```bash
# Uruchom w tle
docker-compose up -d remotion-dev

# Zobacz logi
docker-compose logs -f remotion-dev

# Zatrzymaj
docker-compose down
```

## 🐛 Debugowanie

### Sprawdź logi kontenera

```bash
docker-compose logs remotion-dev
```

### Wejdź do kontenera

```bash
docker-compose exec remotion-dev sh
```

### Sprawdź zainstalowane zależności

```bash
docker-compose exec remotion-dev npm list
```

## 🧹 Czyszczenie

### Usuń kontenery i volumes

```bash
docker-compose down -v
```

### Usuń obrazy

```bash
docker rmi remotion-dev remotion-prod
```

### Pełne czyszczenie Dockera (ostrożnie!)

```bash
docker system prune -a --volumes
```

## 📦 Struktura

- **Dockerfile**: Multi-stage build z osobnymi targetami dla dev i prod
- **docker-compose.yml**: Orchestracja kontenerów
- **.dockerignore**: Wykluczenie niepotrzebnych plików z obrazu

## 🔐 Bezpieczeństwo

- Node_modules są persystowane w Docker volume (szybsza instalacja)
- Kod źródłowy w dev jest montowany (nie kopiowany)
- Production build używa `npm ci --only=production`

## ⚡ Porty

- **3000**: Remotion Studio (development)

## 🌍 Zmienne środowiskowe

Możesz dodać plik `.env` z własnymi zmiennymi:

```env
NODE_ENV=development
REMOTION_TIMEOUT=30000
```

I zmodyfikować `docker-compose.yml`:

```yaml
env_file:
  - .env
```

## 💡 Wskazówki

1. Pierwsze uruchomienie zajmuje więcej czasu (pobieranie obrazów)
2. Kolejne starty są szybsze dzięki cache
3. Używaj `docker-compose` do zarządzania projektami
4. Output z renderingu trafia do folderu `./out` na hoście

# 💰 Azubi-Förderung Landing Page

Eine moderne, responsive Landing Page für Azubi-Förderungsberatung, optimiert für Conversion und Mobile-First Design.

## 🚀 Features

- **Responsive Design**: Mobile-First Ansatz mit Touch-optimierten CTAs
- **Modern UI**: Sauberes Design mit Blau/Grün/Orange Farbschema
- **Performance-optimiert**: Minimales CSS/JS, optimierte Ladezeiten
- **SEO-ready**: Semantic HTML, Meta-Tags, Alt-Texte
- **Analytics-ready**: CTA-Tracking für Google Analytics und Facebook Pixel
- **Docker-basiert**: Vollständig containerisiert für einfaches Deployment
- **Coolify-kompatibel**: Direkt deploybar auf Coolify-Plattformen

## 📁 Projektstruktur

```
azubi-foerderung/
├── Dockerfile                 # Multi-stage Docker Build
├── docker-compose.yml         # Lokale Entwicklung
├── nginx.conf                 # Nginx Konfiguration
├── README.md                  # Diese Datei
├── index.html                 # Haupt-HTML Datei
├── css/
│   └── style.css             # Responsive CSS Styles
├── js/
│   └── main.js               # JavaScript Funktionalität
└── images/                   # Platzhalter für Bilder
```

## 🛠 Technischer Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid/Flexbox, CSS Custom Properties
- **Fonts**: Inter (Google Fonts)
- **Server**: Nginx Alpine
- **Container**: Docker mit Multi-stage Build
- **Deployment**: Docker Compose / Coolify

## 🚀 Lokale Entwicklung

### Voraussetzungen

- Docker & Docker Compose installiert
- Git installiert

### Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd azubi-foerderung
```

2. Mit Docker Compose starten:
```bash
docker-compose up -d
```

3. Website aufrufen:
```
http://localhost:3001
```

**Hinweis**: Falls Port 3001 bereits belegt ist, können Sie den Port in der `docker-compose.yml` anpassen (z.B. `"3002:8080"`).

### Ohne Docker (für Entwicklung)

1. Lokalen Webserver starten (z.B. mit Python):
```bash
# Python 3
python -m http.server 8000

# Oder mit Node.js Live Server
npx live-server
```

2. Website aufrufen:
```
http://localhost:8000
```

## 🐳 Docker Deployment

### Lokaler Build und Test

```bash
# Image bauen
docker build -t azubi-foerderung .

# Container starten
docker run -p 3001:8080 azubi-foerderung

# Mit Health Check testen
docker run -p 3001:8080 --health-cmd="wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1" azubi-foerderung
```

### Production Deployment

```bash
# Production Build
docker build -t azubi-foerderung:latest .

# Mit Docker Compose (Production)
docker-compose -f docker-compose.yml up -d
```

## ☁️ Coolify Deployment

### Automatisches Deployment

1. **Repository Setup**:
   - Repository in Coolify hinzufügen
   - Branch: `main` oder gewünschter Branch
   - Build Pack: `Dockerfile`

2. **Port Configuration**:
   - **Wichtig**: Container lauscht sowohl auf Port 80 als auch 8080
   - Coolify kann entweder Port 80 oder 8080 verwenden
   - External Port: `80` oder `443` (mit SSL)

3. **Health Check**:
   - Path: `/health`
   - Interval: 30s
   - **Automatisch**: Health Check funktioniert auf beiden Ports (80 und 8080)

4. **Environment Variables** (optional):
   ```
   # Keine speziellen Variablen erforderlich
   NGINX_HOST=your-domain.com
   ```

### Troubleshooting Coolify

Falls das Deployment fehlschlägt:

1. **Health Check Issues**: Der Container unterstützt sowohl Port 80 als auch 8080
2. **Nginx Config**: Verwendet Standard nginx.conf mit custom server block
3. **Container Logs**: Prüfen Sie die Logs in Coolify für detaillierte Fehlerinfos

### Manuelles Deployment

```bash
# Image zu Registry pushen
docker tag azubi-foerderung:latest your-registry/azubi-foerderung:latest
docker push your-registry/azubi-foerderung:latest

# In Coolify verwenden
```

## 📱 Content-Struktur

Die Landing Page enthält folgende Sections:

1. **Hero Section**: Hauptversprechen mit CTA
2. **Problem Section**: Problem-Darstellung mit Beispiel
3. **Process Section**: 3-Schritte Prozess
4. **About Section**: Über Jan mit Vorteilen
5. **Testimonials**: Kundenbewertungen
6. **Final CTA**: Abschließender Call-to-Action
7. **Footer**: Kontakt und rechtliche Links

## 🎨 Design-System

### Farben

```css
--primary-blue: #2563eb
--primary-green: #10b981
--accent-orange: #f97316
--accent-turquoise: #06b6d4
--text-dark: #1f2937
--text-light: #6b7280
```

### Typografie

- **Font Family**: Inter (Google Fonts)
- **Mobile**: Responsive Schriftgrößen mit `clamp()`
- **Hierarchie**: H1-H4 mit unterschiedlichen Gewichtungen

### Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: ≥ 1024px
```

## ⚡ Performance

### Optimierungen

- **CSS**: Minimiert und zusammengefasst
- **JavaScript**: Lazy Loading und Event Delegation
- **Images**: Bereit für Lazy Loading
- **Fonts**: Preconnect zu Google Fonts
- **Nginx**: Gzip Compression aktiviert
- **Caching**: Browser-Caching für statische Assets

### Metriken (Ziel)

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 📊 Analytics Setup

### Google Analytics 4

```javascript
// gtag.js einbinden
gtag('config', 'GA_MEASUREMENT_ID');

// Events werden automatisch getrackt:
// - CTA Clicks
// - Section Scrolling
// - Contact Actions
```

### Facebook Pixel

```javascript
// Facebook Pixel einbinden
fbq('init', 'PIXEL_ID');

// Lead Events werden automatisch getrackt
```

## 🔧 Konfiguration

### Kontaktdaten anpassen

In `index.html` und `js/main.js`:

```javascript
// E-Mail
info@azubi-foerderung.de

// Telefon
+49 123 456 789

// WhatsApp
https://wa.me/49123456789
```

### CTA-Links konfigurieren

In `js/main.js` → `startFoerderCheck()`:

```javascript
// Redirect zu externem Formular
window.location.href = 'https://your-form-service.com/foerder-check';
```

## 🛡️ Sicherheit

### Implementierte Maßnahmen

- **Security Headers**: CSP, HSTS, X-Frame-Options
- **Rate Limiting**: 10 Requests/Sekunde
- **User Permissions**: Non-root Container User
- **Read-only Filesystem**: Außer notwendige Verzeichnisse
- **No Privileges**: Security Opt für Container

## 🧪 Testing

### Lokal testen

```bash
# HTML Validierung
https://validator.w3.org/

# Lighthouse Test
lighthouse http://localhost:3000

# Responsive Design
Browser Developer Tools
```

### Production Testing

```bash
# Health Check
curl http://your-domain.com/health

# Performance Test
curl -o /dev/null -s -w "Time: %{time_total}s\n" http://your-domain.com
```

## 🔄 Updates und Wartung

### Code Updates

1. Änderungen am Code vornehmen
2. Lokale Tests durchführen
3. Docker Image neu bauen
4. Auf Staging deployen
5. Production Deployment

### Content Updates

- **Texte**: Direkt in `index.html` anpassen
- **Styling**: CSS in `css/style.css` anpassen
- **Funktionalität**: JavaScript in `js/main.js` erweitern

## 📞 Support

### Häufige Probleme

**Container startet nicht**:
```bash
docker logs azubi-foerderung-web
```

**Port bereits belegt**:
```bash
# Port in docker-compose.yml ändern
ports:
  - "3001:8080"  # Statt 3000:8080
```

**Nginx Konfigurationsfehler**:
```bash
# Syntax prüfen
docker exec azubi-foerderung-web nginx -t
```

### Debugging

```bash
# Container Shell
docker exec -it azubi-foerderung-web sh

# Logs anzeigen
docker-compose logs -f azubi-foerderung

# Health Check manuell
docker exec azubi-foerderung-web wget --spider http://localhost:8080/health
```

## 📋 Checkliste Production-Deployment

- [ ] Domain konfiguriert
- [ ] SSL-Zertifikat eingerichtet
- [ ] Analytics IDs eingetragen
- [ ] Kontaktdaten aktualisiert
- [ ] CTA-Links konfiguriert
- [ ] Health Checks funktionieren
- [ ] Performance getestet
- [ ] Mobile Testing durchgeführt
- [ ] SEO Meta-Tags überprüft
- [ ] Backup-Strategie definiert

## 📄 Lizenz

Dieses Projekt ist für den internen Gebrauch der Azubi-Förderungsberatung entwickelt.

---

**Entwickelt mit ❤️ für maximale Azubi-Förderungen**

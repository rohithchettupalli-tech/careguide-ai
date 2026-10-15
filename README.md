# CareGuide AI — Intelligent Healthcare Assistant

> **A Premium, Non-Diagnostic Healthcare Navigation & Emergency Triage Platform**

CareGuide AI is an award-winning healthcare SaaS interface designed to guide individuals from medical uncertainty to informed, safe clinical engagement.

---

## 🌟 Key Highlights & Design Vision

- **Editorial Healthcare Aesthetics**: Warm ivory base (`#F7F8F2`), deep teal branding (`#176B67`), soft mint (`#E1F3EC`), pale aqua (`#EAF7F6`), and sage green (`#CFE6D9`).
- **Emergency Awareness Gate**: Instant deterministic screening for life-threatening red flags (crushing chest pain, acute respiratory compromise, acute stroke signs, hemoptysis) with immediate **Dial 112** (India National Emergency) dispatch guidance before standard triage.
- **Layered Application Preview**: Real interactive UI preview featuring active clinical session indicator, symptom summary cards, department matches, and mini map cards.
- **Non-Diagnostic Exploratory Possibilities**: Explicitly marks health possibilities for discussion without fabricating diagnosis confidence percentages or false metrics.
- **Nearby Hospital Finder**: Geolocation-supported facility locator with live Haversine distance calculations (in km), verified emergency contacts, and direct Google Maps navigation routes.
- **Doctor Discussion Guide**: Tailored questions checklist for patients to take into their medical appointments.

---

## 🎨 Color System

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Deep Teal** | `#176B67` | Primary buttons, brand identity, navigation highlights |
| **Secondary Teal** | `#279B91` | Secondary accents, badges, focus rings |
| **Soft Mint** | `#E1F3EC` | Tinted containers, positive badges, ambient gradients |
| **Pale Aqua** | `#EAF7F6` | Search backgrounds, department chips, hover states |
| **Sage Green** | `#CFE6D9` | Organic shape accents, borders, dividers |
| **Warm Ivory** | `#F7F8F2` | Page background base, input surfaces |
| **Soft Powder Blue**| `#E7EFFB` | Triage indicator accents, subtle gradient mesh |
| **Main Text** | `#203936` | High-contrast editorial headings and body text |
| **Secondary Text** | `#667A76` | Supporting labels and metadata |
| **Card Surfaces** | `#FFFFFF` | Elevated cards and modal surfaces |
| **Borders** | `#DCE9E3` | Refined card borders |
| **Emergency Red** | `#DC2626` | Genuine emergency alerts & Dial 112 |
| **Caution Amber** | `#D97706` | Warning signs requiring prompt attention |

---

## 📁 Project Structure

```
c:\Users\Rohith\OneDrive\Desktop\Ai healthcare\
├── index.html                     # HTML entry with Google Fonts (Plus Jakarta Sans)
├── package.json                   # Dependencies (React 19, Tailwind v4, Lucide React)
├── vite.config.ts                 # Vite config with @tailwindcss/vite
├── src/
│   ├── main.tsx                   # React root mount
│   ├── App.tsx                    # Master coordinator & active session state
│   ├── index.css                  # Custom design tokens, radial mesh & grid styling
│   ├── App.css                    # App utilities
│   ├── types/
│   │   └── index.ts               # Complete TypeScript type definitions
│   ├── data/
│   │   └── medicalData.ts         # Symptoms taxonomy, red-flag patterns, hospital directory
│   ├── services/
│   │   └── aiMedicalEngine.ts     # Clinical red-flag screening & triage logic
│   └── components/
│       ├── Navbar.tsx             # Sticky header with CareGuide logo & 112 banner
│       ├── HeroSection.tsx        # Two-column hero with layered UI preview
│       ├── FeatureSection.tsx     # 4 distinct feature cards & safety principles
│       ├── HowItWorksSection.tsx  # 3-step visual journey with timeline
│       ├── SymptomChecker.tsx     # Guided multi-step symptom checker & live red-flag screener
│       ├── ResultsView.tsx        # Structured triage summary, doctor guide & emergency alerts
│       ├── HospitalFinder.tsx     # GPS facility search, interactive map panel & directions
│       ├── AboutSection.tsx       # Clinical integrity, WHO/ICMR alignment, privacy
│       └── Footer.tsx             # Emergency hotlines (112, 108, 102, 104) & disclaimers
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production-ready bundle in `/dist` within ~250ms.

### 4. Lint Check
```bash
npm run lint
```
0 warnings and 0 errors.

---

## ⚖️ Clinical Disclaimer

CareGuide AI is an educational healthcare navigation assistant. It does not provide medical diagnoses, treatment plans, prescriptions, or replace clinical evaluations by a registered healthcare provider. In an emergency, dial **112** (India) or proceed immediately to the nearest emergency room.

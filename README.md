# GST Calculator

A production-ready **GST (Goods & Services Tax) Calculator** built with React + Vite. Calculates GST-inclusive and GST-exclusive amounts instantly across India's four GST slabs (5%, 12%, 18%, 28%), with a full CGST/SGST tax breakdown — styled as a modern SaaS dashboard with glassmorphism, dark mode, and smooth motion.

**Live demo:** _add your Vercel URL here after deploying_

---

## ✨ Features

- **GST Exclusive mode** — enter a base (pre-tax) amount, add GST on top
- **GST Inclusive mode** — enter a total (tax-included) amount, reverse-calculate the GST out of it
- **4 official GST slabs** — 5%, 12%, 18%, 28%
- **Instant calculation** — results update live as you change amount, rate, or mode after the first calculation
- **CGST / SGST breakdown** — equal split of GST for intra-state supply, plus the IGST equivalent for inter-state supply
- **Input validation & error handling** — empty, non-numeric, negative, zero, and unrealistically large amounts are all caught with clear inline messages
- **Reset** — clears the form back to its default state in one click
- **Dark / light mode** — toggle with persistence to `localStorage` and respect for the OS preference on first load
- **Fully responsive** — mobile-first layout, down to small phones
- **Accessible** — semantic landmarks, `radiogroup`/`radio` roles for the segmented controls, `aria-live` result region, visible focus rings, and `prefers-reduced-motion` support

---

## 🧱 Tech stack

- React 18 (functional components + hooks only)
- Vite 5
- Modern CSS (custom properties / design tokens, no CSS framework)
- Zero paid APIs, zero backend — 100% client-side math

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── Header.jsx          # Nav bar + hero section (title, subtitle, trust stats)
│   ├── Header.css
│   ├── ThemeToggle.jsx     # Presentational dark/light switch (controlled by App)
│   ├── ThemeToggle.css
│   ├── Calculator.jsx      # The form: amount, mode, rate, calculate/reset, validation
│   ├── Calculator.css
│   ├── ResultCards.jsx     # Stat cards + receipt-style tax breakdown + empty state
│   ├── ResultCards.css
│   ├── Features.jsx        # "Why this tool" benefits grid
│   ├── Features.css
│   ├── Footer.jsx          # Developer credit + required "Built for Digital Heroes" link
│   └── Footer.css
├── hooks/
│   └── useCountUp.js       # Animates result numbers on change (respects reduced motion)
├── utils/
│   ├── gstCalculations.js  # Pure GST math + validation — framework-free, unit-testable
│   └── formatCurrency.js   # en-IN currency/number formatting helpers
├── App.jsx                 # Owns theme state, wires Calculator → ResultCards
├── App.css                 # Layout: container, grid, shared buttons
└── index.css                # Design tokens (colors, type, spacing), resets, mesh background
```

**Why this structure?** The brief specified `Header / Calculator / ResultCards / Features / Footer / ThemeToggle`, which this follows exactly. Two additions were made on top of that for production-grade separation of concerns:

1. **`utils/gstCalculations.js`** keeps every formula and validation rule in plain, framework-free functions. This is the file you'd unit test, and it's why the calculator is guaranteed to produce correct output — the math never touches JSX.
2. **Per-component CSS files** instead of one giant `App.css`, so each component's styles live, ship, and can be deleted alongside the component that uses them.

**State flow:** `Calculator` owns its own form state (amount, rate, mode, validation, "has the user pressed Calculate yet"). On every valid change it computes a result with `calculateGST()` and reports it upward via the `onResultChange` callback. `App` holds that result in state and passes it straight to `ResultCards`. This keeps the form and the results display fully decoupled — `ResultCards` doesn't know or care how the numbers were produced.

### GST math (the part that has to be correct)

```js
// Exclusive — amount entered is the price BEFORE tax
gstAmount   = baseAmount * rate / 100
totalAmount = baseAmount + gstAmount

// Inclusive — amount entered is the price AFTER tax (reverse GST)
baseAmount  = totalAmount * 100 / (100 + rate)
gstAmount   = totalAmount - baseAmount

// Tax breakdown (intra-state)
cgst = gstAmount / 2
sgst = gstAmount / 2
// or, for an inter-state supply:
igst = gstAmount
```

All of this is covered by `src/utils/gstCalculations.js`, and was verified against hand-checked cases (e.g. ₹1,000 at 18% exclusive → ₹180 GST → ₹1,180 total; reversing ₹1,180 at 18% inclusive returns exactly ₹1,000 base) before being wired into the UI.

---

## 🚀 Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

Other scripts:

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## ⚠️ Before you publish: update your details

Open `src/components/Footer.jsx` and replace the placeholder email with your real one:

```js
const DEVELOPER_NAME = 'Sanju Rajak'
const DEVELOPER_EMAIL = 'sanju.rajak@example.com' // ← replace this
```

---

## 📦 Push to GitHub

```bash
# from inside the gst-calculator/ folder
git init
git add .
git commit -m "Initial commit: GST Calculator"

# create an empty repo on GitHub first (no README/license), then:
git branch -M main
git remote add origin https://github.com/<your-username>/gst-calculator.git
git push -u origin main
```

---

## ☁️ Deploy to Vercel (free plan)

**Option A — via the Vercel dashboard (no CLI needed)**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**, then import the `gst-calculator` repo you just pushed.
3. Vercel auto-detects the **Vite** framework preset:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. You'll get a live `https://gst-calculator-xxxx.vercel.app` URL in under a minute.

**Option B — via the Vercel CLI**

```bash
npm install -g vercel
vercel        # follow the prompts, deploys a preview
vercel --prod # promotes it to your production URL
```

No environment variables, no backend, and no paid APIs are required — this project is 100% static and client-side.

---

## ♿ Accessibility notes

- Mode and rate selectors use `role="radiogroup"` / `role="radio"` with `aria-checked`, so screen readers announce them correctly.
- The amount field uses `aria-invalid` and `aria-describedby` to link it to its error message, which is announced via `role="alert"`.
- The results region is `aria-live="polite"` so new totals are announced without stealing focus.
- All interactive elements have visible `:focus-visible` outlines.
- Animations are skipped when the OS-level `prefers-reduced-motion` setting is on.

---

## 📄 License

Free to use for personal portfolios, learning, and trial assignments.

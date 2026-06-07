# Sleep Calculator - Development Guidelines & Design Tokens

This document maintains the persistent design values, architecture patterns, and optimizations implemented for the **Sleep Calculator** application. Please follow these conventions in all subsequent updates.

## 🎨 Design System & Color Tokens

- **Primary Color:** `#7C3AED` (Deep, eye-friendly Violet)
- **Primary Hover:** `#6D28D9`
- **Primary Active:** `#5B21B6`
- **Accent Highlight:** `#D4AF37` (Soft, premium gold)
- **Primary Background:** `#F3ECE3` (Warm Ivory / Beige)
- **Default Heading Color:** `#111827` (Deep charcoal)
- **Default Body Color:** `#374151` (Medium charcoal)
- **Muted Elements:** `#6B7280`

## ✍️ Font Selection & Typography pairings

- **Sans-serif (Primary UI / Numbers):** "Inter", system-ui, sans-serif
- **Monospace (Data / Status Indicators):** "JetBrains Mono", SFMono-Regular, monospace
- **Serif (Blog & Informational headings):** "Playfair Display", ui-serif, Georgia, serif

## ⚡ Performance Optimizations

### 1. Instant App Shell Loading
- **No Heavy Circular Spinners:** We do not display full-screen spinner loading screens to users.
- **Pre-rendered Layout Skeleton:** The browser renders a lightweight CSS skeleton placeholder matching the primary app layout and palette inside `<div id="root">` inside `index.html`.
- **Zero Layout Shifts:** When the React bundle completes loading, it overrides the root seamlessly. Because background colors, titles, and layout heights are pre-matched, the transition is instant and layout-shift free.

### 2. Streamlined Asset Loading
- **Head Parallel Font Preloading:** All primary fonts (Inter, Playfair Display, and JetBrains Mono) are requested inside `index.html`'s `<head>` elements in parallel.
- **Zero Blocked Imports:** We do not nest `@import url(...)` rules inside the main `index.css` file, preventing unstyled font flashes and render blockades.

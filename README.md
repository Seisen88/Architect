# 🏛️ ArchiStudios — Architecture Design Showcase

A premium, fully interactive architecture design showcase website built with **Next.js 14**, **Tailwind CSS**, and **React**. Displays annotated floor plans, elevation views, site area breakdowns, construction timelines, and the complete architect's design process — all in a single-page dark-themed experience.

![Hero Screenshot](./public/preview.png)

---

## ✨ Features

- **Interactive Floor Plan** — SVG ground floor plan with 7 clickable guide arrow dots. Each dot reveals the architect's design rationale: orientation decisions, structural choices, ventilation strategy, and more.
- **Site Area Breakdown** — Animated count-up cards for Total Site Area, Built-up GFA, Open Space, Paving, Green Roof, and Floor Area Ratio. Includes a proportional bar chart.
- **Elevation Views** — Tabbed elevation switcher across North, South, East, and Cross-Section A–A views. Each SVG drawing features numbered annotation pins with hover tooltips.
- **Site Development Timeline** — 6-phase interactive construction timeline (Survey → Foundation → Structure → Envelope → Fit-out → Handover) with a live progress line and deliverables panel.
- **Architect Process** — 7-step accordion (Brief → Concept → Design Development → Documentation → Tender → Construction Admin → Post-Occupancy), with tools, methods, and deliverables per step.
- **Technical Specifications** — 4-category spec tables (Structure, External Materials, Interior, M&E) with a drawing register.
- **Sticky Navbar** — Transparent to frosted-glass on scroll. Mobile hamburger menu with animated open/close.

---

## 🎨 Design Decisions

- **Dark Theme** — `#0f0e0c` base keeps focus on architectural content; warm amber `#a8875e` accent mirrors traditional drawing ink.
- **Blueprint Background** — CSS grid lines + dashed SVG lines reference technical drawing sheets.
- **SVG Drawings** — All floor plans and elevations are pure SVG (no external images), making the site fully self-contained and performant.
- **Guide Arrows** — Each annotation dot has a pulsing ring effect and a directional dashed arrow line pointing toward the annotated element.
- **Intersection Observer** — Area counters animate only when scrolled into view, preventing premature animation.
- **Glassmorphism Cards** — `.glass` utility uses `backdrop-filter: blur` for depth without heavy visual noise.

---

## 📐 Sections

| #   | Section           | Description                                   |
| --- | ----------------- | --------------------------------------------- |
| 01  | Floor Plan        | Annotated ground floor plan with guide arrows |
| 02  | Site Area         | Area cards with animated numbers              |
| 03  | Elevation Views   | Tabbed North/South/East/Section drawings      |
| 04  | Site Development  | Construction phase timeline                   |
| 05  | Architect Process | Step-by-step design workflow                  |
| 06  | Specifications    | Materials, structure, M&E schedule            |

---

## 📝 Customisation

All site content lives in [`lib/siteData.ts`](./lib/siteData.ts). You can update:

- `floorPlanAnnotations` — Floor plan guide arrow positions and descriptions
- `siteAreas` — Area card values and descriptions
- `elevationViews` — Elevation tab content and annotation pins
- `timelinePhases` — Construction phase titles, durations, deliverables
- `processsteps` — Architect workflow steps
- `specifications` — Materials and system spec tables

---

## 📜 License

MIT — free to use and adapt for your own architecture practice or portfolio.

# Ivara Design System — Complete Specification
*Version 1.0 — April 2026*

## Color Palette

### Primary — Marigold Coral
| Token | Hex | Usage |
|---|---|---|
| primary-50 | #FEF0EB | Section backgrounds, card fills |
| primary-300 | #F9B49A | Hover fills, highlights |
| primary-500 | #F4845F | Primary CTA, active states, logo accent |
| primary-700 | #D9603C | Pressed states, dark CTA |

### Secondary — Sage Green
| Token | Hex | Usage |
|---|---|---|
| secondary-50 | #EEF6F1 | Alternate section backgrounds |
| secondary-300 | #B3D4C0 | Decorative fills |
| secondary-500 | #7BAE8E | Secondary actions, icons |
| secondary-700 | #4F8668 | Secondary CTA hover |

### Accent — Turmeric Gold
| Token | Hex | Usage |
|---|---|---|
| accent-50 | #FFFDE8 | Background accents |
| accent-500 | #F0C040 | Highlights, star ratings, badges |
| accent-700 | #C9950A | Text on light backgrounds |

### Blush — Mood/Mental Health (equal visual weight to physical metrics)
| Token | Hex | Usage |
|---|---|---|
| blush-50 | #FDF0F4 | Mood section backgrounds |
| blush-300 | #F2AABE | Primary blush accent |

### Surfaces
| Token | Hex | Usage |
|---|---|---|
| surface-base | #FDF8F3 | Page background |
| surface-card | #FFFCF9 | Card backgrounds |
| surface-muted | #F7F2EA | Alternate sections |
| surface-border | #E8E1D8 | Dividers, input borders |

### Text
| Token | Hex | Usage |
|---|---|---|
| text-primary | #2C2420 | Headings, primary body |
| text-secondary | #5C4A42 | Sub-headings, secondary body |
| text-muted | #9C8880 | Captions, placeholders |
| text-inverse | #FDF8F3 | Text on dark backgrounds |

### Semantic (Warm — never clinical)
| Token | Hex | Usage |
|---|---|---|
| semantic-success | #6BAE8A | Positive readings |
| semantic-warning | #E8A848 | Alerts needing attention |
| semantic-info | #89A8C8 | Tips, educational content |
| semantic-error | #C87860 | Form errors only |

---

## Typography

**English:** Plus Jakarta Sans (Google Fonts)
**Hindi:** Noto Sans Devanagari (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale
| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| display | 56px / 3.5rem | 1.1 | 800 | Hero headline only |
| h1 | 44px / 2.75rem | 1.15 | 700 | Page-level headings |
| h2 | 34px / 2.125rem | 1.2 | 700 | Section headings |
| h3 | 26px / 1.625rem | 1.25 | 600 | Card headings |
| h4 | 20px / 1.25rem | 1.3 | 600 | Feature titles, FAQ |
| body-lg | 18px / 1.125rem | 1.65 | 400 | Hero sub-copy |
| body | 16px / 1rem | 1.7 | 400 | Standard body |
| body-sm | 14px / 0.875rem | 1.6 | 400 | Card body |
| caption | 12px / 0.75rem | 1.5 | 400 | Fine print |
| label | 12px / 0.75rem | 1.2 | 600 | Form labels, badges |
| overline | 11px / 0.6875rem | 1.2 | 700 | Section eyebrows (uppercase) |

---

## Spacing & Layout

- Container max-width: 1200px
- Section vertical padding: 96px (py-24) / 120px on desktop
- Content horizontal: px-6 → md:px-12 → lg:px-20
- Border radius philosophy: NOTHING has sharp corners
  - radius-sm: 8px (badges)
  - radius-md: 12px (buttons, inputs)
  - radius-lg: 16px (cards)
  - radius-xl: 24px (feature cards, pricing)
  - radius-full: 9999px (avatars, toggles)

### Shadow System (all warm-tinted)
- shadow-warm-sm: `0 1px 3px 0 rgba(44,36,32,0.08)`
- shadow-warm: `0 4px 12px 0 rgba(44,36,32,0.10)`
- shadow-warm-md: `0 8px 24px 0 rgba(44,36,32,0.12)`
- shadow-warm-lg: `0 20px 48px 0 rgba(44,36,32,0.14)`
- shadow-glow-primary: `0 0 0 4px rgba(244,132,95,0.20)`

---

## Animation Principles

**Philosophy:** Slow exhale, not a tech product launch. Nothing startles.

```typescript
// Shared variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
export const staggerContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
export const floatVariant = {
  animate: { y: [0, -8, 0], transition: { duration: 4, ease: "easeInOut", repeat: Infinity } },
}
```

- Hero headline: immediate (no delay — LCP element)
- Feature cards: stagger 80ms between each
- All scroll-triggered: `whileInView` with `once: true, amount: 0.2`
- Reduced motion: override all animations to 0.01ms via `prefers-reduced-motion`

---

## Mobile Breakpoints

| Breakpoint | Width | Key changes |
|---|---|---|
| base (xs) | 360px | 1-col, hamburger nav, hero h1 = 30px, stacked CTAs |
| md | 768px | 2-col features, nav links visible, hero h1 = 36px |
| lg | 1024px | 3-col features, split hero, hero h1 = 56px, floating badges appear |
| xl | 1440px | Container locked at 1200px, centered |

### Responsive Typography
| Element | 360px | 768px | 1024px+ |
|---|---|---|---|
| Hero h1 | text-3xl (30px) | text-4xl (36px) | text-[3.5rem] (56px) |
| Section h2 | text-2xl (24px) | text-[1.75rem] | text-[2.125rem] |
| Body | text-sm (14px) | text-base (16px) | text-base (16px) |

---

## Critical Rules

1. **Mental health parity:** Mood card must be visually IDENTICAL to BP/sleep cards. Same background, icon size, typography, shadow. No lighter colors, no smaller icons.
2. **No sharp corners:** Never use rounded-none, rounded-sm, or rounded on visible UI.
3. **No pure black/white:** Use #2C2420 for text, #FDF8F3 for backgrounds.
4. **No clinical colors:** No cold blues, medical crosses, red warning colors.
5. **Semantic colors are visual-only:** Copy must always be warm ("Let's double-check this" not "Error").
6. **WhatsApp-first forms:** Phone number is primary field in India, not email.

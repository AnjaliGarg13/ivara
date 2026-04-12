# Ivara Landing Page — Conversion Strategy

## Primary Goal
Waitlist email sign-ups before launch.

## CTA Hierarchy (4 placements)
1. Hero (above fold) — highest priority, email input visible without scrolling
2. Sticky nav — always visible, lower friction
3. Post-features section — captures intent after value demonstration
4. Bottom full-form section — final capture for scroll-completers

## Micro-copy
- Button: "Join the Waitlist" (control) | "Get Early Access" (treatment)
- Below button: "No spam. We'll reach out when Ivara launches in your city."
- Success: "You're on the list! We'll be in touch."
- HI placeholder: "aapka email"
- EN placeholder: "your.email@example.com"

## WhatsApp CTA (secondary)
- Copy: "Prefer WhatsApp? We'll update you there too."
- Link: wa.me/[NUMBER]?text=Hi%20Ivara%2C%20add%20me%20to%20the%20waitlist
- Track: whatsapp_click event

## Trust Signals Near CTA
- "Join 2,400+ mothers on the waitlist" — social proof counter (seeded)
- Hospital logos (Apollo, Manipal, Fortis)
- DPDP compliance badge

## Funnel KPIs & Targets
| Metric | Target |
|---|---|
| Landing → Hero CTA click | >8% |
| CTA click → Form completion | >60% |
| Page → Waitlist submission | >4% |
| Language toggle rate | Diagnostic (tells us HI demand) |
| Pricing section view rate | Buying intent signal |

## A/B Tests

### Test A: Hero Headline (flag: hero-headline-test)
- Control: "Between your checkups, a lot can change. We're watching."
- Treatment: "Your next appointment is 3 weeks away. A lot can change."
- Hypothesis: Fear-of-missing-out framing (treatment) drives higher CTA clicks
- Success metric: hero cta_click rate
- Min. sample: 500 visitors per variant before calling winner

### Test B: CTA Button Text (flag: cta-text-test)
- Control: "Join the Waitlist"
- Treatment: "Get Early Access"
- Hypothesis: "Early Access" implies exclusivity and urgency
- Success metric: waitlist_submit rate
- Min. sample: 500 visitors per variant before calling winner

## PostHog Dashboard Setup
1. Funnel: pageview → cta_click → waitlist_submit
2. Trend: waitlist_submit count by day
3. Breakdown: waitlist_submit by language property
4. Heatmap: hero section (CTA placement validation), pricing section (scroll depth)
5. Session recordings: filter by users who dropped off between cta_click and submit

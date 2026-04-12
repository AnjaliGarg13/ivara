# Ivara Landing Page — QA Checklist

## Pre-Launch Sign-Off

### Copy & Brand Compliance
- [ ] No "depression", "disorder", "anxiety disorder", "mental illness", "psychiatric" in any user-facing text
- [ ] Mood tracking card is visually identical to BP/sleep cards (screenshot comparison)
- [ ] Hindi copy reviewed by native speaker
- [ ] All CTA button text matches approved variants ("Join the Waitlist" / "Get Early Access")
- [ ] Trust badge copy is accurate (hospital names, DPDP claim)
- [ ] Footer DPDP compliance statement present and accurate
- [ ] Privacy Policy link is live and working

### Functionality
- [ ] Waitlist form: valid email submits successfully
- [ ] Waitlist form: invalid email shows appropriate error
- [ ] Waitlist form: success state appears and form hides
- [ ] Confirmation email received after sign-up (EN and HI)
- [ ] Language toggle switches all visible copy to Hindi
- [ ] Language toggle switches back to English
- [ ] Scroll CTAs navigate to correct sections
- [ ] Nav "Join Waitlist" scrolls to waitlist section
- [ ] FAQ accordion opens and closes correctly

### Analytics
- [ ] PostHog receiving `cta_click` events from hero
- [ ] PostHog receiving `language_toggle` events
- [ ] PostHog receiving `waitlist_submit` events with correct properties
- [ ] Scroll depth events firing at 25%, 50%, 75%, 90%
- [ ] No PII (email, name) appearing in PostHog event properties

### Legal & Compliance
- [ ] DPDP Act 2023 compliance note in footer
- [ ] Privacy Policy page exists (or external link)
- [ ] No cookies set without consent (check DevTools Application tab)
- [ ] PostHog respect for analytics opt-out

## Browser Testing Matrix

| Browser | Version | Desktop | Mobile |
|---|---|---|---|
| Chrome | 120+ | ✓ Test | ✓ Test (Android) |
| Safari | 17+ | ✓ Test | ✓ Test (iOS) |
| Firefox | 121+ | ✓ Test | — |
| Samsung Internet | 23+ | — | ✓ Test (Android) |
| Edge | 120+ | ✓ Test | — |

## Breakpoint Testing Matrix

| Width | Device | Key things to check |
|---|---|---|
| 360px | Small Android (Galaxy A) | 1-col layout, hamburger nav, h1 readable, CTAs full-width |
| 390px | iPhone 14 | Same as 360px but slightly more space |
| 768px | iPad portrait | 2-col features, nav links visible |
| 1024px | iPad landscape / small laptop | 3-col features, split hero, floating badges |
| 1440px | Standard desktop | Container centered, max-width respected |
| 1920px | Large desktop | No stretching beyond 1200px container |

## Performance Targets
- [ ] LCP < 2.5s (measure via Lighthouse)
- [ ] CLS < 0.1
- [ ] TBT < 300ms
- [ ] Lighthouse Performance score >= 85
- [ ] Lighthouse Accessibility score >= 95

## Accessibility
- [ ] Tab through entire page — all interactive elements reachable
- [ ] Screen reader test: VoiceOver (Mac/iOS) or TalkBack (Android)
- [ ] All images have descriptive alt text
- [ ] Form inputs have visible labels
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast passes WCAG AA (use browser DevTools or axe extension)

import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://ivara.health'),
  title: 'Ivara — Maternal Care Platform | Every product stops at delivery. Ivara starts there.',
  description:
    'Ivara is the longitudinal care relationship for mothers that the healthcare system only gives to the baby. Postpartum assessment, specialist access, and continuous monitoring for India 1 mothers.',
  keywords: [
    'maternal health India',
    'postpartum care India',
    'postpartum recovery platform',
    'pelvic floor physiotherapy India',
    'perinatal mental health India',
    'postpartum depression India',
    'maternal care Mumbai Bangalore Delhi',
    'postpartum assessment India',
    '6 week postpartum checkup',
    'working mothers postpartum',
    'India 1 maternal health',
    'postpartum specialist India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ivara.health',
    siteName: 'Ivara Health',
    title: 'Ivara — Every maternal health product stops at delivery. Ivara starts there.',
    description:
      'The longitudinal care relationship for mothers that the healthcare system only gives to the baby. Launching in Mumbai, Bangalore, and Delhi in 2026.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ivara — Maternal Care Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivara — Every maternal health product stops at delivery. Ivara starts there.',
    description:
      'The longitudinal care relationship for mothers that the healthcare system only gives to the baby.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ivara.health' },
}

export function generatePageMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return { ...siteMetadata, ...overrides }
}

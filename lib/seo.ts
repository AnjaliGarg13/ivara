import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: 'Ivara — The Safety Net Between Checkups | Maternal Health India',
  description:
    'Ivara tracks your blood pressure, sleep, mood, and nutrition every day — so you\'re never alone between your checkups. Built for Indian mothers.',
  keywords: [
    'maternal health India',
    'pregnancy monitoring app',
    'prenatal care India',
    'blood pressure pregnancy',
    'Indian mothers health app',
    'postpartum care India',
    'between checkups',
    'safe pregnancy India',
    'ASHA worker integration',
    'Hindi pregnancy app',
    'mood tracking pregnancy',
    'postpartum monitoring',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ivara.health',
    siteName: 'Ivara Health',
    title: 'Ivara — The Safety Net Between Checkups',
    description: 'Continuous maternal health monitoring for Indian mothers. From your first trimester to your baby\'s first birthday.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ivara — The Safety Net Between Checkups' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivara — The Safety Net Between Checkups',
    description: 'Continuous maternal health monitoring for Indian mothers.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ivara.health' },
}

export function generatePageMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return { ...siteMetadata, ...overrides }
}

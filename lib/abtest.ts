'use client'

import { usePostHog } from 'posthog-js/react'

export const HERO_HEADLINE_FLAG = 'hero-headline-test'
export const CTA_TEXT_FLAG = 'cta-text-test'

const HERO_HEADLINE_VARIANTS = {
  control: "Between your checkups, a lot can change. We're watching.",
  treatment: "Your next appointment is 3 weeks away. A lot can change.",
} as const

const CTA_TEXT_VARIANTS = {
  control: 'Join the Waitlist',
  treatment: 'Get Early Access',
} as const

export function useExperiment(flagKey: string): string {
  const posthog = usePostHog()
  if (!posthog) return 'control'
  const value = posthog.getFeatureFlag(flagKey)
  if (typeof value === 'string') return value
  return 'control'
}

export function useHeroHeadline(): string {
  const variant = useExperiment(HERO_HEADLINE_FLAG)
  return HERO_HEADLINE_VARIANTS[variant as keyof typeof HERO_HEADLINE_VARIANTS] ?? HERO_HEADLINE_VARIANTS.control
}

export function useCtaText(): string {
  const variant = useExperiment(CTA_TEXT_FLAG)
  return CTA_TEXT_VARIANTS[variant as keyof typeof CTA_TEXT_VARIANTS] ?? CTA_TEXT_VARIANTS.control
}

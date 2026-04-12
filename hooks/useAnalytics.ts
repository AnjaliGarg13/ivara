'use client'

import { usePostHog } from 'posthog-js/react'

type IvaraEvent =
  | { name: 'cta_click'; props: { location: 'hero' | 'nav' | 'bottom' | 'pricing'; variant: 'primary' | 'secondary' } }
  | { name: 'language_toggle'; props: { to: 'en' | 'hi' } }
  | { name: 'pricing_view'; props: Record<string, never> }
  | { name: 'waitlist_submit'; props: { language: 'en' | 'hi'; has_city: boolean } }
  | { name: 'waitlist_error'; props: { error: string } }
  | { name: 'scroll_depth'; props: { percent: 25 | 50 | 75 | 90 } }
  | { name: 'faq_open'; props: { question_index: number } }
  | { name: 'whatsapp_click'; props: { location: string } }

export type { IvaraEvent }

export function useAnalytics() {
  const posthog = usePostHog()

  function capture<T extends IvaraEvent>(event: T): void {
    if (!posthog) return
    posthog.capture(event.name, event.props)
  }

  return { capture }
}

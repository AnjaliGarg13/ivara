'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((posthog as any).__loaded) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: true,
      autocapture: true,
      person_profiles: 'identified_only',
      sanitize_properties(properties) {
        // Strip PII before sending any event
        const sanitized = { ...properties }
        const piiKeys = ['email', 'phone', 'name', 'password', '$email', '$phone', '$name']
        for (const key of piiKeys) {
          delete sanitized[key]
        }
        return sanitized
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

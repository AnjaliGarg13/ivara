'use client'

import { useEffect, useRef } from 'react'
import { useAnalytics } from './useAnalytics'

const DEPTH_MILESTONES = [25, 50, 75, 90] as const
type Milestone = (typeof DEPTH_MILESTONES)[number]

export function useScrollDepth() {
  const { capture } = useAnalytics()
  const firedRef = useRef<Set<Milestone>>(new Set())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function checkDepth() {
      const scrollY = window.scrollY
      const windowH = window.innerHeight
      const docH = document.documentElement.scrollHeight
      const percent = Math.round(((scrollY + windowH) / docH) * 100)

      for (const milestone of DEPTH_MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone)
          capture({ name: 'scroll_depth', props: { percent: milestone } })
        }
      }
    }

    function onScroll() {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(checkDepth)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [capture])
}

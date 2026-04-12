'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

export default function Nav() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToWaitlist(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ivory/90 backdrop-blur-md shadow-sm border-b border-surface'
          : 'bg-transparent'
      )}
    >
      <div className="container-ivara">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Ivara Home"
          >
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center shadow-ivara group-hover:shadow-ivara-md transition-shadow">
              <span className="text-white text-sm font-bold">I</span>
            </div>
            <span className="text-xl font-bold text-terracotta tracking-tight">
              {t.nav.logo}
            </span>
          </a>

          {/* CTA */}
          <a
            href="#waitlist"
            onClick={scrollToWaitlist}
            className="btn-primary text-sm px-5 py-2.5"
          >
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}

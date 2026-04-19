'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
            <Image
              src="/ivara-logo.jpeg"
              alt="Ivara"
              width={80}
              height={80}
              className="h-14 w-auto object-contain"
            />
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

'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { label: t.footer.privacy, href: '/privacy' },
    { label: t.footer.terms, href: '/terms' },
    { label: t.footer.contact, href: 'mailto:hello@ivarahealth.com' },
  ]

  return (
    <footer className="bg-teal-deep text-white/80 py-12">
      <div className="container-ivara">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center shadow-ivara">
                <span className="text-white text-sm font-bold">I</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {t.footer.tagline ? 'Ivara' : 'Ivara'}
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Compliance */}
          <div className="flex items-start gap-2 max-w-md">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 mt-0.5 text-gold"
              aria-hidden="true"
            >
              <path
                d="M8 1.5L2 4v4c0 3.3 2.5 6.4 6 7 3.5-.6 6-3.7 6-7V4L8 1.5z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M5.5 8l2 2 3-3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs text-white/50 leading-relaxed">{t.footer.compliance}</p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40 shrink-0">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

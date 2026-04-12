'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-ivara pt-16">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large soft circle top-right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-terracotta/8 blur-3xl" />
        {/* Medium circle bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-gold/10 blur-3xl" />
        {/* Small teal accent */}
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-teal/5 blur-2xl" />

        {/* Decorative SVG wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C360 120 1080 0 1440 60 L1440 120 L0 120 Z"
            fill="#F5EDE3"
            fillOpacity="0.5"
          />
          <path
            d="M0 80 C480 20 960 140 1440 80 L1440 120 L0 120 Z"
            fill="#F5EDE3"
            fillOpacity="0.3"
          />
        </svg>

        {/* Decorative abstract flower / mandala hint */}
        <svg
          className="absolute top-24 right-8 md:right-24 w-64 h-64 opacity-10"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="60" stroke="#C4714F" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="40" stroke="#C4714F" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="20" stroke="#C4714F" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 100 + 20 * Math.cos(rad)
            const y1 = 100 + 20 * Math.sin(rad)
            const x2 = 100 + 80 * Math.cos(rad)
            const y2 = 100 + 80 * Math.sin(rad)
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#C4714F"
                strokeWidth="1"
              />
            )
          })}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const cx = 100 + 60 * Math.cos(rad)
            const cy = 100 + 60 * Math.sin(rad)
            return (
              <circle
                key={`dot-${angle}`}
                cx={cx}
                cy={cy}
                r="4"
                fill="#C4714F"
              />
            )
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="container-ivara relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold px-4 py-1.5 rounded-full border border-terracotta/20">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse-slow" />
              {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-6 text-balance"
          >
            {t.hero.headline}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed mb-10 max-w-2xl"
          >
            {t.hero.subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button
              onClick={() => scrollTo('waitlist')}
              className="btn-primary text-base px-8 py-4 shadow-ivara-md"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={() => scrollTo('solution')}
              className="btn-secondary text-base px-8 py-4"
            >
              {t.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-teal-deep flex items-center justify-center text-white text-xs font-bold border-2 border-ivory"
                  style={{ marginLeft: i > 0 ? '-6px' : '0' }}
                >
                  {['A', 'M', '+'][i]}
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted leading-tight">
              {t.hero.trustBadge}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

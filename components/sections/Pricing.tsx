'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function CheckIcon({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        fill={inverted ? 'rgba(255,255,255,0.2)' : 'rgba(196, 113, 79, 0.15)'}
      />
      <path
        d="M5 8l2 2 4-4"
        stroke={inverted ? 'white' : '#C4714F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function scrollToWaitlist() {
  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 bg-surface" ref={ref}>
      <div className="container-ivara">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">{t.pricing.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4 mb-6" />
          <p className="text-text-muted text-base max-w-xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* 3-tier grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Assessment - one-time hero product */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-ivara-lg shadow-card p-8 flex flex-col border-2 border-terracotta/20"
          >
            <div className="mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                {t.pricing.assessment.tag}
              </span>
            </div>
            <p className="text-base font-semibold text-text-primary mt-3 mb-1">
              {t.pricing.assessment.name}
            </p>
            <p className="text-sm text-text-muted mb-4">{t.pricing.assessment.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-xs text-text-muted">{t.pricing.assessment.price}</span>
              <span className="text-3xl font-black text-text-primary">
                &#8377;{t.pricing.assessment.amount}
              </span>
              <span className="text-text-muted text-sm">{t.pricing.assessment.period}</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {t.pricing.assessment.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-primary">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button onClick={scrollToWaitlist} className="btn-secondary w-full justify-center">
              Join Waitlist
            </button>
          </motion.div>

          {/* Digital Companion */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-ivara-lg shadow-card p-8 flex flex-col"
          >
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
              {t.pricing.companion.name}
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-xs text-text-muted">{t.pricing.companion.price}</span>
              <span className="text-3xl font-black text-text-primary">
                &#8377;{t.pricing.companion.amount}
              </span>
              <span className="text-text-muted text-sm">{t.pricing.companion.period}</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {t.pricing.companion.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-primary">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button onClick={scrollToWaitlist} className="btn-secondary w-full justify-center">
              Join Waitlist
            </button>
          </motion.div>

          {/* Full Care - inverted terracotta */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-terracotta rounded-ivara-lg shadow-ivara-lg p-8 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-5 right-5">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {t.pricing.complete.tag}
              </span>
            </div>
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
              {t.pricing.complete.name}
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-xs text-white/70">{t.pricing.complete.price}</span>
              <span className="text-3xl font-black text-white">
                &#8377;{t.pricing.complete.amount}
              </span>
              <span className="text-white/70 text-sm">{t.pricing.complete.period}</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {t.pricing.complete.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white">
                  <CheckIcon inverted />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToWaitlist}
              className="w-full justify-center bg-white text-terracotta font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:bg-white/90 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-terracotta inline-flex items-center"
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-text-muted mt-8"
        >
          All memberships include a free initial consultation. Pricing is indicative and will be confirmed at launch.
        </motion.p>
      </div>
    </section>
  )
}

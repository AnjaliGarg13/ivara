'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function LeadMagnet() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const lm = t.leadMagnet

  return (
    <section className="py-24 bg-white" id="assessment" ref={ref}>
      <div className="container-ivara">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-dark text-xs font-semibold px-4 py-1.5 rounded-full border border-gold/30 mb-5">
              ✦ {lm.eyebrow}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-5">
              {lm.title}
            </h2>

            <p className="text-text-muted text-base leading-relaxed mb-8 max-w-md">
              {lm.subtitle}
            </p>

            {/* Score range callout */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-surface" />
              <span className="text-xs font-medium text-text-muted whitespace-nowrap">
                {lm.scoreLine}
              </span>
              <div className="h-px flex-1 bg-surface" />
            </div>

            <button
              onClick={() => scrollTo('waitlist')}
              className="btn-primary text-base px-8 py-4 shadow-ivara-md mb-4"
            >
              {lm.cta}
            </button>

            <p className="text-xs text-text-muted">{lm.disclaimer}</p>
          </motion.div>

          {/* Right: score card preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Score gauge mock */}
            <div className="bg-[#FAF3EB] rounded-ivara-lg p-8 shadow-card">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Postpartum Recovery Score</p>
                  <p className="text-4xl font-black text-terracotta mt-1">34<span className="text-lg font-normal text-text-muted">/48</span></p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-terracotta/30 flex items-center justify-center bg-white">
                  <span className="text-2xl">🩺</span>
                </div>
              </div>

              {/* Score band label */}
              <div className="bg-terracotta/10 rounded-ivara px-4 py-2 mb-6 text-center">
                <span className="text-sm font-semibold text-terracotta">Active Recovery</span>
                <p className="text-xs text-text-muted mt-0.5">You are making progress, but your data shows gaps commonly missed at this stage.</p>
              </div>

              {/* Sample questions */}
              <div className="space-y-3">
                {lm.questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-deep/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-teal-deep text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-text-muted text-sm leading-snug">{q}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-deep animate-pulse-slow" />
                <p className="text-xs text-text-muted">5 minutes · Instant results · No account required</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gold text-white text-xs font-bold px-4 py-2 rounded-full shadow-ivara-md">
              Free
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

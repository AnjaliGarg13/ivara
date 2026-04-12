'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Solution() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: t.solution.step1Title,
      desc: t.solution.step1Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#C4714F" fillOpacity="0.15" />
          <path d="M16 10v12M10 16h12" stroke="#C4714F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: '02',
      title: t.solution.step2Title,
      desc: t.solution.step2Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#C4714F" fillOpacity="0.15" />
          <path d="M8 20 L12 14 L16 18 L20 11 L24 15" stroke="#C4714F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: '03',
      title: t.solution.step3Title,
      desc: t.solution.step3Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#C4714F" fillOpacity="0.15" />
          <path d="M16 8 C13.79 8 12 9.79 12 12 C12 15.5 16 20 16 20 C16 20 20 15.5 20 12 C20 9.79 18.21 8 16 8Z" fill="#C4714F" />
          <circle cx="16" cy="12" r="2" fill="white" />
        </svg>
      ),
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="solution" className="py-24 bg-ivory" ref={ref}>
      <div className="container-ivara">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.solution.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row items-stretch gap-0"
        >
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-stretch flex-1">
              {/* Step card */}
              <motion.div
                variants={itemVariants}
                className="flex-1 bg-white rounded-ivara shadow-card p-8 flex flex-col items-start gap-4 hover:shadow-card-hover transition-shadow duration-200"
              >
                {/* Number badge */}
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-black text-terracotta/20 leading-none">
                    {step.number}
                  </span>
                  <div>{step.icon}</div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>

              {/* Arrow connector (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-3 shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-px bg-terracotta/30" />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-terracotta/50"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Vertical connector (mobile only) */}
              {i < steps.length - 1 && (
                <div className="flex md:hidden items-center justify-center py-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-px bg-terracotta/30" />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-terracotta/50"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

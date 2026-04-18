'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Timeline() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  return (
    <section id="timeline" className="py-24 bg-ivory" ref={ref}>
      <div className="container-ivara">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">{t.timeline.title}</h2>
          <div className="w-16 h-1 bg-teal rounded-full mx-auto mt-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-text-muted text-base max-w-xl mx-auto mb-16"
        >
          {t.timeline.subtitle}
        </motion.p>

        {/* Stage cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {t.timeline.stages.map((stage, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative bg-white rounded-ivara shadow-card p-6 flex flex-col gap-3 hover:shadow-card-hover transition-shadow duration-200"
            >
              {/* Stage number dot */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                </div>
                <span className="text-xs font-semibold text-teal uppercase tracking-widest">
                  {stage.period}
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary leading-snug">
                {stage.label}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed">
                {stage.focus}
              </p>

              {/* Connector line on desktop (not last card) */}
              {i < t.timeline.stages.length - 1 && (
                <div className="hidden lg:block absolute top-[2.6rem] -right-3 w-6 h-px bg-teal/30 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Goal callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-teal rounded-ivara px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <span className="text-xs font-bold text-white/70 uppercase tracking-widest shrink-0">
            {t.timeline.goalLabel}
          </span>
          <p className="text-white text-base font-medium leading-relaxed">
            {t.timeline.goalText}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

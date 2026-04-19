'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Trust() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-ivory" ref={ref}>
      <div className="container-ivara">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.trust.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Clinical pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {t.trust.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="bg-white rounded-ivara shadow-card p-8 text-center hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="font-bold text-text-primary text-lg mb-2">{pillar.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ASHA Integration callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-teal-deep rounded-ivara-lg p-8 md:p-12 text-center text-white"
        >
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold mb-3">ASHA-Integrated by Design</h3>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            India's 1 million ASHA workers are your community link. Ivara works
            directly with them, so when your data shows you may need extra support,
            your ASHA worker is the first to know.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-sm font-medium text-white/90">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-slow" />
            Aligned with National Health Mission protocols
          </div>
        </motion.div>
      </div>
    </section>
  )
}

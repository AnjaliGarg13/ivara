'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const hospitals = [
  { name: 'Apollo', tagline: 'Hospitals' },
  { name: 'Manipal', tagline: 'Health' },
  { name: 'Fortis', tagline: 'Healthcare' },
]

const advisors = [
  {
    name: 'Dr. Meera Krishnan',
    title: 'Senior OB-GYN, Apollo Delhi',
    specialty: 'Maternal-Fetal Medicine',
    initials: 'MK',
  },
  {
    name: 'Dr. Priya Saraswat',
    title: 'Head of Obstetrics, Manipal Bengaluru',
    specialty: 'High-Risk Pregnancy',
    initials: 'PS',
  },
  {
    name: 'Dr. Ananya Bose',
    title: 'Perinatal Specialist, Fortis Mumbai',
    specialty: 'Postpartum Wellness',
    initials: 'AB',
  },
]

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

        {/* Hospital logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-20"
        >
          {hospitals.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-40 h-20 rounded-ivara border-2 border-surface bg-white shadow-card hover:shadow-card-hover transition-shadow duration-200 px-4"
            >
              <span className="text-xl font-black text-teal-deep tracking-tight leading-none">
                {h.name}
              </span>
              <span className="text-xs text-text-muted font-medium mt-0.5 tracking-wider uppercase">
                {h.tagline}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Medical Advisory Board */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-text-primary text-center mb-10">
            {t.trust.advisoryTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="bg-white rounded-ivara shadow-card p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow duration-200"
              >
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-teal flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{a.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm leading-snug">{a.name}</p>
                  <p className="text-xs text-text-muted mt-0.5 leading-snug">{a.title}</p>
                  <span className="inline-block mt-2 text-xs bg-terracotta/10 text-terracotta font-medium px-2 py-0.5 rounded-full">
                    {a.specialty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
            directly with them — so when your data shows you may need extra support,
            your ASHA worker is the first to know.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-sm font-medium text-white/90">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-slow" />
            Integrated with National Health Mission protocols
          </div>
        </motion.div>
      </div>
    </section>
  )
}

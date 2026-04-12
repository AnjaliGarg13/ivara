'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { number: '6 wk', color: 'text-terracotta' },
  { number: '1 in 5', color: 'text-teal-deep' },
  { number: '90 days', color: 'text-gold-dark' },
]

export default function Problem() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const statDescriptions = [
    t.problem.stat1,
    t.problem.stat2,
    t.problem.stat3,
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="py-24 bg-[#FAF3EB]" ref={ref}>
      <div className="container-ivara">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.problem.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-ivara shadow-card p-8 text-center group hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color}`}>
                {stat.number}
              </div>
              <p className="text-text-muted text-base leading-snug">
                {statDescriptions[i]}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Emotional narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="relative">
            <span className="absolute -top-6 -left-4 text-7xl text-terracotta/20 font-serif leading-none select-none">&ldquo;</span>
            <p className="text-lg md:text-xl text-text-primary font-medium leading-relaxed italic relative z-10">
              {t.problem.narrative}
            </p>
            <span className="absolute -bottom-8 -right-4 text-7xl text-terracotta/20 font-serif leading-none select-none">&rdquo;</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

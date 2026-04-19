'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  return (
    <section id="features" className="py-24 bg-surface" ref={ref}>
      <div className="container-ivara">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.features.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Cards grid - ALL cards identical visual treatment */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.features.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white rounded-ivara shadow-card p-6 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-200 group"
            >
              {/* Icon - identical container for every card */}
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center shrink-0 group-hover:bg-terracotta/15 transition-colors duration-200">
                <span className="text-2xl leading-none" role="img" aria-label={card.title}>
                  {card.icon}
                </span>
              </div>

              {/* Title - identical style for every card */}
              <h3 className="text-base font-semibold text-text-primary leading-snug">
                {card.title}
              </h3>

              {/* Description - identical style for every card */}
              <p className="text-sm text-text-muted leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

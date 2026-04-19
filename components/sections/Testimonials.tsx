'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="py-24 bg-[#FAF3EB]" ref={ref}>
      <div className="container-ivara">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="section-title">{t.testimonials.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-sm text-text-muted mb-14"
        >
          {t.testimonials.subtitle}
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.testimonials.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white rounded-ivara shadow-card p-8 flex flex-col gap-5 hover:shadow-card-hover transition-shadow duration-200 relative"
            >
              {/* Large quote mark */}
              <div
                className="absolute top-5 right-6 text-6xl text-terracotta/15 font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="text-text-primary text-base leading-relaxed font-medium relative z-10">
                &ldquo;{card.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-terracotta/30 rounded-full" />

              {/* Attribution - subreddit style, no names */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0 text-lg">
                  💬
                </div>
                <div>
                  <p className="font-semibold text-terracotta text-sm leading-none">
                    {card.role}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">Shared anonymously</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

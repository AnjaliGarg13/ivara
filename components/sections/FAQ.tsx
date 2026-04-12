'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        'w-6 h-6 rounded-full border-2 border-terracotta/30 flex items-center justify-center shrink-0 transition-all duration-200',
        open && 'border-terracotta bg-terracotta/10'
      )}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 2v8M2 6h8"
          stroke={open ? '#C4714F' : '#6B6B6B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          className={cn('transition-transform duration-200', open && 'rotate-45')}
          style={{ transformOrigin: '6px 6px' }}
        />
      </svg>
    </div>
  )
}

export default function FAQ() {
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
          <h2 className="section-title">{t.faq.title}</h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {t.faq.items.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-ivara shadow-card overflow-hidden border border-transparent data-[state=open]:border-terracotta/20 transition-all duration-200"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-inset">
                    <span className="font-semibold text-text-primary text-base leading-snug">
                      {item.q}
                    </span>
                    {/* Trigger indicator — plus becomes X when open */}
                    <div className="w-6 h-6 rounded-full border-2 border-terracotta/30 flex items-center justify-center shrink-0 group-data-[state=open]:border-terracotta group-data-[state=open]:bg-terracotta/10 transition-all duration-200">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-data-[state=open]:rotate-45"
                      >
                        <path
                          d="M6 2v8M2 6h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="text-text-muted group-data-[state=open]:text-terracotta"
                        />
                      </svg>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordionSlideDown_0.3s_ease-out] data-[state=closed]:animate-[accordionSlideUp_0.3s_ease-out]">
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-full h-px bg-surface mb-4" />
                    <p className="text-text-muted text-sm leading-relaxed">{item.a}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  )
}

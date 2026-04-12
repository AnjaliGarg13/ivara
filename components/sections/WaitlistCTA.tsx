'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import posthog from 'posthog-js'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistCTA() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'loading') return

    setState('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: 'en' }),
      })

      if (res.ok) {
        posthog.capture('waitlist_signup', { email })
        setState('success')
        setEmail('')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section
      id="waitlist"
      className="py-24 bg-gradient-ivara relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-terracotta/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/8 blur-3xl" />
      </div>

      <div className="container-ivara relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-balance">
            {t.waitlist.title}
          </h2>
          <p className="text-text-muted text-lg mb-10">{t.waitlist.subtitle}</p>

          {/* Form or success state */}
          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-ivara shadow-ivara-md p-8 flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-teal-deep/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="13" stroke="#1D4E4A" strokeWidth="1.5" />
                  <path
                    d="M8 14l4 4 8-8"
                    stroke="#1D4E4A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-text-primary font-semibold text-lg">{t.waitlist.success}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
              noValidate
            >
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === 'error') setState('idle')
                }}
                placeholder={t.waitlist.placeholder}
                required
                disabled={state === 'loading'}
                className="flex-1 px-5 py-3.5 rounded-full border-2 border-surface bg-white text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-terracotta transition-colors duration-200 disabled:opacity-60 text-base shadow-card"
              />
              <button
                type="submit"
                disabled={state === 'loading' || !email}
                className="btn-primary px-8 py-3.5 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    ...
                  </span>
                ) : (
                  t.waitlist.cta
                )}
              </button>
            </form>
          )}

          {/* Error message */}
          {state === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-3"
            >
              {t.waitlist.error}
            </motion.p>
          )}

          {/* Social proof */}
          {state !== 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mt-8"
            >
              {/* Avatar stack */}
              <div className="flex items-center">
                {['P', 'S', 'D', 'A'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-terracotta/15 border-2 border-white flex items-center justify-center text-xs font-bold text-terracotta"
                    style={{ marginLeft: i > 0 ? '-8px' : '0' }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-muted font-medium">{t.waitlist.social}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  kicker: string
  title: ReactNode
  lead?: string
}

export default function ContentV2Hero({ kicker, title, lead }: Props) {
  return (
    <section className="content-v2-hero border-b" style={{ borderColor: 'var(--v2-border-s, var(--border))' }}>
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="about-kicker"
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="mt-4 max-w-5xl text-4xl font-semibold uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {lead ? (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="about-lead mt-6 max-w-2xl text-base md:text-lg"
          >
            {lead}
          </motion.p>
        ) : null}
      </div>
    </section>
  )
}

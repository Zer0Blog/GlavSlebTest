'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { assetUrl } from '@/lib/base-path'

type Props = {
  kicker?: string
  title: ReactNode
  lead?: string
  videoSrc?: string
  imageSrc?: string
}

export default function ContentV2Hero({ kicker, title, lead, videoSrc, imageSrc }: Props) {
  const hasMediaBg = Boolean(videoSrc || imageSrc)

  return (
    <section
      className={`content-v2-hero ${hasMediaBg ? 'content-v2-hero--media relative min-h-screen overflow-hidden' : 'border-b'}`}
      style={hasMediaBg ? undefined : { borderColor: 'var(--v2-border-s, var(--border))' }}
    >
      {hasMediaBg ? (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            {imageSrc ? (
              <img
                src={assetUrl(imageSrc)}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
                <source src={assetUrl(videoSrc!)} type="video/mp4" />
              </video>
            )}
          </motion.div>
          <div className="content-v2-hero__scrim absolute inset-0 bg-black/45" aria-hidden />
          <div className="about-hero-gradient absolute inset-0" aria-hidden />
        </>
      ) : null}

      <div
        className={
          hasMediaBg
            ? 'relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-24 sm:px-10 md:px-14 md:pb-20 lg:px-16'
            : 'relative mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16'
        }
      >
        {kicker ? (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="about-kicker"
          >
            {kicker}
          </motion.p>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className={`max-w-5xl text-4xl font-semibold uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl md:text-6xl lg:text-7xl ${kicker ? 'mt-4' : 'mt-0'}`}
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

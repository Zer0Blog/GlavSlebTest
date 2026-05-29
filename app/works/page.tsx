'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ContentV2Hero from '@/components/ui/ContentV2Hero'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../modern-home.css'
import '../v2/home-v2.css'
import '../content-pages-v2.css'

const VIEWPORT = { once: true, amount: 0.2 } as const

const WORKS = [
  { id: 1, title: 'Обеденный стол', species: 'Дуб черешчатый', size: '200×90 см', woodClass: 'wood-3', category: 'Столы' },
  { id: 2, title: 'Барная стойка', species: 'Секвойя', size: '320×60 см', woodClass: 'wood-1', category: 'Барные' },
  { id: 3, title: 'Столешница', species: 'Платан', size: '180×80 см', woodClass: 'wood-2', category: 'Столешницы' },
  { id: 4, title: 'Журнальный стол', species: 'Кедр', size: '120×70 см', woodClass: 'wood-1', category: 'Столы' },
  { id: 5, title: 'Кухонная столешница', species: 'Ясень', size: '240×65 см', woodClass: 'wood-3', category: 'Столешницы' },
  { id: 6, title: 'Консоль', species: 'Орех', size: '160×40 см', woodClass: 'wood-2', category: 'Другое' },
  { id: 7, title: 'Столешница-эпоксид', species: 'Дуб + эпоксид', size: '200×90 см', woodClass: 'wood-3', category: 'Столешницы' },
  { id: 8, title: 'Стол-река', species: 'Платан', size: '280×100 см', woodClass: 'wood-1', category: 'Столы' },
]

const CATS = ['Все', 'Столы', 'Столешницы', 'Барные', 'Другое']

export default function WorksPage() {
  const [activeCat, setActiveCat] = useState('Все')
  const filtered = activeCat === 'Все' ? WORKS : WORKS.filter((w) => w.category === activeCat)

  return (
    <V2PageShell variant="standalone">
      <div className="about-page works-v2-page">
        <ContentV2Hero
          kicker="Наши работы"
          title={
            <>
              Готовые
              <br />
              <span className="content-v2-hero-accent">изделия</span>
            </>
          }
          lead="Столы, столешницы и изделия на заказ из наших слэбов"
        />

        <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:px-16 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="mb-8 flex flex-wrap gap-2 md:mb-12"
          >
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCat(c)}
                className="content-v2-chip text-[12px] tracking-[.08em] uppercase px-4 py-2 transition-all sm:px-5"
                style={{
                  background: activeCat === c ? 'rgba(196,131,42,.08)' : 'transparent',
                  border: `1px solid ${activeCat === c ? 'var(--accent)' : 'var(--border)'}`,
                  color: activeCat === c ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {c}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="group relative min-h-[220px] cursor-pointer overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  background: 'var(--bg2)',
                  borderRadius: 'var(--v2-radius-md, 12px)',
                }}
              >
                <div className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${w.woodClass}`} />
                <div
                  className="absolute inset-0 opacity-70 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(14,12,10,.9) 0%, transparent 50%)' }}
                />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                  <span
                    className="content-v2-chip about-step-label px-2.5 py-1 text-[10px]"
                    style={{
                      background: 'rgba(14,12,10,.7)',
                      border: '1px solid var(--accent)',
                    }}
                  >
                    {w.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 translate-y-0 p-4 opacity-100 transition-all duration-300 sm:p-6 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="content-v2-card-title mb-1">{w.title}</p>
                  <p className="about-body text-[13px]">
                    {w.species} · {w.size}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="content-v2-panel about-section--alt mt-12 border p-8 text-center md:mt-16 md:p-12"
            style={{ borderColor: 'var(--v2-border-s, var(--border))' }}
          >
            <h2 className="about-kicker about-kicker--section">Под заказ</h2>
            <p className="content-v2-section-lead mt-4">Хотите изделие под заказ?</p>
            <p className="about-body mx-auto mt-4 max-w-lg text-[15px] leading-relaxed md:text-base">
              Сделаем стол, столешницу или любое другое изделие из понравившегося слэба. Под ваши размеры и задачу.
            </p>
            <Link href="/contacts" className="btn-primary mt-8 inline-flex">
              Обсудить проект
            </Link>
          </motion.div>
        </section>
      </div>
    </V2PageShell>
  )
}

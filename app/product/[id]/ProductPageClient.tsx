'use client'

import { useState } from 'react'
import Link from 'next/link'
import SlabCard from '@/components/ui/SlabCard'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../../modern-home.css'
import '../../v2/home-v2.css'
import '../../content-pages-v2.css'

const SPECS = [
  { label: 'Длина', value: '240 см' },
  { label: 'Ширина', value: '96 см' },
  { label: 'Толщина', value: '8 см' },
  { label: 'Вес', value: '~180 кг' },
  { label: 'Сушка', value: 'Камерная, 2 года' },
  { label: 'Влажность', value: '8–10%' },
  { label: 'Торцы', value: 'Залиты эпоксидом' },
  { label: 'Наличие', value: 'На складе', accent: true },
]

const THUMBS = ['wood-3', 'wood-1', 'wood-2', 'wood-3']

const RELATED = [
  { id: '1248', species: 'Дуб черешчатый', size: '195×80×6 см', price: '62 000 ₽', woodClass: 'wood-1' },
  { id: '1205', species: 'Дуб черешчатый', size: '220×92×7 см', price: '78 000 ₽', woodClass: 'wood-2' },
  { id: '1190', species: 'Дуб черешчатый', size: '260×105×9 см', price: '95 000 ₽', woodClass: 'wood-3' },
  { id: '1175', species: 'Дуб черешчатый', size: '180×72×5 см', price: '48 000 ₽', woodClass: 'wood-1' },
]

const RELATED_IMAGES = [
  '/media/catalog-1.png',
  '/media/catalog-2.png',
  '/media/catalog-3.jpg',
  '/media/catalog-4.png',
] as const

export default function ProductPageClient() {
  const [activeThumb, setActiveThumb] = useState(0)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  return (
    <V2PageShell variant="standalone">
      <div className="about-page product-v2-page">
        <div className="product-v2-layout flex flex-col lg:grid lg:grid-cols-[1fr_minmax(320px,420px)]">
          <div className="product-v2-gallery" style={{ background: 'var(--v2-bg-alt)' }}>
            <div className="h-[45vh] sm:h-[50vh] lg:h-[70vh]">
              <div className={`h-full w-full ${THUMBS[activeThumb]}`} />
            </div>
            <div className="flex gap-0.5 p-0.5" style={{ background: 'var(--v2-bg)' }}>
              {THUMBS.map((cls, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  className={`h-14 flex-1 transition-all sm:h-20 ${cls}`}
                  style={{
                    border: i === activeThumb ? '2px solid var(--v2-accent)' : '2px solid transparent',
                    opacity: i === activeThumb ? 1 : 0.6,
                  }}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            className="product-v2-info flex flex-col px-5 py-8 sm:px-8 lg:max-h-[calc(100vh-var(--nav-h))] lg:overflow-y-auto lg:px-10 lg:py-14"
            style={{ background: 'var(--v2-bg-alt)' }}
          >
            <p className="mb-6 text-[12px] tracking-wider lg:mb-8" style={{ color: 'var(--v2-muted)' }}>
              <Link href="/catalog" className="transition-colors hover:text-[var(--v2-text)]">
                Каталог
              </Link>
              {' · '}
              <Link href="/catalog?breed=oak" className="transition-colors hover:text-[var(--v2-text)]">
                Дуб
              </Link>
              {' · '}
              <span style={{ color: 'var(--v2-accent)' }}>Слэб #1247</span>
            </p>

            <span
              className="mb-4 inline-flex items-center gap-2 self-start px-3.5 py-1.5 text-[12px] uppercase tracking-[0.08em] sm:mb-5"
              style={{
                background: 'var(--v2-card-2)',
                border: '1px solid var(--v2-border-s)',
                color: 'var(--v2-accent)',
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--v2-accent)' }} />
              Дуб черешчатый
            </span>

            <h1
              className="mb-2 text-3xl font-semibold uppercase tracking-[0.04em] sm:text-4xl"
              style={{ color: 'var(--v2-text)' }}
            >
              Слэб #1247
            </h1>
            <p className="mb-6 text-sm sm:mb-8" style={{ color: 'var(--v2-muted)' }}>
              Аварийное дерево, ул. Навагинская, Сочи · 2021 год
            </p>

            <p className="mb-2 text-2xl font-semibold sm:text-3xl" style={{ color: 'var(--v2-gold)' }}>
              85 000 ₽
            </p>
            <p className="mb-6 text-[12px] sm:mb-9" style={{ color: 'var(--v2-muted)' }}>
              Цена за слэб. Обработка маслом — по запросу.
            </p>

            <div
              className="mb-6 grid grid-cols-2 gap-px sm:mb-9"
              style={{ background: 'var(--v2-border-s)', border: '1px solid var(--v2-border-s)' }}
            >
              {SPECS.map(s => (
                <div
                  key={s.label}
                  className="px-4 py-3 sm:px-5 sm:py-4"
                  style={{ background: 'var(--v2-bg-alt)' }}
                >
                  <p
                    className="mb-1 text-[11px] uppercase tracking-[0.1em] sm:mb-1.5"
                    style={{ color: 'var(--v2-dim)' }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-[14px] font-medium sm:text-[15px]"
                    style={{ color: s.accent ? '#6BBF6B' : 'var(--v2-text)' }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mb-6 p-4 text-[13px] leading-[1.7] sm:mb-9 sm:p-5"
              style={{
                background: 'var(--v2-card-2)',
                border: '1px solid var(--v2-border-s)',
                color: 'var(--v2-muted)',
              }}
            >
              Этот дуб рос в центре Сочи более 80 лет. Выраженные годовые кольца, живые края, тёмный
              сердцевинный оттенок. Идеально для обеденного стола или барной стойки.
            </div>

            <div className="mt-auto border-t pt-6 sm:pt-8" style={{ borderColor: 'var(--v2-border-s)' }}>
              <p className="mb-4 text-[13px] font-medium tracking-wider sm:mb-5" style={{ color: 'var(--v2-text)' }}>
                Оставить заявку на этот слэб
              </p>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--v2-dim)' }}>
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                className="product-v2-input mb-3 w-full px-4 py-3.5 text-sm"
              />
              <label className="mb-2 block text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--v2-dim)' }}>
                Телефон или Telegram
              </label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="+7 или @username"
                className="product-v2-input mb-4 w-full px-4 py-3.5 text-sm"
              />
              <button type="button" className="v2-btn w-full">
                Хочу этот слэб
              </button>
              <p className="mt-3 text-center text-[12px]" style={{ color: 'var(--v2-dim)' }}>
                Ответим в течение часа · Доставка по всей России
              </p>
            </div>
          </div>
        </div>

        <section
          className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-16 lg:py-20"
          style={{ background: 'var(--v2-bg)' }}
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div>
              <p className="about-kicker about-kicker--section">Похожие слэбы</p>
              <h2 className="mt-3 text-2xl leading-tight md:text-3xl" style={{ color: 'var(--v2-text)' }}>
                Другие <span style={{ color: 'var(--v2-gold)' }}>дубовые</span> слэбы
              </h2>
            </div>
            <Link
              href="/catalog?breed=oak"
              className="about-link inline-block border-b pb-2 text-sm uppercase tracking-[0.14em]"
            >
              Все дубы →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {RELATED.map((s, i) => (
              <SlabCard key={s.id} {...s} image={RELATED_IMAGES[i % RELATED_IMAGES.length]} />
            ))}
          </div>
        </section>
      </div>
    </V2PageShell>
  )
}

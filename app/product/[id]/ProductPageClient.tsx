'use client'

import { useState } from 'react'
import Link from 'next/link'
import SlabCard from '@/components/ui/SlabCard'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import { assetUrl } from '@/lib/base-path'
import '../../modern-home.css'
import '../../v2/home-v2.css'
import '../../content-pages-v2.css'
import './product-page.css'

/* ─── Data ─── */

const SPECS = [
  { label: 'Размер', value: '240×96×8 см' },
  { label: 'Вес', value: '~180 кг' },
  { label: 'Сушка', value: 'Камерная, 2 года' },
  { label: 'Наличие', value: 'На складе', accent: true },
]

const GALLERY_IMAGES = [
  '/media/slab-main.jpg',
  '/media/slab-thumb-1.jpg',
  '/media/slab-thumb-2.jpg',
  '/media/slab-thumb-3.jpg',
]

const RELATED = [
  { id: '1248', species: 'Дуб черешчатый', size: '195×80×6 см', price: '62 000 ₽', image: '/media/catalog-1.png' },
  { id: '1205', species: 'Дуб черешчатый', size: '220×92×7 см', price: '78 000 ₽', image: '/media/catalog-2.png' },
  { id: '1190', species: 'Дуб черешчатый', size: '260×105×9 см', price: '95 000 ₽', image: '/media/catalog-3.jpg' },
  { id: '1175', species: 'Дуб черешчатый', size: '180×72×5 см', price: '48 000 ₽', image: '/media/catalog-4.png' },
]

const FEATURES = [
  { label: 'Камерная сушка', desc: '2 года, влажность 8–10%' },
  { label: 'Доставка по РФ', desc: 'Бережная транспортировка' },
  { label: 'Ручной отбор', desc: 'Каждый слэб уникален' },
  { label: 'Обработка', desc: 'Масло, эпоксид, шлифовка' },
]

/* ─── Component ─── */

export default function ProductPageClient() {
  const [activeThumb, setActiveThumb] = useState(0)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [formSent, setFormSent] = useState(false)

  const handleSubmit = () => {
    if (name.trim() && contact.trim()) {
      setFormSent(true)
      setTimeout(() => setFormSent(false), 3000)
    }
  }

  return (
    <V2PageShell variant="standalone">
      <div className="product-v2-page">
      {/* ── Product layout ── */}
      <div className="product-v2-layout flex flex-col lg:grid lg:items-stretch lg:grid-cols-[1fr_minmax(320px,420px)]">

        {/* ── Gallery ── */}
        <div className="pp-gallery" style={{ background: 'var(--v2-bg-alt)' }}>
          {/* Main image */}
          <div className="pp-gallery-main relative h-[45vh] sm:h-[50vh] overflow-hidden">
            <img
              key={activeThumb}
              src={assetUrl(GALLERY_IMAGES[activeThumb])}
              alt={`Слэб #1247 — фото ${activeThumb + 1}`}
              className="absolute inset-0 h-full w-full object-cover pp-fade-in"
            />
            <div className="pp-gallery-nav-scrim pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24"
              style={{ background: 'linear-gradient(transparent, var(--v2-bg-alt))' }}
            />
          </div>

          {/* Thumbnails */}
          <div className="pp-gallery-thumbs flex gap-1 p-1" style={{ background: 'var(--v2-bg)' }}>
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveThumb(i)}
                className="pp-gallery-thumb relative h-20 flex-1 overflow-hidden transition-all duration-200 sm:h-24 md:h-28 lg:h-28"
                style={{
                  border: i === activeThumb ? '2px solid var(--v2-accent)' : '2px solid transparent',
                  opacity: i === activeThumb ? 1 : 0.5,
                }}
                aria-label={`Фото ${i + 1}`}
              >
                <img src={assetUrl(img)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product info panel ── */}
        <div
          className="product-v2-info flex flex-col px-5 py-8 sm:px-8 lg:h-full lg:px-10 lg:py-0"
          style={{ background: 'var(--v2-bg-alt)' }}
        >
          {/* Breadcrumbs */}
          <p className="mb-4 text-[12px] tracking-wider" style={{ color: 'var(--v2-muted)' }}>
            <Link href="/catalog" className="transition-colors hover:text-[var(--v2-text)]">
              Каталог
            </Link>
            <span className="mx-2">·</span>
            <Link href="/catalog?breed=oak" className="transition-colors hover:text-[var(--v2-text)]">
              Дуб
            </Link>
            <span className="mx-2">·</span>
            <span style={{ color: 'var(--v2-accent)' }}>Слэб #1247</span>
          </p>

          {/* Title */}
          <h1
            className="mb-2 text-3xl font-semibold uppercase tracking-[0.04em] sm:text-4xl"
            style={{ color: 'var(--v2-text)' }}
          >
            Слэб #1247
          </h1>

          {/* Subtitle */}
          <p className="mb-5 text-sm font-light" style={{ color: 'var(--v2-muted)' }}>
            Дуб черешчатый · Аварийное дерево, ул. Навагинская, Сочи · 2021 год
          </p>

          {/* Price */}
          <p className="mb-2 text-2xl font-semibold sm:text-3xl" style={{ color: 'var(--v2-gold)' }}>
            85 000 ₽
          </p>
          <p className="mb-5 text-[12px] font-light" style={{ color: 'var(--v2-muted)' }}>
            Цена за слэб. Обработка маслом — по запросу.
          </p>

          {/* Specs grid */}
          <div
            className="pp-specs-grid mb-5 grid grid-cols-2 gap-px overflow-hidden"
            style={{ background: 'var(--v2-border-s)', border: '1px solid var(--v2-border-s)' }}
          >
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="px-4 py-3 sm:px-5"
                style={{ background: 'var(--v2-bg-alt)' }}
              >
                <p
                  className="mb-1 text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: 'var(--v2-dim)' }}
                >
                  {s.label}
                </p>
                <p
                  className="text-[14px] font-medium"
                  style={{ color: s.accent ? '#6BBF6B' : 'var(--v2-text)' }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            className="pp-description mb-5 p-4 text-[13px] leading-[1.75] font-light sm:p-5"
            style={{
              background: 'var(--v2-card-2)',
              border: '1px solid var(--v2-border-s)',
              color: 'var(--v2-muted)',
            }}
          >
            Этот дуб рос в центре Сочи более 80 лет. Выраженные годовые кольца, живые края, тёмный
            сердцевинный оттенок. Идеально для обеденного стола или барной стойки.
          </div>

          {/* ── Form ── */}
          <div
            className="pp-form mt-auto border p-4 sm:p-5"
            style={{
              background: 'var(--v2-card-2)',
              borderColor: 'var(--v2-border-s)',
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              className="product-v2-input mb-3 w-full px-4 py-3 text-sm"
            />

            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Телефон или Telegram"
              className="product-v2-input mb-4 w-full px-4 py-3 text-sm"
            />

            <button
              type="button"
              onClick={handleSubmit}
              className="v2-btn w-full transition-colors duration-200"
              style={formSent ? { background: '#6BBF6B', borderColor: '#6BBF6B' } : undefined}
            >
              {formSent ? '✓ Заявка отправлена' : 'Хочу этот слэб'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      <section
        className="py-16 sm:py-20 lg:py-28"
        style={{ background: 'var(--v2-bg)' }}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ color: 'var(--v2-accent)' }}
              >
                Похожие слэбы
              </p>
              <h2
                className="mt-3 text-2xl font-semibold uppercase tracking-wide md:text-3xl"
                style={{ color: 'var(--v2-text)' }}
              >
                Другие{' '}
                <span style={{ color: 'var(--v2-gold)' }}>дубовые</span>{' '}
                слэбы
              </h2>
            </div>
            <Link
              href="/catalog?breed=oak"
              className="border-b pb-2 text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 about-link"
            >
              Все дубы →
            </Link>
          </div>

          <div className="pp-related-grid grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
            {RELATED.map((s) => (
              <SlabCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section
        className="pp-features border-y py-12 sm:py-16 lg:py-20"
        style={{ background: 'var(--v2-bg-alt)', borderColor: 'var(--v2-border-s)' }}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <div className="pp-features-grid grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="pp-feature-box v2-stat-box">
                <div className="v2-stat-body">
                  <p className="pp-feature-title">{f.label}</p>
                  <p className="pp-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </V2PageShell>
  )
}

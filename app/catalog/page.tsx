'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import SlabCard from '@/components/ui/SlabCard'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import { assetUrl } from '@/lib/base-path'
import '../modern-home.css'
import '../v2/home-v2.css'
import '../content-pages-v2.css'

const VIEWPORT = { once: true, amount: 0.2 } as const

const CATALOG_IMAGES = [
  '/media/catalog-1.png',
  '/media/catalog-2.png',
  '/media/catalog-3.jpg',
  '/media/catalog-4.png',
  '/media/catalog-5.png',
  '/media/catalog-6.png',
] as const

const ALL_SLABS = [
  { id: '1247', species: 'Дуб', size: '240×96×8 см', price: '85 000 ₽', woodClass: 'wood-3' },
  { id: '0891', species: 'Платан', size: '180×74×6 см', price: '62 000 ₽', woodClass: 'wood-1' },
  { id: '0534', species: 'Кедр', size: '210×88×7 см', price: '74 000 ₽', woodClass: 'wood-2' },
  { id: '0712', species: 'Секвойя', size: '320×110×9 см', price: '120 000 ₽', woodClass: 'wood-3' },
  { id: '1102', species: 'Ясень', size: '195×82×5 см', price: '48 000 ₽', woodClass: 'wood-1' },
  { id: '1190', species: 'Дуб', size: '260×105×9 см', price: '95 000 ₽', woodClass: 'wood-3' },
  { id: '0920', species: 'Платан', size: '200×88×7 см', price: '70 000 ₽', woodClass: 'wood-2' },
  { id: '0601', species: 'Кедр', size: '185×76×6 см', price: '58 000 ₽', woodClass: 'wood-1' },
  { id: '1175', species: 'Дуб', size: '180×72×5 см', price: '48 000 ₽', woodClass: 'wood-1' },
  { id: '0333', species: 'Ясень', size: '220×90×6 см', price: '55 000 ₽', woodClass: 'wood-2' },
  { id: '0450', species: 'Секвойя', size: '290×98×8 см', price: '110 000 ₽', woodClass: 'wood-3' },
  { id: '0780', species: 'Дуб', size: '200×84×7 см', price: '76 000 ₽', woodClass: 'wood-2' },
]

const BREEDS = ['Все породы', 'Дуб', 'Платан', 'Кедр', 'Секвойя', 'Ясень']
const THICKNESS = ['Любая', 'До 5 см', '5–8 см', 'Более 8 см']
const STOCK = ['Все', 'На складе', 'Под заказ']
const SORT = ['По умолчанию', 'Сначала дешевле', 'Сначала дороже', 'По размеру']

type FilterOptionProps = { label: string; active: boolean; onClick: () => void }
function FilterOption({ label, active, onClick }: FilterOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`catalog-v2-filters__option${active ? ' is-active' : ''}`}
    >
      {label}
    </button>
  )
}

function FiltersPanel({
  breed,
  setBreed,
  thickness,
  setThickness,
  stock,
  setStock,
}: {
  breed: string
  setBreed: (v: string) => void
  thickness: string
  setThickness: (v: string) => void
  stock: string
  setStock: (v: string) => void
}) {
  return (
    <div className="catalog-v2-filters">
      <div className="catalog-v2-filters__group">
        <p className="catalog-v2-filters__label">Порода</p>
        <div className="catalog-v2-filters__list">
          {BREEDS.map((b) => (
            <FilterOption key={b} label={b} active={breed === b} onClick={() => setBreed(b)} />
          ))}
        </div>
      </div>

      <div className="catalog-v2-filters__group">
        <p className="catalog-v2-filters__label">Наличие</p>
        <div className="catalog-v2-filters__list">
          {STOCK.map((s) => (
            <FilterOption key={s} label={s} active={stock === s} onClick={() => setStock(s)} />
          ))}
        </div>
      </div>

      <div className="catalog-v2-filters__group">
        <p className="catalog-v2-filters__label">Толщина</p>
        <div className="catalog-v2-filters__list">
          {THICKNESS.map((t) => (
            <FilterOption key={t} label={t} active={thickness === t} onClick={() => setThickness(t)} />
          ))}
        </div>
      </div>

      <div className="catalog-v2-filters__group catalog-v2-filters__group--last">
        <p className="catalog-v2-filters__label">Длина, см</p>
        <div className="catalog-v2-filters__range">
          <input type="number" placeholder="от" className="catalog-v2-filters__input" />
          <input type="number" placeholder="до" className="catalog-v2-filters__input" />
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const [breed, setBreed] = useState('Все породы')
  const [thickness, setThickness] = useState('Любая')
  const [stock, setStock] = useState('Все')
  const [sort, setSort] = useState('По умолчанию')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = ALL_SLABS.filter((s) => breed === 'Все породы' || s.species === breed)
  const hasActiveFilters = breed !== 'Все породы' || thickness !== 'Любая' || stock !== 'Все'

  useEffect(() => {
    if (!filtersOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [filtersOpen])

  return (
    <V2PageShell variant="standalone">
      <div className="about-page catalog-v2-page">
        <section className="contacts-hero relative min-h-[78vh] overflow-hidden md:min-h-[82vh]">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={assetUrl('/media/banner_dark.png')}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: '70% center' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/45" aria-hidden />
          <div className="contacts-hero-gradient absolute inset-0" aria-hidden />

          <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[1440px] flex-col justify-end px-6 pb-14 pt-0 sm:px-10 md:min-h-[82vh] md:px-14 md:pb-16 lg:px-16">
            <motion.p
              className="contacts-hero-kicker mb-4 text-[11px] font-semibold uppercase tracking-[0.36em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Каталог
            </motion.p>
            <motion.h1
              className="contacts-hero-h1 mt-0 max-w-5xl font-semibold uppercase leading-[0.95] tracking-[0.04em]"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)' }}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            >
              Все слэбы
              <br />
              <span className="contacts-hero-h1-accent font-medium" style={{ letterSpacing: '0.06em' }}>
                в наличии
              </span>
            </motion.h1>
            <motion.p
              className="contacts-hero-lead mt-6 max-w-2xl font-light"
              style={{ fontSize: 'clamp(14px, 1.45vw, 17px)', lineHeight: 1.75 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              1 047 слэбов на складе в Сочи
            </motion.p>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="catalog-v2-body mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-10 md:px-14 md:pb-16 lg:px-16"
        >
          <div className="catalog-v2-body__layout flex flex-col lg:flex-row lg:gap-10 xl:gap-12">
            <aside className="catalog-v2-sidebar hidden flex-shrink-0 lg:block lg:w-[220px] xl:w-[240px]">
              <FiltersPanel
                breed={breed}
                setBreed={setBreed}
                thickness={thickness}
                setThickness={setThickness}
                stock={stock}
                setStock={setStock}
              />
            </aside>

            <div className="catalog-v2-main min-w-0 flex-1 py-6 md:py-8 lg:py-10">
              <div className="catalog-v2-toolbar">
                <p className="catalog-v2-toolbar__count" aria-live="polite">
                  <span className="catalog-v2-toolbar__count-num">{filtered.length}</span>
                  <span className="catalog-v2-toolbar__count-sep">/</span>
                  <span className="catalog-v2-toolbar__count-total">{'1\u00a0047'}</span>
                  <span className="catalog-v2-toolbar__count-unit">слэбов</span>
                </p>

                <div className="catalog-v2-toolbar__controls">
                  <button
                    type="button"
                    className="catalog-v2-filters-open lg:hidden"
                    onClick={() => setFiltersOpen(true)}
                    aria-expanded={filtersOpen}
                  >
                    <SlidersHorizontal size={15} strokeWidth={1.75} aria-hidden />
                    <span>Фильтры</span>
                    {hasActiveFilters ? <span className="catalog-v2-filters-open__dot" aria-hidden /> : null}
                  </button>

                  <label className="catalog-v2-sort" htmlFor="catalog-sort">
                    <span className="catalog-v2-sort__label">Сортировка</span>
                    <select
                      id="catalog-sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="catalog-v2-sort__select"
                      aria-label="Порядок сортировки слэбов"
                    >
                      {SORT.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease: 'easeOut' }}
                  className="overflow-hidden"
                  style={{ borderRadius: 'var(--v2-radius-md, 12px)' }}
                >
                  <SlabCard {...s} image={CATALOG_IMAGES[i % CATALOG_IMAGES.length]} />
                </motion.div>
              ))}
              </div>

              <div className="mt-10 text-center md:mt-12">
                <button type="button" className="about-link inline-block border-b pb-2 text-sm uppercase tracking-[0.14em]">
                  Загрузить ещё 24 слэба
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <AnimatePresence>
          {filtersOpen ? (
            <div className="catalog-v2-filters-sheet lg:hidden" role="dialog" aria-modal="true" aria-label="Фильтры каталога">
              <motion.button
                type="button"
                className="catalog-v2-filters-sheet__backdrop"
                aria-label="Закрыть фильтры"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setFiltersOpen(false)}
              />
              <motion.div
                className="catalog-v2-drawer"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="catalog-v2-drawer__head">
                  <p className="catalog-v2-drawer__title">Фильтры</p>
                  <button
                    type="button"
                    className="catalog-v2-drawer__close"
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Закрыть"
                  >
                    <X size={20} />
                  </button>
                </div>
                <FiltersPanel
                  breed={breed}
                  setBreed={setBreed}
                  thickness={thickness}
                  setThickness={setThickness}
                  stock={stock}
                  setStock={setStock}
                />
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="catalog-v2-drawer__apply v2-btn w-full"
                >
                  Показать {filtered.length} слэбов
                </button>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </V2PageShell>
  )
}

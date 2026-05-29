'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import SlabCard from '@/components/ui/SlabCard'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../modern-home.css'
import '../v2/home-v2.css'
import './catalog.css'

const VIEWPORT = { once: true, amount: 0.2 } as const

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

type FilterBtnProps = { label: string; active: boolean; onClick: () => void }
function FilterBtn({ label, active, onClick }: FilterBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-[12px] tracking-[.08em] uppercase px-4 py-2.5 transition-all duration-200"
      style={{
        background: active ? 'rgba(196,131,42,.06)' : 'transparent',
        border: `0.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        color: active ? 'var(--accent)' : 'var(--muted)',
      }}>
      {label}
    </button>
  )
}

function FiltersPanel({
  breed, setBreed, thickness, setThickness, stock, setStock,
}: {
  breed: string; setBreed: (v: string) => void
  thickness: string; setThickness: (v: string) => void
  stock: string; setStock: (v: string) => void
}) {
  return (
    <>
      <div className="mb-6 md:mb-7">
        <p className="text-[11px] tracking-[.1em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Порода</p>
        <div className="flex flex-col gap-1">
          {BREEDS.map(b => <FilterBtn key={b} label={b} active={breed === b} onClick={() => setBreed(b)} />)}
        </div>
      </div>
      <div className="mb-6 md:mb-7 pt-6 border-t border-[var(--border)]">
        <p className="text-[11px] tracking-[.1em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Наличие</p>
        <div className="flex flex-col gap-1">
          {STOCK.map(s => <FilterBtn key={s} label={s} active={stock === s} onClick={() => setStock(s)} />)}
        </div>
      </div>
      <div className="mb-6 md:mb-7 pt-6 border-t border-[var(--border)]">
        <p className="text-[11px] tracking-[.1em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Толщина</p>
        <div className="flex flex-col gap-1">
          {THICKNESS.map(t => <FilterBtn key={t} label={t} active={thickness === t} onClick={() => setThickness(t)} />)}
        </div>
      </div>
      <div className="pt-6 border-t border-[var(--border)]">
        <p className="text-[11px] tracking-[.1em] uppercase mb-3" style={{ color: 'var(--muted)' }}>Длина, см</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="от" className="px-3 py-2.5 text-[13px]" />
          <input type="number" placeholder="до" className="px-3 py-2.5 text-[13px]" />
        </div>
      </div>
    </>
  )
}

export default function CatalogPage() {
  const [breed, setBreed] = useState('Все породы')
  const [thickness, setThickness] = useState('Любая')
  const [stock, setStock] = useState('Все')
  const [sort, setSort] = useState('По умолчанию')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = ALL_SLABS.filter(s => breed === 'Все породы' || s.species === breed)

  return (
    <V2PageShell variant="standalone">
      <div className="catalog-v2-page">

        {/* ── Page Header ── */}
        <header className="catalog-hero relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none catalog-hero-grain" />
          <div className="absolute top-0 left-0 right-0 h-px catalog-hero-line" />
          <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-32">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="text-xs sm:text-sm uppercase tracking-[0.25em] mb-5 md:mb-6 font-medium"
                style={{ color: 'var(--accent)' }}
              >
                Каталог
              </motion.p>
              <div className="w-12 h-px mb-7 md:mb-8" style={{ background: 'var(--accent)' }} />
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6 md:mb-8"
                style={{ color: 'var(--text)' }}
              >
                Все слэбы{' '}
                <em className="font-display italic" style={{ color: 'var(--gold)' }}>
                  в наличии
                </em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="text-base md:text-lg leading-relaxed font-light max-w-xl"
                style={{ color: 'var(--muted)' }}
              >
                1 047 слэбов на складе в Сочи · Обновляется еженедельно
              </motion.p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none catalog-hero-fade" />
        </header>

        {/* ── Filters + Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row"
        >
          <aside
            className="hidden lg:block w-[260px] xl:w-[280px] flex-shrink-0 px-6 xl:px-7 py-8"
            style={{ background: 'var(--bg2)', borderRight: '0.5px solid var(--border)' }}
          >
            <p className="kicker !tracking-[.12em] mb-6 md:mb-7">Фильтры</p>
            <FiltersPanel breed={breed} setBreed={setBreed} thickness={thickness} setThickness={setThickness} stock={stock} setStock={setStock} />
          </aside>

          <div className="flex-1 container-page lg:max-w-none lg:px-6 xl:px-8 py-6 md:py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 md:mb-6">
              <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
                Показано {filtered.length} из 1047
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-[12px] tracking-[.08em] uppercase px-4 py-2.5 flex-1 sm:flex-none justify-center"
                  style={{ border: '0.5px solid var(--border)', color: 'var(--text)' }}
                >
                  <SlidersHorizontal size={16} />
                  Фильтры
                </button>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="px-3 py-2.5 text-[13px] cursor-pointer flex-1 sm:flex-none min-w-[160px]"
                  style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--text)' }}
                >
                  {SORT.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-0.5">
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease: 'easeOut' }}
                >
                  <SlabCard {...s} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <button type="button" className="btn-ghost pb-0.5">
                Загрузить ещё 24 слэба
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile filters drawer ── */}
        {filtersOpen && (
          <div className="fixed inset-0 z-[150] lg:hidden" style={{ background: 'rgba(0,0,0,.75)' }}>
            <div
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto p-6"
              style={{ background: 'var(--bg2)', borderTop: '0.5px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="kicker">Фильтры</p>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Закрыть фильтры">
                  <X size={22} style={{ color: 'var(--text)' }} />
                </button>
              </div>
              <FiltersPanel breed={breed} setBreed={setBreed} thickness={thickness} setThickness={setThickness} stock={stock} setStock={setStock} />
              <button type="button" onClick={() => setFiltersOpen(false)} className="btn-primary w-full mt-6">
                Показать {filtered.length} слэбов
              </button>
            </div>
          </div>
        )}

      </div>
    </V2PageShell>
  )
}

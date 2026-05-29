'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import SlabCard from '@/components/ui/SlabCard'
import ContentV2Hero from '@/components/ui/ContentV2Hero'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../modern-home.css'
import '../v2/home-v2.css'
import '../content-pages-v2.css'

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
      className="content-v2-filter-btn w-full text-left text-[12px] tracking-[.08em] uppercase px-4 py-2.5 transition-all duration-200"
      style={{
        background: active ? 'rgba(196,131,42,.06)' : 'transparent',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        color: active ? 'var(--accent)' : 'var(--muted)',
      }}
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
    <>
      <div className="mb-6 md:mb-7">
        <p className="about-step-label mb-3">Порода</p>
        <div className="flex flex-col gap-1.5">
          {BREEDS.map((b) => (
            <FilterBtn key={b} label={b} active={breed === b} onClick={() => setBreed(b)} />
          ))}
        </div>
      </div>
      <div className="about-border-t mb-6 md:mb-7 border-t pt-6">
        <p className="about-step-label mb-3">Наличие</p>
        <div className="flex flex-col gap-1.5">
          {STOCK.map((s) => (
            <FilterBtn key={s} label={s} active={stock === s} onClick={() => setStock(s)} />
          ))}
        </div>
      </div>
      <div className="about-border-t mb-6 md:mb-7 border-t pt-6">
        <p className="about-step-label mb-3">Толщина</p>
        <div className="flex flex-col gap-1.5">
          {THICKNESS.map((t) => (
            <FilterBtn key={t} label={t} active={thickness === t} onClick={() => setThickness(t)} />
          ))}
        </div>
      </div>
      <div className="about-border-t border-t pt-6">
        <p className="about-step-label mb-3">Длина, см</p>
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

  const filtered = ALL_SLABS.filter((s) => breed === 'Все породы' || s.species === breed)

  return (
    <V2PageShell variant="standalone">
      <div className="about-page catalog-v2-page">
        <ContentV2Hero
          kicker="Каталог"
          title={
            <>
              Все слэбы
              <br />
              <span className="content-v2-hero-accent">в наличии</span>
            </>
          }
          lead="1 047 слэбов на складе в Сочи · Обновляется еженедельно"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row"
        >
          <aside
            className="content-v2-sidebar about-section--alt hidden w-[260px] flex-shrink-0 px-6 py-8 xl:w-[280px] xl:px-7 lg:block"
          >
            <p className="about-kicker about-kicker--section mb-6 md:mb-7">Фильтры</p>
            <FiltersPanel
              breed={breed}
              setBreed={setBreed}
              thickness={thickness}
              setThickness={setThickness}
              stock={stock}
              setStock={setStock}
            />
          </aside>

          <div className="container-page flex-1 py-8 md:py-10 lg:max-w-none lg:px-8 xl:px-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 md:mb-6">
              <p className="about-body text-[13px]">Показано {filtered.length} из 1047</p>
              <div className="flex w-full items-center gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="content-v2-filter-btn flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-[12px] tracking-[.08em] uppercase sm:flex-none lg:hidden"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  <SlidersHorizontal size={16} />
                  Фильтры
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="min-w-[160px] flex-1 cursor-pointer px-3 py-2.5 text-[13px] sm:flex-none"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                >
                  {SORT.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                  <SlabCard {...s} />
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center md:mt-12">
              <button type="button" className="about-link inline-block border-b pb-2 text-sm uppercase tracking-[0.14em]">
                Загрузить ещё 24 слэба
              </button>
            </div>
          </div>
        </motion.div>

        {filtersOpen ? (
          <div className="fixed inset-0 z-[150] lg:hidden" style={{ background: 'rgba(0,0,0,.75)' }}>
            <div className="content-v2-drawer about-section--alt absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto p-6">
              <div className="mb-6 flex items-center justify-between">
                <p className="about-kicker about-kicker--section">Фильтры</p>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Закрыть фильтры">
                  <X size={22} style={{ color: 'var(--text)' }} />
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
              <button type="button" onClick={() => setFiltersOpen(false)} className="btn-primary mt-6 w-full">
                Показать {filtered.length} слэбов
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </V2PageShell>
  )
}

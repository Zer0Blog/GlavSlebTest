'use client'
import { useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'

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
  const filtered = activeCat === 'Все' ? WORKS : WORKS.filter(w => w.category === activeCat)

  return (
    <div>
      <PageHeader
        kicker="Наши работы"
        title={
          <>
            Готовые <em className="italic" style={{ color: 'var(--gold)' }}>изделия</em>
          </>
        }
        description="Столы, столешницы и изделия на заказ из наших слэбов"
      />

      <section className="container-page py-10 md:py-14 lg:py-16">
        <div className="flex gap-2 mb-8 md:mb-12 flex-wrap">
          {CATS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className="text-[12px] tracking-[.08em] uppercase px-4 sm:px-5 py-2 transition-all"
              style={{
                background: activeCat === c ? 'rgba(196,131,42,.08)' : 'transparent',
                border: `0.5px solid ${activeCat === c ? 'var(--accent)' : 'var(--border)'}`,
                color: activeCat === c ? 'var(--accent)' : 'var(--muted)',
              }}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {filtered.map(w => (
            <div
              key={w.id}
              className="group relative overflow-hidden cursor-pointer min-h-[220px]"
              style={{ aspectRatio: '4/3', background: 'var(--bg2)' }}>
              <div className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.04] ${w.woodClass}`} />
              <div
                className="absolute inset-0 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(14,12,10,.9) 0%, transparent 50%)' }}
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span
                  className="text-[10px] tracking-[.1em] uppercase px-2.5 py-1"
                  style={{
                    background: 'rgba(14,12,10,.7)',
                    color: 'var(--accent)',
                    border: '0.5px solid var(--accent)',
                  }}>
                  {w.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-0 md:translate-y-2 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                <p className="font-display text-lg sm:text-xl mb-1">{w.title}</p>
                <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
                  {w.species} · {w.size}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 md:mt-16 p-8 md:p-12 text-center"
          style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
          <h3 className="font-display text-2xl sm:text-3xl mb-3 md:mb-4">Хотите изделие под заказ?</h3>
          <p className="text-[15px] mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            Сделаем стол, столешницу или любое другое изделие из понравившегося слэба. Под ваши размеры и задачу.
          </p>
          <a href="/contacts" className="btn-primary">
            Обсудить проект
          </a>
        </div>
      </section>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import SlabCard from '@/components/ui/SlabCard'
import SectionHeader from '@/components/ui/SectionHeader'

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

export default function ProductPage() {
  const [activeThumb, setActiveThumb] = useState(0)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(320px,420px)]">
        <div style={{ background: 'var(--bg2)' }}>
          <div className="h-[45vh] sm:h-[50vh] lg:h-[70vh]">
            <div className={`w-full h-full ${THUMBS[activeThumb]}`} />
          </div>
          <div className="flex gap-0.5 p-0.5" style={{ background: 'var(--bg)' }}>
            {THUMBS.map((cls, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveThumb(i)}
                className={`flex-1 h-14 sm:h-20 transition-all ${cls}`}
                style={{
                  border: i === activeThumb ? '2px solid var(--accent)' : '2px solid transparent',
                  opacity: i === activeThumb ? 1 : 0.6,
                }}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className="flex flex-col px-5 sm:px-8 lg:px-10 py-8 lg:py-14 lg:max-h-[calc(100vh-var(--nav-h))] lg:overflow-y-auto"
          style={{ background: 'var(--bg2)' }}>
          <p className="text-[12px] tracking-wider mb-6 lg:mb-8" style={{ color: 'var(--muted)' }}>
            <Link href="/catalog" className="hover:underline hover:text-[var(--text)]">
              Каталог
            </Link>
            {' · '}
            <Link href="/catalog?breed=oak" className="hover:underline hover:text-[var(--text)]">
              Дуб
            </Link>
            {' · '}
            <span style={{ color: 'var(--accent)' }}>Слэб #1247</span>
          </p>

          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[12px] tracking-[.08em] uppercase mb-4 sm:mb-5 self-start"
            style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--accent)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            Дуб черешчатый
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-medium mb-2">Слэб #1247</h1>
          <p className="text-sm mb-6 sm:mb-8" style={{ color: 'var(--muted)' }}>
            Аварийное дерево, ул. Навагинская, Сочи · 2021 год
          </p>

          <p className="font-display text-2xl sm:text-3xl mb-2" style={{ color: 'var(--gold)' }}>
            85 000 ₽
          </p>
          <p className="text-[12px] mb-6 sm:mb-9" style={{ color: 'var(--muted)' }}>
            Цена за слэб. Обработка маслом — по запросу.
          </p>

          <div
            className="grid grid-cols-2 gap-px mb-6 sm:mb-9"
            style={{ background: 'var(--border)', border: '0.5px solid var(--border)' }}>
            {SPECS.map(s => (
              <div key={s.label} className="px-4 sm:px-5 py-3 sm:py-4" style={{ background: 'var(--bg2)' }}>
                <p className="text-[11px] tracking-[.1em] uppercase mb-1 sm:mb-1.5" style={{ color: 'var(--muted)' }}>
                  {s.label}
                </p>
                <p className="text-[14px] sm:text-[15px] font-medium" style={{ color: s.accent ? '#6BBF6B' : 'var(--text)' }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="p-4 sm:p-5 mb-6 sm:mb-9 text-[13px] leading-[1.7]"
            style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--muted)' }}>
            Этот дуб рос в центре Сочи более 80 лет. Выраженные годовые кольца, живые края, тёмный сердцевинный
            оттенок. Идеально для обеденного стола или барной стойки.
          </div>

          <div className="mt-auto pt-6 sm:pt-8 border-t border-[var(--border)]">
            <p className="text-[13px] font-medium tracking-wider mb-4 sm:mb-5">Оставить заявку на этот слэб</p>
            <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full px-4 py-3.5 text-sm mb-3"
            />
            <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
              Телефон или Telegram
            </label>
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="+7 или @username"
              className="w-full px-4 py-3.5 text-sm mb-4"
            />
            <button type="button" className="btn-primary w-full">
              Хочу этот слэб
            </button>
            <p className="text-center text-[12px] mt-3" style={{ color: 'var(--muted)' }}>
              Ответим в течение часа · Доставка по всей России
            </p>
          </div>
        </div>
      </div>

      <section className="container-page py-12 md:py-16 lg:py-20" style={{ background: 'var(--bg2)' }}>
        <SectionHeader
          kicker="Похожие слэбы"
          title={
            <>
              Другие <em className="italic" style={{ color: 'var(--gold)' }}>дубовые</em> слэбы
            </>
          }
          href="/catalog?breed=oak"
          linkLabel="Все дубы →"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0.5">
          {RELATED.map(s => (
            <SlabCard key={s.id} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}

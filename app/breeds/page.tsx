'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../modern-home.css'
import '../v2/home-v2.css'
import './breeds.css'

const VIEWPORT = { once: true, amount: 0.25 } as const

const BREEDS = [
  {
    id: 'oak',
    abbr: 'Дб',
    name: 'Дуб черешчатый',
    lat: 'Quercus robur',
    hardness: '3.7 кН',
    color: '#8B6240',
    count: 312,
    desc: 'Самая распространённая и востребованная порода в нашем производстве. Плотная, твёрдая древесина с выраженным рисунком годовых колец. Оттенки от светло-янтарного до глубокого тёмно-коричневого. Со временем темнеет, приобретая благородную патину.',
    woodClass: 'wood-3',
  },
  {
    id: 'cedar',
    abbr: 'Кд',
    name: 'Кедр ливанский',
    lat: 'Cedrus libani',
    hardness: '2.4 кН',
    color: '#C49A6C',
    count: 89,
    desc: 'Ароматная смолистая древесина с золотисто-розовым оттенком. Лёгкий вес при хорошей прочности. Естественная устойчивость к влаге и насекомым. Каждый слэб наполнен живым ароматом.',
    woodClass: 'wood-2',
  },
  {
    id: 'plane',
    abbr: 'Пл',
    name: 'Платан восточный',
    lat: 'Platanus orientalis',
    hardness: '3.1 кН',
    color: '#A07850',
    count: 145,
    desc: 'Редкая порода с уникальным мраморным рисунком — переплетение светлых и тёмных прожилок создаёт неповторимый узор. Каждый слэб платана совершенно уникален. Высоко ценится дизайнерами.',
    woodClass: 'wood-1',
  },
  {
    id: 'sequoia',
    abbr: 'Св',
    name: 'Секвойя',
    lat: 'Sequoiadendron giganteum',
    hardness: '2.2 кН',
    color: '#7A4030',
    count: 54,
    desc: 'Древесина самых больших деревьев на планете. Характерные красно-коричневые оттенки, лёгкий вес при внушительных размерах. Слэбы секвойи — настоящие гиганты, идеальны для монументальных обеденных столов.',
    woodClass: 'wood-3',
  },
  {
    id: 'ash',
    abbr: 'Яс',
    name: 'Ясень обыкновенный',
    lat: 'Fraxinus excelsior',
    hardness: '4.0 кН',
    color: '#C8A878',
    count: 198,
    desc: 'Одна из самых прочных и упругих пород. Светлая древесина с чётким прямым рисунком. Прекрасно поддаётся обработке, хорошо держит форму. Отличный выбор для столешниц с высокой нагрузкой.',
    woodClass: 'wood-2',
  },
  {
    id: 'walnut',
    abbr: 'Ор',
    name: 'Орех грецкий',
    lat: 'Juglans regia',
    hardness: '3.5 кН',
    color: '#5C3A20',
    count: 76,
    desc: 'Благородная порода с глубоким шоколадным оттенком. Красивый волнистый рисунок, высокая плотность. Орех — классика мирового столярного искусства, символ роскоши и долговечности.',
    woodClass: 'wood-1',
  },
]

function QuickNav() {
  return (
    <nav
      className="hidden lg:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Быстрая навигация по породам"
    >
      {BREEDS.map(b => (
        <a key={b.id} href={`#${b.id}`} title={b.name} className="breeds-quicknav-item group flex items-center gap-2 justify-end">
          <span className="breeds-quicknav-label text-[10px] uppercase tracking-widest whitespace-nowrap">
            {b.name}
          </span>
          <span className="breeds-quicknav-dot block w-1.5 h-1.5 rounded-full transition-all duration-200 group-hover:scale-150" />
        </a>
      ))}
    </nav>
  )
}

export default function BreedsPage() {
  return (
    <V2PageShell variant="standalone">
      <div className="breeds-page">

        <QuickNav />

        {/* ── Page Header ── */}
        <header className="breeds-hero relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none breeds-hero-grain" />
          <div className="absolute top-0 left-0 right-0 h-px breeds-hero-line" />
          <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-32">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="text-xs sm:text-sm uppercase tracking-[0.25em] mb-5 md:mb-6 font-medium"
                style={{ color: 'var(--accent)' }}
              >
                Породы дерева
              </motion.p>
              <div className="w-12 h-px mb-7 md:mb-8" style={{ background: 'var(--accent)' }} />
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6 md:mb-8"
                style={{ color: 'var(--text)' }}
              >
                15 пород,
                <br />
                <em className="font-display italic" style={{ color: 'var(--gold)' }}>
                  каждая — особенная
                </em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="text-base md:text-lg leading-relaxed font-light max-w-xl"
                style={{ color: 'var(--muted)' }}
              >
                Все деревья — из Сочи. Перерабатываем аварийные посадки, сохраняя историю каждого дерева в текстуре слэба.
              </motion.p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none breeds-hero-fade" />
        </header>

        {/* ── Intro text ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pb-16 md:pb-20"
        >
          <div className="border-l-2 pl-5 md:pl-7 py-1 max-w-2xl" style={{ borderColor: 'var(--border)' }}>
            <p className="text-base md:text-lg leading-[1.9] font-light" style={{ color: 'var(--muted)' }}>
              Каждая порода — это характер, фактура, история. Мы работаем только с теми деревьями,
              которые прожили свой век в городских посадках Сочи. Ни вырубки леса — только сохранение памяти.
            </p>
          </div>
        </motion.section>

        {/* ── Breeds list ── */}
        <div>
          {BREEDS.map((b, i) => (
            <article
              key={b.id}
              id={b.id}
              className="breeds-article scroll-mt-20 border-b"
              style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)', borderColor: 'var(--border)' }}
            >
              <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                  {/* Text column */}
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className={i % 2 === 1 ? 'lg:order-2' : ''}
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--accent)' }}>
                      0{i + 1} / {String(BREEDS.length).padStart(2, '0')}
                    </p>

                    <div className="flex items-start gap-4 mb-6 md:mb-8">
                      <span className="font-display italic text-6xl sm:text-7xl leading-none select-none flex-shrink-0 mt-1" style={{ color: 'var(--border)' }}>
                        {b.abbr}
                      </span>
                      <div>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.6rem] font-light leading-tight tracking-wide" style={{ color: 'var(--text)' }}>
                          {b.name}
                        </h2>
                        <p className="text-sm italic mt-1.5 tracking-wide" style={{ color: 'var(--muted)' }}>
                          {b.lat}
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px mb-7 md:mb-8" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />

                    <p className="text-[15px] sm:text-base leading-[1.85] font-light mb-8 md:mb-10" style={{ color: 'var(--muted)' }}>
                      {b.desc}
                    </p>

                    <div className="flex flex-wrap gap-6 sm:gap-8 mb-10 md:mb-12">
                      <div className="pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted)' }}>Твёрдость</p>
                        <p className="font-display text-2xl sm:text-3xl font-light" style={{ color: 'var(--text)' }}>{b.hardness}</p>
                      </div>
                      <div className="pl-4" style={{ borderLeft: '2px solid var(--border)' }}>
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted)' }}>Слэбов</p>
                        <p className="font-display text-2xl sm:text-3xl font-light" style={{ color: 'var(--text)' }}>{b.count}</p>
                      </div>
                      <div className="pl-4" style={{ borderLeft: '2px solid var(--border)' }}>
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted)' }}>Оттенок</p>
                        <div className="flex items-center gap-2.5 mt-1">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{
                              background: b.color,
                              boxShadow: `0 0 0 3px var(--bg${i % 2 === 0 ? '' : '2'}), 0 0 0 4px var(--border)`,
                            }}
                          />
                          <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--muted)' }}>{b.color}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/catalog?breed=${b.id}`}
                      className="breeds-cta-btn group inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium px-7 py-3.5 w-full sm:w-auto justify-center sm:justify-start transition-all duration-300"
                    >
                      Смотреть слэбы
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>

                  {/* Wood visual column */}
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
                    className={`breeds-wood-visual relative overflow-hidden ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                  >
                    <div className={`${b.woodClass} h-64 sm:h-80 md:h-96 lg:h-[440px] w-full`} />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5 md:p-6"
                      style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.6) 60%, transparent 100%)' }}
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: 'var(--accent)' }}>Порода</p>
                          <p className="font-display text-xl sm:text-2xl font-light" style={{ color: 'var(--text)' }}>{b.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--muted)' }}>В наличии</p>
                          <p className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--gold)' }}>{b.count}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 pointer-events-none" style={{ borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }} />
                    <div className="absolute bottom-4 left-4 w-8 h-8 pointer-events-none" style={{ borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }} />
                  </motion.div>

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <section className="relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
          <div className="absolute inset-0 pointer-events-none breeds-hero-grain" />
          <div className="absolute top-0 left-0 right-0 h-px breeds-hero-line" />

          <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--accent)' }}>
                Каталог слэбов
              </p>
              <div className="w-10 h-px mx-auto mb-8" style={{ background: 'var(--accent)' }} />
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-wide mb-6 md:mb-8" style={{ color: 'var(--text)' }}>
                Найдите свой слэб
              </h2>
              <p className="text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10 md:mb-12" style={{ color: 'var(--muted)' }}>
                Более 900 слэбов в наличии. Каждый — уникален. Выберите породу и подберите идеальный экземпляр для вашего проекта.
              </p>
              <Link href="/catalog" className="breeds-cta-btn group inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium px-10 py-4 transition-all duration-300 w-full sm:w-auto justify-center">
                Перейти в каталог
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto mt-16 md:mt-20 pt-10 md:pt-12" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { value: '15', label: 'пород' },
                  { value: '900+', label: 'слэбов' },
                  { value: '8', label: 'лет опыта' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <p className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-1" style={{ color: 'var(--gold)' }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </V2PageShell>
  )
}

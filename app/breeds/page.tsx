'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ContentV2Hero from '@/components/ui/ContentV2Hero'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import { assetUrl } from '@/lib/base-path'
import '../modern-home.css'
import '../v2/home-v2.css'
import '../content-pages-v2.css'
import './breeds.css'

const VIEWPORT = { once: true, amount: 0.25 } as const

/** Временно один файл на все карточки; позже — своё фото на породу */
const BREED_CARD_MEDIA = '/media/material-8.png'

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
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Быстрая навигация по породам"
    >
      {BREEDS.map((b) => (
        <a key={b.id} href={`#${b.id}`} title={b.name} className="breeds-quicknav-item group flex items-center justify-end gap-2">
          <span className="breeds-quicknav-label text-[10px] uppercase tracking-widest whitespace-nowrap">
            {b.name}
          </span>
          <span className="breeds-quicknav-dot block h-1.5 w-1.5 rounded-full transition-all duration-200 group-hover:scale-150" />
        </a>
      ))}
    </nav>
  )
}

export default function BreedsPage() {
  return (
    <V2PageShell variant="standalone">
      <div className="about-page breeds-page">
        <QuickNav />

        <ContentV2Hero
          imageSrc="/media/catalog-5.png"
          title={
            <>
              15 пород,
              <br />
              <span className="content-v2-hero-accent">каждая — особенная</span>
            </>
          }
          lead="Все деревья — из Сочи. Перерабатываем аварийные посадки, сохраняя историю каждого дерева в текстуре слэба."
        />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="breeds-intro mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-10 md:px-14 md:pb-16 lg:px-16"
        >
          <div className="about-border-l max-w-2xl border-l pl-5 md:pl-7">
            <p className="about-body text-base leading-[1.75] md:text-lg">
              Каждая порода — это характер, фактура, история. Мы работаем только с теми деревьями, которые прожили свой
              век в городских посадках Сочи. Ни вырубки леса — только сохранение памяти.
            </p>
          </div>
        </motion.section>

        <div>
          {BREEDS.map((b, i) => (
            <article
              key={b.id}
              id={b.id}
              className={`breeds-article scroll-mt-20 border-b ${i % 2 === 1 ? 'about-section--alt' : ''}`}
              style={{ borderColor: 'var(--v2-border-s, var(--border))' }}
            >
              <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className={i % 2 === 1 ? 'lg:order-2' : ''}
                  >
                    <p className="about-step-label mb-5">
                      0{i + 1} / {String(BREEDS.length).padStart(2, '0')}
                    </p>

                    <div className="mb-6 flex items-start gap-4 md:mb-8">
                      <span
                        className="content-v2-stat-num flex-shrink-0 select-none text-5xl leading-none sm:text-6xl"
                        style={{ color: 'var(--v2-border-s, var(--border))' }}
                      >
                        {b.abbr}
                      </span>
                      <div>
                        <h2 className="content-v2-section-title">{b.name}</h2>
                        <p className="about-body mt-1.5 text-sm tracking-wide">{b.lat}</p>
                      </div>
                    </div>

                    <div className="about-border-t mb-7 h-px w-full border-t md:mb-8" />

                    <p className="about-body mb-8 text-[15px] leading-[1.75] sm:text-base md:mb-10">{b.desc}</p>

                    <div className="mb-10 flex flex-wrap gap-6 sm:gap-8 md:mb-12">
                      <div className="about-border-l border-l pl-4">
                        <p className="about-stat-label">Твёрдость</p>
                        <p className="content-v2-stat-num mt-2">{b.hardness}</p>
                      </div>
                      <div className="about-border-l border-l pl-4" style={{ borderColor: 'var(--v2-border-s)' }}>
                        <p className="about-stat-label">Слэбов</p>
                        <p className="content-v2-stat-num mt-2">{b.count}</p>
                      </div>
                      <div className="about-border-l border-l pl-4" style={{ borderColor: 'var(--v2-border-s)' }}>
                        <p className="about-stat-label">Оттенок</p>
                        <div className="mt-2 flex items-center gap-2.5">
                          <div
                            className="h-6 w-6 rounded-full"
                            style={{
                              background: b.color,
                              boxShadow: `0 0 0 3px var(--bg), 0 0 0 4px var(--border)`,
                            }}
                          />
                          <span className="about-body text-xs tracking-wider">{b.color}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/catalog?breed=${b.id}`}
                      className="breeds-cta-btn group inline-flex w-full items-center justify-center gap-3 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:w-auto sm:justify-start sm:text-sm"
                    >
                      Смотреть слэбы
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
                    className={`breeds-wood-visual relative overflow-hidden ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                  >
                    <div className="breeds-wood-visual__inner h-64 w-full sm:h-80 md:h-96 lg:h-[440px]">
                      <img
                        src={assetUrl(BREED_CARD_MEDIA)}
                        alt={b.name}
                        className="breeds-wood-visual__img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div
                      className="breeds-wood-visual__overlay absolute bottom-0 left-0 right-0 p-5 md:p-6"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.6) 60%, transparent 100%)',
                        borderRadius: '0 0 var(--v2-radius-lg, 16px) var(--v2-radius-lg, 16px)',
                      }}
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="about-step-label mb-1">Порода</p>
                          <p className="content-v2-section-title text-xl sm:text-2xl">{b.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="about-stat-label">В наличии</p>
                          <p className="content-v2-stat-num mt-1">{b.count}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:px-16 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="works-order-cta"
          >
            <div className="works-order-cta__inner">
              <div className="works-order-cta__head">
                <p className="works-order-cta__kicker">Каталог слэбов</p>
                <h2 className="works-order-cta__title">
                  Найдите
                  <br />
                  <span>свой слэб</span>
                </h2>
              </div>
              <div className="works-order-cta__body">
                <p className="works-order-cta__text">
                  Более 900 слэбов в наличии. Каждый — уникален. Выберите породу и подберите идеальный экземпляр для
                  вашего проекта.
                </p>
                <Link href="/catalog" className="works-order-cta__btn v2-btn group">
                  Перейти в каталог
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div className="works-order-cta__stats">
                {[
                  { value: '15', label: 'пород' },
                  { value: '900+', label: 'слэбов' },
                  { value: '8', label: 'лет опыта' },
                ].map((stat) => (
                  <div key={stat.label} className="works-order-cta__stat">
                    <p className="works-order-cta__stat-num">{stat.value}</p>
                    <p className="works-order-cta__stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </V2PageShell>
  )
}

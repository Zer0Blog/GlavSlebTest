'use client'
import HeroSection from '@/components/sections/HeroSection'
import SlabCard from '@/components/ui/SlabCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Link from 'next/link'

const SLABS = [
  { id: '1247', species: 'Дуб черешчатый', size: '240 × 96 × 8 см', price: '85 000 ₽', woodClass: 'wood-3', featured: true },
  { id: '0891', species: 'Платан', size: '180 × 74 × 6 см', price: '62 000 ₽', woodClass: 'wood-1' },
  { id: '0534', species: 'Кедр', size: '210 × 88 × 7 см', price: '74 000 ₽', woodClass: 'wood-2' },
  { id: '0712', species: 'Секвойя', size: '320 × 110 × 9 см', price: '120 000 ₽', woodClass: 'wood-3' },
  { id: '1102', species: 'Ясень', size: '195 × 82 × 5 см', price: '48 000 ₽', woodClass: 'wood-1' },
]

const BREEDS = [
  { id: 'oak', abbr: 'Дб', name: 'Дуб', lat: 'Quercus robur', tag: 'Твёрдость 3.7 кН', desc: 'Самая твёрдая порода. Выраженная текстура, тёплый оттенок.' },
  { id: 'cedar', abbr: 'Кд', name: 'Кедр', lat: 'Cedrus libani', tag: 'Ароматная', desc: 'Золотистый оттенок, устойчив к влаге.' },
  { id: 'plane', abbr: 'Пл', name: 'Платан', lat: 'Platanus orientalis', tag: 'Редкая', desc: 'Мраморный рисунок, уникальная текстура.' },
  { id: 'sequoia', abbr: 'Св', name: 'Секвойя', lat: 'Sequoiadendron', tag: 'Крупные слэбы', desc: 'Красноватые оттенки, лёгкий вес.' },
  { id: 'ash', abbr: 'Яс', name: 'Ясень', lat: 'Fraxinus excelsior', tag: 'Упругость', desc: 'Упругая, отличный выбор для столешниц.' },
]

const VALUES = [
  { title: 'Экология', desc: 'Перерабатываем то, что уже срублено городом' },
  { title: 'Уникальность', desc: 'Каждый слэб — единственный экземпляр' },
  { title: 'Производство', desc: 'Полный цикл: от бревна до изделия' },
  { title: 'Доставка', desc: 'По всей России, бережная упаковка' },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="container-page py-12 md:py-16 lg:py-20">
        <SectionHeader
          kicker="Каталог"
          title={
            <>
              Каждый слэб — <em className="italic" style={{ color: 'var(--gold)' }}>уникален</em>
            </>
          }
          href="/catalog"
          linkLabel="Смотреть все →"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[360px] lg:min-h-0">
            <SlabCard {...SLABS[0]} featured />
          </div>
          {SLABS.slice(1).map(s => (
            <SlabCard key={s.id} {...s} />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20" style={{ background: 'var(--bg2)' }}>
        <div className="container-page">
          <SectionHeader kicker="Породы" title="15 пород дерева" href="/breeds" linkLabel="Все породы →" />
        </div>
        <div className="flex gap-0.5 overflow-x-auto hide-scrollbar container-page pb-1 snap-x snap-mandatory">
          {BREEDS.map(b => (
            <Link
              key={b.id}
              href={`/breeds#${b.id}`}
              className="flex-shrink-0 w-[min(280px,85vw)] p-6 sm:p-9 snap-start transition-colors duration-200 hover:border-[var(--accent)]"
              style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
              <div className="font-display italic text-4xl sm:text-5xl leading-none mb-4 sm:mb-6" style={{ color: 'var(--border)' }}>
                {b.abbr}
              </div>
              <h3 className="font-display text-xl sm:text-2xl mb-2">{b.name}</h3>
              <p className="text-[12px] italic mb-3 sm:mb-4" style={{ color: 'var(--muted)' }}>
                {b.lat}
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {b.desc}
              </p>
              <span
                className="inline-block mt-4 text-[11px] tracking-[.1em] uppercase px-3 py-1"
                style={{ color: 'var(--accent)', border: '0.5px solid var(--accent)' }}>
                {b.tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="h-[280px] sm:h-[400px] lg:h-[560px] wood-3" />
            <div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 px-5 py-4 sm:px-6 sm:py-5 text-center z-10"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              <p className="font-display text-3xl sm:text-4xl font-bold">2013</p>
              <p className="text-[11px] tracking-[.08em] uppercase mt-1">год основания</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="kicker mb-3 md:mb-4">О нас</p>
            <h2
              className="font-display font-medium leading-[1.1] mb-5 md:mb-7"
              style={{ fontSize: 'clamp(1.75rem,4vw,3rem)' }}>
              Дерево,
              <br />
              которое <em className="italic" style={{ color: 'var(--gold)' }}>уже было</em>
              <br />
              частью города
            </h2>
            <p className="text-[15px] leading-[1.8] mb-5" style={{ color: 'var(--muted)' }}>
              Мы перерабатываем аварийные и упавшие деревья с улиц Сочи. Каждый слэб — дерево с историей.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8 md:mb-10">
              {VALUES.map(v => (
                <div key={v.title} className="pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
                  <h4 className="font-display text-base mb-1">{v.title}</h4>
                  <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-primary">
              О производстве
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

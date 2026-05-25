'use client'
import Link from 'next/link'

const stats = [
  { num: '1000+', label: 'слэбов на складе' },
  { num: '15+', label: 'пород дерева' },
  { num: '10', label: 'лет производства' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-var(--nav-h))] flex flex-col justify-end overflow-hidden container-page pb-10 md:pb-16 lg:pb-20 pt-8">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #2A1E0E 0%, #0E0C0A 50%, #1A1208 100%)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg,transparent,transparent 120px,rgba(196,131,42,.015) 120px,rgba(196,131,42,.015) 121px),repeating-linear-gradient(0deg,transparent,transparent 120px,rgba(196,131,42,.015) 120px,rgba(196,131,42,.015) 121px)',
          }}
        />
      </div>

      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] lg:w-[52%] opacity-40 md:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, var(--bg) 0%, transparent 30%), repeating-linear-gradient(168deg, rgba(139,96,58,.25) 0px, rgba(139,96,58,.25) 3px, transparent 3px, transparent 18px, rgba(160,110,65,.12) 18px, rgba(160,110,65,.12) 20px, transparent 20px, transparent 38px)',
          backgroundColor: '#1C1308',
        }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(196,131,42,.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="kicker mb-4 md:mb-6">Сочи · с 2013 года · 15+ пород</p>
        <h1
          className="font-display leading-[1.05] font-medium mb-5 md:mb-7"
          style={{ fontSize: 'clamp(2.25rem,8vw,5rem)' }}>
          Слэбы
          <br />
          из <em className="italic" style={{ color: 'var(--gold)' }}>живого</em>
          <br />
          дерева Сочи
        </h1>
        <p className="text-sm md:text-base mb-8 md:mb-12 leading-[1.7] max-w-md" style={{ color: 'var(--muted)' }}>
          Перерабатываем аварийные деревья с улиц города. Каждый слэб — уникальный, с историей. Более 1000 штук на
          складе.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link href="/catalog" className="btn-primary text-center">
            Смотреть каталог
          </Link>
          <Link href="/about" className="btn-ghost self-start sm:self-auto pb-0.5">
            О производстве →
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-12 md:mt-0 md:absolute md:right-0 md:bottom-16 lg:bottom-20 flex gap-6 sm:gap-8 md:gap-10">
        {stats.map(s => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>
              {s.num}
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-[.1em] uppercase mt-1" style={{ color: 'var(--muted)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

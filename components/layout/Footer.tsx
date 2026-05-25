'use client'
import Link from 'next/link'

const cols = [
  {
    title: 'Каталог',
    links: [
      { href: '/catalog', label: 'Все слэбы' },
      { href: '/breeds', label: 'Породы' },
      { href: '/works', label: 'Готовые работы' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { href: '/about', label: 'О нас' },
      { href: '/contacts', label: 'Контакты' },
      { href: '#', label: 'Доставка' },
    ],
  },
  {
    title: 'Связь',
    links: [
      { href: 'https://t.me/glavsleb', label: 'Telegram' },
      { href: '#', label: 'ВКонтакте' },
      { href: 'https://glavsleb.ru', label: 'glavsleb.ru' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="pt-10 pb-8 md:pt-12" style={{ background: 'var(--bg2)', borderTop: '0.5px solid var(--border)' }}>
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-start mb-10 md:mb-12">
        <div>
          <p className="font-display text-xl md:text-2xl">
            Главный <span style={{ color: 'var(--accent)' }}>по слэбам</span>
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Сочи, ул. Производственная, 12</p>
          <a href="tel:+78622000000" className="text-sm block mt-1 hover:underline" style={{ color: 'var(--muted)' }}>
            +7 (862) 200-00-00
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="kicker mb-3 md:mb-4 !tracking-[.12em]">{col.title}</h4>
              {col.links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-[13px] mb-2 transition-colors duration-200 hover:text-[var(--text)]"
                  style={{ color: 'var(--muted)' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className="container-page flex flex-col gap-2 sm:flex-row sm:justify-between pt-6 text-[12px]"
        style={{ borderTop: '0.5px solid var(--border)', color: 'var(--muted)' }}>
        <span>© 2025 Главный по слэбам</span>
        <span>Производство в Сочи · Доставка по России</span>
      </div>
    </footer>
  )
}

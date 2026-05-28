'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Send, Camera } from 'lucide-react'
import { assetUrl } from '@/lib/base-path'

const FOOTER_MESSENGERS = [
  { label: 'WhatsApp', href: 'https://wa.me/78000000000', icon: MessageCircle, color: '#25D366' },
  { label: 'Telegram', href: 'https://t.me/glavsleb', icon: Send, color: '#2AABEE' },
  { label: 'Instagram', href: '#', icon: Camera, color: '#E1306C' },
]

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
  const pathname = usePathname()
  const useForestoffLogo = pathname === '/about' || pathname === '/contacts'

  if (useForestoffLogo) {
    return (
      <footer className="site-chrome-footer site-chrome-footer--v2">
        <div className="container-page">
          <div className="v2-footer__grid">
            <div>
              <div className="v2-footer__brand">
                <img src={assetUrl('/media/logo.png')} alt="FORESTOFF" className="nav-logo" />
              </div>
              <div className="v2-footer__tagline">Wood Company · Сочи</div>
              <p className="v2-footer__desc">
                Эксклюзивная мебель из редких пород дерева. Полный цикл производства. Индивидуальные проекты любой сложности.
              </p>
            </div>
            <div>
              <div className="v2-footer__col-title">Каталог</div>
              <ul className="v2-footer__links">
                {['Террасная доска', 'Фасадная доска', 'Планкен', 'Слэбы'].map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="v2-footer__col-title">Компания</div>
              <ul className="v2-footer__links">
                {['О компании', 'Технология', 'Проекты', 'Контакты'].map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="v2-footer__col-title">Контакты</div>
              <div className="v2-footer__contacts-list">
                {[
                  { label: 'Шоурум', val: 'г. Сочи, ул. Краснофлотская, 11/16' },
                  { label: 'Телефон', val: '+7 (800) *** ** **' },
                  { label: 'Email', val: 'info@sequoia-wood.ru' },
                ].map(c => (
                  <div key={c.label} className="v2-footer__contact-item">
                    <div className="v2-footer__contact-label">{c.label}</div>
                    <div className="v2-footer__contact-val">{c.val}</div>
                  </div>
                ))}
              </div>
              <div className="v2-footer__messengers">
                <div className="v2-footer__col-title">Мессенджеры</div>
                <div className="v2-footer__messenger-btns">
                  {FOOTER_MESSENGERS.map(m => {
                    const Icon = m.icon
                    return (
                      <a
                        key={m.label}
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v2-footer__messenger-btn"
                        aria-label={m.label}
                      >
                        <Icon size={13} style={{ color: m.color }} />
                        {m.label}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="v2-footer__bottom">
            <span className="v2-footer__copy">© 2025 Главный по слэбам · Термо, сушёное и естественной влажности</span>
            <div className="v2-footer__socials v2-footer__socials--icons">
              {FOOTER_MESSENGERS.map(m => {
                const Icon = m.icon
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-footer__messenger-btn v2-footer__messenger-btn--compact"
                    aria-label={m.label}
                  >
                    <Icon size={14} style={{ color: m.color }} />
                    {m.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-chrome-footer pt-10 pb-8 md:pt-12" style={{ background: 'var(--bg2)', borderTop: '0.5px solid var(--border)' }}>
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

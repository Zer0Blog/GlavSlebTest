'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ADVANTAGES,
  CATALOG_ITEMS,
  CATEGORIES,
  FILTER_TABS,
  MATERIALS,
  NAV_LINKS,
  PROCESS_STATS,
  PROCESS_STEPS,
  PROJECTS,
  TESTIMONIALS,
  USP_ITEMS,
  WOOD_SPECIES,
} from '@/components/sections/modern-home/data'
import { assetUrl } from '@/lib/base-path'

/* ─── SVG иконки ─────────────────────────────────────────── */
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.82A1 1 0 004.64 21c1.9-.22 6.36-1.07 8.36-3 2.17-2.1 2.5-5.5 2.5-7 0 0 2.5 0 4.5 2.5 0-3.5-1.5-7-3-8z" />
  </svg>
)
const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)
const IconFactory = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M2 20V10l5-5v5l5-5v5l5-5v10H2z" />
    <path d="M2 20h20" />
    <rect x="17" y="11" width="5" height="9" />
  </svg>
)
const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
)
const IconPackage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)
const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="16" y2="12" />
  </svg>
)
const IconIG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const IconTG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 5L2 12.5l7 1M21 5l-5 16-7-7.5M21 5L9 13.5m0 0V19l3.5-3" />
  </svg>
)
const IconWA = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 11.5A9 9 0 003.07 17L2 22l5.25-1.38A9 9 0 1021 11.5z" />
  </svg>
)

const ADV_ICONS = [<IconShield key="s" />, <IconLeaf key="l" />, <IconAward key="a" />]
const USP_ICONS = [<IconFactory key="f" />, <IconGrid key="g" />, <IconPackage key="p" />, <IconMap key="m" />]

/* ─── Компонент ─────────────────────────────────────────── */
type Theme = 'thermo' | 'nature'

function readSavedTheme(): Theme {
  if (typeof window === 'undefined') return 'thermo'
  try {
    const saved = localStorage.getItem('sq-theme')
    if (saved === 'thermo' || saved === 'nature') return saved
  } catch {
    /* ignore */
  }
  return 'thermo'
}

export default function HomePageV2() {
  const [theme, setTheme] = useState<Theme>('thermo')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter]     = useState('all')
  const [formStatus, setFormStatus]       = useState<'idle' | 'sent'>('idle')
  const [consultStatus, setConsultStatus] = useState<'idle' | 'sent'>('idle')

  useEffect(() => {
    setTheme(readSavedTheme())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('sq-theme', theme)
    } catch {
      /* ignore */
    }
    return () => document.documentElement.removeAttribute('data-theme')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'thermo' ? 'nature' : 'thermo'))
  }, [])

  /* Reveal on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.home-v2 .v2-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Drag scroll for materials */
  const matRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = matRef.current; if (!el) return
    let down = false, startX = 0, sl = 0
    const onDown  = (e: MouseEvent) => { down = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; sl = el.scrollLeft }
    const onUp    = () => { down = false; el.classList.remove('dragging') }
    const onMove  = (e: MouseEvent) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX) * 1.5 }
    el.addEventListener('mousedown', onDown); el.addEventListener('mouseup', onUp)
    el.addEventListener('mouseleave', onUp); el.addEventListener('mousemove', onMove)
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mousemove', onMove) }
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'consult') => {
    e.preventDefault()
    const set = type === 'contact' ? setFormStatus : setConsultStatus
    set('sent'); setTimeout(() => set('idle'), 3000)
  }, [])

  return (
    <div className="home-v2">

      {/* ═══ MOBILE MENU ═════════════════════════════════════ */}
      {menuOpen && (
        <div className="v2-mobile-menu">
          <button className="v2-mobile-close" onClick={() => setMenuOpen(false)}><IconClose /></button>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="v2-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <div className="v2-theme-row" style={{ marginTop: 24 }}>
            <span className="v2-theme-label">{theme === 'thermo' ? 'Тёмная' : 'Светлая'}</span>
            <button
              type="button"
              className={`v2-theme-toggle${theme === 'nature' ? ' is-light' : ''}`}
              onClick={toggleTheme}
              aria-label="Переключить тему"
            >
              <span className="v2-theme-thumb" />
            </button>
          </div>
          <a href="#contact" className="v2-btn" style={{ marginTop: 32 }} onClick={() => setMenuOpen(false)}>Связаться</a>
        </div>
      )}

      {/* ═══ NAV ═════════════════════════════════════════════ */}
      <nav className="v2-nav">
        <a href="#home" className="v2-nav__logo">
          <img src={assetUrl('/media/logo.png')} alt="Логотип" />
          <span className="v2-nav__name">
            Главный <span style={{ color: 'var(--v2-accent)' }}>по слэбам</span>
          </span>
        </a>

        <ul className="v2-nav__links">
          {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>

        <div className="v2-nav__actions">
          <span className="v2-theme-label v2-theme-label--desktop">
            {theme === 'thermo' ? 'Тёмная' : 'Светлая'}
          </span>
          <button
            type="button"
            className={`v2-theme-toggle${theme === 'nature' ? ' is-light' : ''}`}
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            <span className="v2-theme-thumb" />
          </button>
          <a href="#contact" className="v2-btn" style={{ padding: '10px 22px', fontSize: 10 }}>Связаться</a>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--v2-muted)', cursor: 'pointer', display: 'none' }}
            className="v2-hamburger"
            aria-label="Меню"
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section id="home" className="v2-hero" style={{ minHeight: 'calc(100vh - 0px)' }}>
        {/* Left — текст */}
        <div className="v2-hero__left">
          <p className="v2-label v2-anim v2-anim-d1" style={{ marginBottom: 28 }}>
            Сочи · Производство полного цикла
          </p>
          <h1 className="v2-hero__h1 v2-anim v2-anim-d2">
            Термо&shy;древесина<br />
            <span style={{ color: 'var(--v2-accent)' }}>Премиум</span>
          </h1>
          <p className="v2-hero__sub v2-anim v2-anim-d3">
            Более 1&thinsp;200 слэбов в наличии. Производство в Сочи — от валки леса до полировки. Доставка по всей России.
          </p>
          <div className="v2-hero__cta v2-anim v2-anim-d4">
            <a href="#catalog" className="v2-btn">Смотреть каталог</a>
            <a href="#process" className="v2-btn-outline">О производстве</a>
          </div>
        </div>

        {/* Right — фото */}
        <div className="v2-hero__right">
          <img src={assetUrl('/media/catalog-1.png')} alt="Слэб из грецкого ореха" />
          <div className="v2-hero__overlay" />
          {/* Stat bar */}
          <div className="v2-hero__stat-bar">
            {[
              { num: '1 200+', label: 'Слэбов в наличии' },
              { num: '25+',    label: 'Пород дерева' },
              { num: '4',      label: 'Собственных цеха' },
            ].map(s => (
              <div className="v2-hero__stat" key={s.label}>
                <div className="v2-hero__stat-num">{s.num}</div>
                <div className="v2-hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═════════════════════════════════════════ */}
      <div className="v2-marquee-wrap">
        <div className="v2-marquee-track">
          {[...WOOD_SPECIES, ...WOOD_SPECIES].map((sp, i) => (
            <div className="v2-marquee-item" key={i}>
              <span className="v2-marquee-text">{sp}</span>
              <span className="v2-marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 4-COLUMN GRID ═══════════════════════════════════ */}
      <section className="v2-grid4">
        <div className="v2-grid4__inner">

          {/* Col 1 — Категории */}
          <div className="v2-col v2-reveal">
            <div className="v2-col__title">Категории</div>
            <ul className="v2-cat-list">
              {CATEGORIES.map(cat => (
                <li className="v2-cat-item" key={cat}>
                  <a href="#">
                    <span>{cat}</span>
                    <span className="v2-cat-chevron"><IconChevronRight /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Преимущества */}
          <div className="v2-col v2-reveal v2-reveal-d1">
            <div className="v2-col__title">Преимущества</div>
            <div className="v2-adv-list">
              {ADVANTAGES.map((adv, i) => (
                <div className="v2-adv-item" key={adv.title}>
                  <div className="v2-adv-icon">{ADV_ICONS[i]}</div>
                  <div>
                    <div className="v2-adv-title">{adv.title}</div>
                    <div className="v2-adv-desc">{adv.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Карточка товара */}
          <div className="v2-col v2-reveal v2-reveal-d2" style={{ padding: 0 }}>
            <img
              src={assetUrl('/media/product-hit.png')}
              alt="Товар хит"
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            <div style={{ padding: '28px 32px 32px' }}>
              <div className="v2-product-name">Термодоска ясень</div>
              <div className="v2-product-spec">20 × 120 × 2000 мм</div>
              <div className="v2-product-price">5&thinsp;420 ₽ / м²</div>
              <a href="#catalog" className="v2-btn v2-btn-wide">Подробнее</a>
            </div>
          </div>

          {/* Col 4 — Форма */}
          <div className="v2-col v2-reveal v2-reveal-d3">
            <div className="v2-col__title">Консультация</div>
            <p style={{ fontSize: 12, color: 'var(--v2-muted)', marginBottom: 20, lineHeight: 1.6 }}>
              Подберём решение под ваш проект
            </p>
            <form onSubmit={e => handleSubmit(e, 'consult')} className="v2-form">
              <input type="text"  className="v2-input" placeholder="Имя" />
              <input type="tel"   className="v2-input" placeholder="Телефон" />
              <textarea           className="v2-input v2-input-area" placeholder="Сообщение" />
              <button
                type="submit"
                className="v2-btn v2-btn-wide"
                style={{ marginTop: 8, background: consultStatus === 'sent' ? '#3D6B4F' : 'var(--v2-accent)' }}
              >
                {consultStatus === 'sent' ? 'Отправлено ✓' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ USP BAR ═════════════════════════════════════════ */}
      <section className="v2-usp">
        <div className="v2-usp__inner">
          {USP_ITEMS.map((item, i) => (
            <div className="v2-usp__item v2-reveal" key={item.label} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="v2-usp__icon">{USP_ICONS[i]}</div>
              <div>
                <div className="v2-usp__label">{item.label}</div>
                <div className="v2-usp__value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ КАТАЛОГ ═════════════════════════════════════════ */}
      <section id="catalog" className="v2-catalog">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="v2-section-header v2-reveal">
            <div>
              <p className="v2-section-label" style={{ marginBottom: 16 }}>Коллекция</p>
              <h2 className="v2-heading-sm">
                Столы из<br />живого дерева
              </h2>
            </div>
            <div className="v2-filter-bar">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`v2-filter-btn${filter === tab.key ? ' active' : ''}`}
                  onClick={() => setFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="v2-catalog-grid">
            {CATALOG_ITEMS.map(item => {
              const visible = filter === 'all' || item.cat === filter
              return (
                <div
                  key={item.id}
                  className={`v2-catalog-card${item.large ? ' large' : ' small'}`}
                  style={{ opacity: visible ? 1 : 0.1, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 0.4s' }}
                >
                  <img src={assetUrl(item.image)} alt="" loading="lazy" />
                  <div className="v2-catalog-grad" />
                  <div className="v2-catalog-info">
                    <div className="v2-catalog-species">{item.species}</div>
                    <div className="v2-catalog-name">{item.name}</div>
                  </div>
                  <div className="v2-catalog-hover">
                    <span className="v2-catalog-tag">Подробнее →</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="v2-catalog-cta v2-reveal">
            <a href="/catalog" className="v2-btn" style={{ padding: '16px 48px' }}>Весь каталог</a>
          </div>
        </div>
      </section>

      {/* ═══ ПРОЦЕСС ═════════════════════════════════════════ */}
      <section id="process" className="v2-process">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="v2-reveal" style={{ marginBottom: 60 }}>
            <p className="v2-section-label" style={{ marginBottom: 16 }}>Как мы работаем</p>
            <h2 className="v2-heading-sm">
              Производство<br />полного цикла
            </h2>
            <p style={{ marginTop: 20, fontSize: 14, color: 'var(--v2-muted)', lineHeight: 1.7, maxWidth: 440 }}>
              От валки леса до финальной полировки — каждый этап под нашим контролем.
            </p>
          </div>

          <div className="v2-process__layout">
            <div>
              {PROCESS_STEPS.map((step, i) => (
                <div className={`v2-step v2-reveal v2-reveal-d${Math.min(i + 1, 4)}`} key={step.num}>
                  <span className="v2-step-num">{step.num}</span>
                  <div>
                    <div className="v2-step-title">{step.title}</div>
                    <div className="v2-step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="v2-process-visual">
              <img src={assetUrl('/media/process.png')} alt="" className="v2-process-img" loading="lazy" />
              <div className="v2-stats-grid">
                {PROCESS_STATS.map(stat => (
                  <div className="v2-stat-box" key={stat.label}>
                    <div className="v2-stat-num">{stat.num}</div>
                    <div className="v2-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ МАТЕРИАЛЫ ═══════════════════════════════════════ */}
      <section id="materials" className="v2-materials">
        <div className="v2-materials__header v2-reveal" style={{ maxWidth: 1280, margin: '0 auto 60px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <p className="v2-section-label" style={{ marginBottom: 16 }}>Материалы</p>
              <h2 className="v2-heading-sm">Редкие породы<br />со всего мира</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--v2-muted)', maxWidth: 280, lineHeight: 1.7 }}>
              Каждая порода — свой характер, история, аромат.
            </p>
          </div>
        </div>

        <div className="v2-mat-track" ref={matRef}>
          {MATERIALS.map((mat, i) => (
            <div className="v2-mat-card" key={mat.name}>
              <img src={assetUrl(`/media/material-${i + 1}.png`)} alt="" loading="lazy" />
              <div className="v2-mat-overlay">
                <span className="v2-mat-tag">{mat.tag}</span>
                <div className="v2-mat-name">{mat.name}</div>
                <div className="v2-mat-desc">{mat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ПРОЕКТЫ ═════════════════════════════════════════ */}
      <section id="projects" className="v2-projects">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div className="v2-reveal">
              <p className="v2-section-label" style={{ marginBottom: 16 }}>Работы</p>
              <h2 className="v2-heading-sm">Реализованные<br />проекты</h2>
            </div>
            <a href="/works" className="v2-btn v2-reveal">Смотреть все</a>
          </div>
          <div className="v2-projects-grid">
            {PROJECTS.map((proj, i) => (
              <div className={`v2-proj-card v2-reveal v2-reveal-d${i + 1}`} key={proj.title}>
                <img src={assetUrl(proj.image)} alt="" loading="lazy" />
                <div className="v2-proj-grad" />
                <div className="v2-proj-info">
                  <div className="v2-proj-type">{proj.type}</div>
                  <div className="v2-proj-title">{proj.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ОТЗЫВЫ ══════════════════════════════════════════ */}
      <section id="trust" className="v2-testimonials">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="v2-reveal">
            <p className="v2-section-label" style={{ marginBottom: 16 }}>Отзывы</p>
            <h2 className="v2-heading-sm">Что говорят<br />клиенты</h2>
          </div>
          <div className="v2-test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className={`v2-test-card v2-reveal v2-reveal-d${i + 1}`} key={t.author}>
                <div className="v2-test-quote">"</div>
                <p className="v2-test-text">{t.text}</p>
                <div className="v2-test-author">{t.author}</div>
                <div className="v2-test-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ КОНТАКТ ═════════════════════════════════════════ */}
      <section id="contact" className="v2-contact">
        <div className="v2-contact__bg">
          <img src={assetUrl('/media/contact-bg.png')} alt="" />
        </div>
        <div className="v2-contact__layout">
          <div className="v2-reveal">
            <p className="v2-section-label" style={{ color: 'rgba(212,167,106,0.7)', marginBottom: 24 }}>Приедьте и потрогайте</p>
            <h2 className="v2-contact-h2">Найдите<br />свой слэб</h2>
            <p className="v2-contact-p">
              Более 1&thinsp;200 слэбов в наличии. Шоурум в Сочи, ул. Краснофлотская, 11/16. Работаем по всей России. Бесплатная консультация.
            </p>
            <div className="v2-contact-details">
              <div>
                <div className="v2-contact-dt">Телефон</div>
                <div className="v2-contact-dd">+7 (800) *** ** **</div>
              </div>
              <div>
                <div className="v2-contact-dt">Адрес</div>
                <div className="v2-contact-dd">Сочи, Краснофлотская 11/16</div>
              </div>
            </div>
          </div>

          <form onSubmit={e => handleSubmit(e, 'contact')} className="v2-contact-form v2-reveal v2-reveal-d1">
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
              Оставить заявку
            </p>
            <div className="v2-contact-row">
              <input type="text" className="v2-contact-input" placeholder="Ваше имя" />
              <input type="tel"  className="v2-contact-input" placeholder="Телефон" />
            </div>
            <input type="text" className="v2-contact-input" placeholder="Что вас интересует?" />
            <textarea rows={4} className="v2-contact-input" placeholder="Расскажите о проекте..." style={{ resize: 'vertical' }} />
            <button
              type="submit"
              className="v2-btn"
              style={{ background: formStatus === 'sent' ? '#3D6B4F' : 'var(--v2-accent)', alignSelf: 'flex-start', padding: '16px 44px' }}
            >
              {formStatus === 'sent' ? 'Отправлено ✓' : 'Отправить заявку'}
            </button>
            <p className="v2-contact-note">Ответим в течение 2 часов в рабочее время</p>
          </form>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer className="v2-footer">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="v2-footer__grid">
            <div>
              <div className="v2-footer__brand">Главный по слэбам</div>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Шоурум', val: 'г. Сочи, ул. Краснофлотская, 11/16' },
                  { label: 'Телефон', val: '+7 (800) *** ** **' },
                  { label: 'Email', val: 'info@sequoia-wood.ru' },
                ].map(c => (
                  <div key={c.label}>
                    <div className="v2-footer__contact-label">{c.label}</div>
                    <div className="v2-footer__contact-val">{c.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="v2-footer__bottom">
            <span className="v2-footer__copy">© 2025 Главный по слэбам · Премиальная термодревесина</span>
            <div className="v2-footer__socials">
              <a href="#" aria-label="Instagram"><IconIG /></a>
              <a href="#" aria-label="Telegram"><IconTG /></a>
              <a href="#" aria-label="WhatsApp"><IconWA /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

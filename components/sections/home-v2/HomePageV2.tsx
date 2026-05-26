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
import { CloseIcon } from '@/components/sections/modern-home/icons'

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
  const [theme, setTheme] = useState<Theme>(readSavedTheme)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter]     = useState('all')
  const [formStatus, setFormStatus]       = useState<'idle' | 'sent'>('idle')
  const [consultStatus, setConsultStatus] = useState<'idle' | 'sent'>('idle')

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
    <div className="home-v2 modern-home min-h-screen">

      {/* Мобильное меню — как на главной / */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <button
            type="button"
            className="absolute top-6 right-6 p-2"
            onClick={closeMenu}
            style={{ color: 'var(--text-primary)' }}
          >
            <CloseIcon />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-display text-3xl font-medium tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 rounded-2xl px-8 py-4 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Связаться
          </a>
        </div>
      )}

      {/* Шапка — 1:1 как на http://localhost:3001/ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#home" className="nav-logo-link text-decoration-none">
            <img src={assetUrl('/media/logo.png')} alt="FORESTOFF" className="nav-logo" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium tracking-[0.06em] uppercase transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] tracking-[0.1em] uppercase sm:block" style={{ color: 'var(--text-tertiary)' }}>
              {theme === 'thermo' ? 'Тёмная' : 'Светлая'}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="relative h-6 w-11 rounded-full transition-colors duration-300"
              style={{
                background: 'var(--border-strong)',
                border: '1px solid var(--border-strong)',
              }}
              aria-label="Переключить тему"
            >
              <span
                className="absolute top-[3px] h-4 w-4 rounded-full transition-all duration-400"
                style={{
                  left: theme === 'nature' ? 'calc(100% - 19px)' : '3px',
                  backgroundColor: 'var(--accent)',
                }}
              />
            </button>
            <a
              href="#contact"
              className="hidden rounded-xl px-5 py-2.5 text-[12px] font-medium tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90 sm:block"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Связаться
            </a>
            <button
              type="button"
              className="flex flex-col gap-[5px] lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Меню"
            >
              <span className="block h-[1.5px] w-6 rounded" style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className="block h-[1.5px] w-4 rounded" style={{ backgroundColor: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO — полноэкранный баннер (макет) ═════════════════ */}
      <section id="home" className="v2-hero">
        <img
          className="v2-hero__bg"
          src={assetUrl('/media/banner_dark.png')}
          alt=""
          fetchPriority="high"
        />
        <div className="v2-hero__overlay" aria-hidden />
        <div className="v2-hero__content">
          <h1 className="v2-hero__h1 v2-anim v2-anim-d1">
            Термодревесина
            <br />
            премиум-качества
          </h1>
          <p className="v2-hero__sub v2-anim v2-anim-d2">
            Стабильность. Красота. Долговечность.
            <br />
            Термообработка для вашего проекта.
          </p>
          <div className="v2-hero__cta v2-anim v2-anim-d3">
            <a href="#catalog" className="v2-btn v2-btn-hero">
              Смотреть каталог
            </a>
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
                <div className="v2-test-quote">&ldquo;</div>
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

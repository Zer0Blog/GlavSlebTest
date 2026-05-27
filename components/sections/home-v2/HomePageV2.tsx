'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ADVANTAGES,
  CATALOG_ITEMS,
  CATEGORIES,
  MATERIALS,
  NAV_LINKS,
  PROCESS_STATS,
  PROCESS_STEPS,
  TESTIMONIALS,
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

const CATALOG_CAT_LABELS: Record<string, string> = {
  river: 'Стол-река',
  slab: 'Слэб',
  epoxy: 'Эпоксид',
  office: 'Офис',
}

const CATALOG_BENTO_SLOT: Record<number, string> = {
  1: 'v2-catalog-card--featured',
  4: 'v2-catalog-card--b1',
  5: 'v2-catalog-card--b2',
  6: 'v2-catalog-card--b3',
}

const V2_NAV_LINKS = NAV_LINKS.filter(link => link.href !== '#projects')

function catalogShortName(name: string) {
  const match = name.match(/«([^»]+)»/)
  return match ? match[1] : name
}

/* ─── Компонент ─────────────────────────────────────────── */
type Theme = 'thermo' | 'nature'
type ContactFormMode = 'request' | 'coop'

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
  const [formStatus, setFormStatus]       = useState<'idle' | 'sent'>('idle')
  const [consultStatus, setConsultStatus] = useState<'idle' | 'sent'>('idle')
  const [coopStatus, setCoopStatus] = useState<'idle' | 'sent'>('idle')
  const [contactFormMode, setContactFormMode] = useState<ContactFormMode>('request')

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

  const handleSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'consult' | 'coop') => {
    e.preventDefault()
    const set = type === 'contact' ? setFormStatus : type === 'consult' ? setConsultStatus : setCoopStatus
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
          {V2_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-3xl font-bold uppercase tracking-wide transition-colors duration-300 hover:opacity-70"
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
        <div className="v2-nav-inner mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <a href="#home" className="nav-logo-link text-decoration-none">
            <img src={assetUrl('/media/logo.png')} alt="Главный по слэбам" className="nav-logo" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {V2_NAV_LINKS.map((link) => (
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
          src={assetUrl('/media/hero-forestoff.png')}
          alt=""
          fetchPriority="high"
        />
        <div className="v2-hero__overlay" aria-hidden />
        <div className="container-page v2-hero__frame">
          <div className="v2-hero__content">
            <p className="v2-hero__eyebrow v2-anim v2-anim-d1">FORESTOFF · термо, сушёное, естественной влажности</p>
            <h1 className="v2-hero__h1 v2-anim v2-anim-d2">
              <span className="v2-hero__title-line">Древесина</span>
              <span className="v2-hero__title-line v2-hero__title-accent">под вашу задачу</span>
            </h1>
            <p className="v2-hero__sub v2-anim v2-anim-d3">
              Термо, сушёное и естественной влажности.
              <span className="v2-hero__lead-break" />
              Подберём формат под проект, бюджет и сроки.
            </p>
            <div className="v2-hero__cta v2-anim v2-anim-d4">
              <a href="#catalog" className="v2-btn v2-btn-hero">
                Смотреть каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTRO PANEL — макет под hero ═════════════════════ */}
      <section className="v2-intro">
        <div className="v2-intro-panel v2-reveal">
            <div className="v2-marquee-wrap v2-marquee-wrap--panel">
              <div className="v2-marquee-track">
                {[...WOOD_SPECIES, ...WOOD_SPECIES].map((sp, i) => (
                  <div className="v2-marquee-item" key={i}>
                    <span className="v2-marquee-text">{sp}</span>
                    <span className="v2-marquee-dot" />
                  </div>
                ))}
              </div>
            </div>

            <div className="v2-intro-grid">
              <div className="v2-intro-cell v2-intro-cell--cats">
                <h3 className="v2-intro-heading">Категории</h3>
                <ul className="v2-cat-list">
                  {CATEGORIES.map(cat => (
                    <li className="v2-cat-item" key={cat}>
                      <a href="#catalog">
                        <span>{cat}</span>
                        <span className="v2-cat-chevron"><IconChevronRight /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="v2-intro-cell v2-intro-cell--adv">
                <h3 className="v2-intro-heading">Преимущества</h3>
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

              <div className="v2-intro-cell v2-intro-cell--featured">
                <div className="v2-intro-featured__media">
                  <img src={assetUrl('/media/catalog-4.png')} alt="" loading="lazy" />
                </div>
                <div className="v2-intro-featured__body">
                  <div className="v2-intro-featured__title">Термодоска ясень</div>
                  <div className="v2-intro-featured__meta">20 × 120 × 2000 мм</div>
                  <div className="v2-intro-featured__price">5 420 ₽ / м²</div>
                  <a href="/catalog" className="v2-btn v2-btn-wide v2-btn-submit">
                    Подробнее
                  </a>
                </div>
              </div>

              <div className="v2-intro-cell v2-intro-cell--form">
                <h3 className="v2-intro-heading">Получите консультацию</h3>
                <p className="v2-intro-lead">Подберём решение под ваш проект</p>
                <form onSubmit={e => handleSubmit(e, 'consult')} className="v2-form">
                  <input type="text" className="v2-input" placeholder="Имя" />
                  <input type="tel" className="v2-input" placeholder="Телефон" />
                  <textarea className="v2-input v2-input-area" placeholder="Сообщение" rows={4} />
                  <button
                    type="submit"
                    className="v2-btn v2-btn-wide v2-btn-submit"
                    style={{ background: consultStatus === 'sent' ? '#3D6B4F' : undefined }}
                  >
                    {consultStatus === 'sent' ? 'Отправлено ✓' : 'Отправить'}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </section>

      {/* ═══ КАТАЛОГ — bento (макет) ══════════════════════════ */}
      <section id="catalog" className="v2-catalog">
        <div className="container-page">
          <div className="v2-catalog-bento v2-reveal">
            <header className="v2-catalog-head">
              <p className="v2-catalog-kicker">Коллекция</p>
              <h2 className="v2-catalog-title">
                Столы из
                <br />
                <span className="v2-title-accent">живого дерева</span>
              </h2>
              <p className="v2-catalog-desc">
                Эксклюзивные столы, слэбы и изделия из редких пород — подбор под интерьер, размеры и задачу проекта.
              </p>
            </header>

            <div className="v2-catalog-bento-stack">
              {CATALOG_ITEMS.filter(item => item.id === 2 || item.id === 3).map(item => (
                <article key={item.id} className="v2-catalog-card">
                  <img src={assetUrl(item.image)} alt="" loading="lazy" />
                  <div className="v2-catalog-card__shade" aria-hidden />
                  <div className="v2-catalog-card__body">
                    <span className="v2-catalog-card__tag">{CATALOG_CAT_LABELS[item.cat] ?? item.cat}</span>
                    <h3 className="v2-catalog-card__title">{catalogShortName(item.name)}</h3>
                  </div>
                  <span className="v2-catalog-card__arrow" aria-hidden>
                    <IconChevronRight />
                  </span>
                </article>
              ))}
            </div>

            {CATALOG_ITEMS.filter(item => item.id !== 2 && item.id !== 3).map(item => {
              const featured = item.id === 1
              const slot = CATALOG_BENTO_SLOT[item.id] ?? ''
              return (
                <article
                  key={item.id}
                  className={`v2-catalog-card ${slot}${featured ? ' is-featured' : ''}`}
                >
                  <img src={assetUrl(item.image)} alt="" loading="lazy" />
                  <div className="v2-catalog-card__shade" aria-hidden />
                  <div className="v2-catalog-card__body">
                    <span className="v2-catalog-card__tag">{CATALOG_CAT_LABELS[item.cat] ?? item.cat}</span>
                    <h3 className="v2-catalog-card__title">{catalogShortName(item.name)}</h3>
                    {featured && (
                      <>
                        <p className="v2-catalog-card__desc">{item.species}</p>
                        <a href="/catalog" className="v2-btn v2-catalog-card__btn">
                          Подробнее
                        </a>
                      </>
                    )}
                  </div>
                  {!featured && (
                    <span className="v2-catalog-card__arrow" aria-hidden>
                      <IconChevronRight />
                    </span>
                  )}
                </article>
              )
            })}
          </div>

          <div className="v2-catalog-cta v2-reveal">
            <a href="/catalog" className="v2-btn v2-catalog-cta-btn">
              Смотреть весь каталог
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ОТЗЫВЫ ══════════════════════════════════════════ */}
      <section id="trust" className="v2-testimonials">
        <div className="container-page">
          <header className="v2-testimonials-head v2-reveal">
            <p className="v2-section-label">Отзывы</p>
            <h2 className="v2-heading-sm">Что говорят<br /><span className="v2-title-accent">клиенты</span></h2>
          </header>
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

      {/* ═══ ПРОЦЕСС — показатели | фото | этапы ═════════════════ */}
      <section id="process" className="v2-process">
        <div className="container-page">
          <header className="v2-process-head v2-reveal">
            <p className="v2-process-kicker">Производство</p>
            <h2 className="v2-process-title">Собственное производство<br /><span className="v2-title-accent">полного цикла</span></h2>
            <p className="v2-process-lead">
              От валки леса до финальной полировки — каждый этап под нашим контролем.
            </p>
          </header>

          <div className="v2-process__layout">
            <div className="v2-process-steps v2-reveal v2-reveal-d1">
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

            <div className="v2-process-right v2-reveal v2-reveal-d2">
              <div className="v2-process-visual">
                <img src={assetUrl('/media/process.png')} alt="" className="v2-process-img" loading="lazy" />
              </div>
              <div className="v2-process-stats">
                {PROCESS_STATS.map((stat, i) => (
                  <div
                    className={`v2-stat-box v2-reveal v2-reveal-d${Math.min(i + 1, 4)}`}
                    key={stat.label}
                  >
                    <div>
                      <div className="v2-stat-num">{stat.num}</div>
                      <div className="v2-stat-label">{stat.label}</div>
                      {stat.desc ? <div className="v2-stat-desc">{stat.desc}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ МАТЕРИАЛЫ ═══════════════════════════════════════ */}
      <section id="materials" className="v2-materials">
        <div className="container-page v2-materials__header v2-reveal">
          <div className="v2-materials__header-inner">
            <p className="v2-materials-lead">
              Каждая порода — свой характер, история, аромат.
            </p>
            <header className="v2-materials-head">
              <p className="v2-section-label">Материалы</p>
              <h2 className="v2-heading-sm">Редкие породы<br /><span className="v2-title-accent">со всего мира</span></h2>
            </header>
          </div>
        </div>

        <div className="v2-mat-marquee" aria-label="Породы дерева">
          <div className="v2-mat-marquee__track">
            {[...MATERIALS, ...MATERIALS].map((mat, i) => (
              <article className="v2-mat-card" key={`${mat.name}-${i}`}>
                <img
                  src={assetUrl(`/media/material-${(i % MATERIALS.length) + 1}.png`)}
                  alt=""
                  loading="lazy"
                />
                <div className="v2-mat-overlay">
                  <span className="v2-mat-tag">{mat.tag}</span>
                  <div className="v2-mat-name">{mat.name}</div>
                  <div className="v2-mat-desc">{mat.desc}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ КОНТАКТ ═════════════════════════════════════════ */}
      <section
        id="contact"
        className="v2-contact"
        style={{ '--v2-contact-bg-image': `url(${assetUrl('/media/contact-bg.png')})` } as CSSProperties}
      >
        <div className="container-page v2-contact__layout">
          <div className="v2-reveal">
            <p className="v2-section-label v2-contact-kicker">Приедьте и потрогайте</p>
            <h2 className="v2-contact-h2">Найдите свой<br /><span>слэб</span></h2>
            <p className="v2-contact-p">
              Работаем с тремя форматами: термо, сушёное и естественной влажности.
              Поможем подобрать подходящий вариант под ваш проект.
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

          <div className="v2-contact-forms v2-reveal v2-reveal-d1">
            <div className="v2-contact-switch" role="tablist" aria-label="Тип обращения">
              <button
                type="button"
                role="tab"
                aria-selected={contactFormMode === 'request'}
                className={`v2-contact-switch__btn${contactFormMode === 'request' ? ' is-active' : ''}`}
                onClick={() => setContactFormMode('request')}
              >
                Оставить заявку
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={contactFormMode === 'coop'}
                className={`v2-contact-switch__btn${contactFormMode === 'coop' ? ' is-active' : ''}`}
                onClick={() => setContactFormMode('coop')}
              >
                Сотрудничество
              </button>
            </div>

            {contactFormMode === 'request' ? (
              <form onSubmit={e => handleSubmit(e, 'contact')} className="v2-contact-form">
                <p className="v2-contact-form-label">Оставить заявку</p>
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
            ) : (
              <form onSubmit={e => handleSubmit(e, 'coop')} className="v2-contact-form v2-contact-form--secondary">
                <p className="v2-contact-form-label">Предложить сотрудничество</p>
                <div className="v2-contact-row">
                  <input type="text" className="v2-contact-input" placeholder="Компания / имя" />
                  <input type="tel" className="v2-contact-input" placeholder="Телефон / мессенджер" />
                </div>
                <input type="text" className="v2-contact-input" placeholder="Формат сотрудничества (опт, дизайн-проекты, поставки)" />
                <textarea rows={4} className="v2-contact-input" placeholder="Опишите предложение..." style={{ resize: 'vertical' }} />
                <button
                  type="submit"
                  className="v2-btn"
                  style={{ background: coopStatus === 'sent' ? '#3D6B4F' : 'var(--v2-accent)', alignSelf: 'flex-start', padding: '16px 44px' }}
                >
                  {coopStatus === 'sent' ? 'Отправлено ✓' : 'Отправить предложение'}
                </button>
                <p className="v2-contact-note">Ответим в течение 2 часов в рабочее время</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer className="v2-footer">
        <div className="container-page">
          <div className="v2-footer__grid">
            <div>
              <div className="v2-footer__brand">
                <img
                  src={assetUrl('/media/logo.png')}
                  alt="Главный по слэбам"
                  className="nav-logo"
                />
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
            <span className="v2-footer__copy">© 2025 Главный по слэбам · Термо, сушёное и естественной влажности</span>
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

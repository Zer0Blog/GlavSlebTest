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
} from './data'
import {
  ADV_ICONS,
  ArrowRight,
  ChevronRight,
  CloseIcon,
  USP_ICONS,
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
} from './icons'

export default function ModernHomePage() {
  const [theme, setTheme] = useState<'thermo' | 'nature'>('thermo')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.modern-home .reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const materialsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = materialsRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.classList.add('dragging')
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }
    const onMouseLeave = () => {
      isDown = false
      el.classList.remove('dragging')
    }
    const onMouseUp = () => {
      isDown = false
      el.classList.remove('dragging')
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = scrollLeft - (x - startX) * 1.5
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)
    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'thermo' ? 'nature' : 'thermo'))
  }, [])

  const handleFormSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'consult') => {
    e.preventDefault()
    const statusSetter = type === 'contact' ? setFormStatus : setConsultStatus
    statusSetter('sent')
    setTimeout(() => statusSetter('idle'), 3000)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
<div className="modern-home min-h-screen">
      {/* ═══════════════════════════════════════
          MOBILE MENU
          ═══════════════════════════════════════ */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <button
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

      {/* ═══════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════ */}
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
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 text-decoration-none">
            <img src="/media/logo.png" alt="Главный по слэбам" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-display text-lg md:text-xl tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Главный <span style={{ color: 'var(--accent-gold)' }}>по слэбам</span>
            </span>
          </a>

          {/* Desktop Links */}
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

          {/* Right side */}
          <div className="flex items-center gap-4">
            <span className="hidden text-[10px] tracking-[0.1em] uppercase sm:block" style={{ color: 'var(--text-tertiary)' }}>
              {theme === 'thermo' ? 'Тёмная' : 'Светлая'}
            </span>
            <button
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

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-[1400px]">
          {/* Video container */}
          <div className="hero-fade relative w-full overflow-hidden rounded-3xl sm:rounded-[2rem]" style={{ aspectRatio: '21/9' }}>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              poster="/media/hero-poster.png"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              {/* hero.mov — H.264 в контейнере MOV; Safari и часть браузеров */}
              <source src="/media/hero.mov" type="video/mp4" />
              {/* Web-версия из hero.mov для Chrome / Edge / Firefox */}
              <source src="/media/hero-web.mp4" type="video/mp4" />
            </video>
            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16">
              <p className="hero-fade hero-fade-d1 mb-4 text-[10px] font-medium tracking-[0.35em] uppercase sm:text-[11px]" style={{ color: 'var(--accent-gold)' }}>
                Сочи · Полный цикл · Индивидуальное производство
              </p>
              <h1 className="hero-fade hero-fade-d2 font-display mb-6 text-3xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ color: '#F5F0EA' }}>
                Термодревесина<br />
                <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>премиум-качества</em>
              </h1>
              <div className="hero-fade hero-fade-d3 flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="#catalog"
                  className="rounded-2xl px-7 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90 sm:px-8 sm:py-4"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Смотреть каталог
                </a>
                <a
                  href="#process"
                  className="group flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase transition-colors duration-300"
                  style={{ color: 'rgba(245,240,234,0.6)' }}
                >
                  О производстве
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE
          ═══════════════════════════════════════ */}
      <div
        className="overflow-hidden border-y py-5 t-transition"
        style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}
      >
        <div className="marquee-track flex w-max gap-12">
          {[...WOOD_SPECIES, ...WOOD_SPECIES].map((sp, i) => (
            <div key={i} className="flex items-center gap-12 whitespace-nowrap">
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
                {sp}
              </span>
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          4-COLUMN INFO GRID
          ═══════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Categories */}
          <div
            className="reveal rounded-2xl p-8 t-transition"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 className="mb-6 text-[13px] font-semibold tracking-[0.06em] uppercase" style={{ color: 'var(--text-primary)' }}>
              Категории
            </h3>
            <ul className="flex flex-col">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="group flex items-center justify-between py-3.5 transition-colors duration-300"
                    style={{ borderBottom: `1px solid var(--border)`, color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span className="text-[13px]">{cat}</span>
                    <ChevronRight className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Advantages */}
          <div
            className="reveal reveal-d1 rounded-2xl p-8 t-transition"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 className="mb-6 text-[13px] font-semibold tracking-[0.06em] uppercase" style={{ color: 'var(--text-primary)' }}>
              Преимущества
            </h3>
            <div className="flex flex-col gap-6">
              {ADVANTAGES.map((adv, i) => (
                <div key={adv.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>
                    {ADV_ICONS[i]}
                  </div>
                  <div>
                    <div className="mb-1 text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {adv.title}
                    </div>
                    <div className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {adv.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Product hit */}
          <div
            className="reveal reveal-d2 card-glow overflow-hidden rounded-2xl t-transition"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
          >
            <img
              src="/media/product-hit.png"
              alt=""
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-col p-6">
              <div className="font-serif text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {theme === 'thermo' ? 'Термодоска ясень' : 'Террасная доска ясень'}
              </div>
              <div className="mt-1 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                20×120×2000 мм
              </div>
              <div className="mt-3 font-serif text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                5 420 ₽ / м²
              </div>
              <a
                href="#catalog"
                className="mt-4 block rounded-xl py-3 text-center text-[12px] font-semibold tracking-[0.08em] uppercase text-white transition-opacity duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Подробнее
              </a>
            </div>
          </div>

          {/* Col 4 — Consultation */}
          <div
            className="reveal reveal-d3 rounded-2xl p-8 t-transition"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 className="mb-1 text-[13px] font-semibold tracking-[0.04em] uppercase" style={{ color: 'var(--text-primary)' }}>
              Получите консультацию
            </h3>
            <p className="mb-6 text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Подберём решение под ваш проект
            </p>
            <form onSubmit={(e) => handleFormSubmit(e, 'consult')} className="flex flex-1 flex-col gap-3">
              <input
                type="text"
                placeholder="Имя"
                className="rounded-xl border px-4 py-3 text-[13px] outline-none transition-colors duration-300 placeholder:opacity-50"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="rounded-xl border px-4 py-3 text-[13px] outline-none transition-colors duration-300 placeholder:opacity-50"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              />
              <textarea
                rows={3}
                placeholder="Сообщение"
                className="resize-y rounded-xl border px-4 py-3 text-[13px] outline-none transition-colors duration-300 placeholder:opacity-50"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
              />
              <button
                type="submit"
                className="mt-auto rounded-xl py-3 text-[12px] font-semibold tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: consultStatus === 'sent' ? '#3D6B4F' : 'var(--accent)',
                }}
              >
                {consultStatus === 'sent' ? 'Отправлено ✓' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          USP BAR
          ═══════════════════════════════════════ */}
      <section className="border-y px-6 py-16 t-transition" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {USP_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`reveal reveal-d${i + 1} flex items-center gap-5`}
            >
              <div className="flex-shrink-0" style={{ color: 'var(--accent)' }}>
                {USP_ICONS[i]}
              </div>
              <div>
                <div className="mb-1 text-[10px] font-medium tracking-[0.18em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                  {item.label}
                </div>
                <div className="font-serif text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATALOG
          ═══════════════════════════════════════ */}
      <section id="catalog" className="px-6 py-24 md:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="reveal mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
                Коллекция
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--text-primary)' }}>
                Столы из<br />
                <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>живого дерева</em>
              </h2>
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 rounded-2xl p-1.5" style={{ backgroundColor: 'var(--bg-alt)' }}>
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className="rounded-xl px-5 py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: filter === tab.key ? 'var(--accent)' : 'transparent',
                    color: filter === tab.key ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {CATALOG_ITEMS.map((item) => {
              const visible = filter === 'all' || item.cat === filter;
              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    item.large ? 'sm:col-span-2 lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'
                  }`}
                  style={{
                    opacity: visible ? 1 : 0.15,
                    pointerEvents: visible ? 'auto' : 'none',
                    minHeight: item.large ? 420 : 280,
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="mb-2 text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                      {item.species}
                    </div>
                    <div className="font-serif text-xl font-semibold text-white md:text-2xl">
                      {item.name}
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <span className="rounded-xl border border-white/40 px-6 py-3 text-[11px] font-medium tracking-[0.18em] uppercase text-white">
                      Подробнее →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View all */}
          <div className="reveal mt-14 flex justify-center">
            <a
              href="/catalog"
              className="rounded-2xl px-10 py-4 text-[13px] font-medium tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Смотреть весь каталог
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS
          ═══════════════════════════════════════ */}
      <section id="process" className="px-6 py-24 md:py-32 t-transition" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="reveal mb-16">
            <p className="mb-4 text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
              Как мы работаем
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--text-primary)' }}>
              Собственное производство<br />
              <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>полного цикла</em>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              От валки леса до финальной полировки — каждый этап под нашим контролем.
            </p>
          </div>

          {/* Layout */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Steps */}
            <div className="flex flex-col">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`reveal reveal-d${i + 1} flex gap-6 border-b py-7`}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="font-serif text-4xl font-normal leading-none" style={{ color: 'var(--accent)' }}>
                    {step.num}
                  </span>
                  <div>
                    <div className="mb-2 text-[13px] font-semibold tracking-[0.06em] uppercase" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </div>
                    <div className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div
                className="mb-5 w-full overflow-hidden rounded-3xl"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/media/process.png"
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {PROCESS_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5 t-transition"
                    style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="font-serif text-3xl font-normal" style={{ color: 'var(--accent)' }}>
                      {stat.num}
                    </div>
                    <div className="mt-1 text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MATERIALS
          ═══════════════════════════════════════ */}
      <section id="materials" className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
                Материалы
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--text-primary)' }}>
                Редкие породы<br />
                <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>со всего мира</em>
              </h2>
            </div>
            <p className="max-w-xs text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Каждая порода — свой характер, история, аромат.
            </p>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={materialsRef}
          className="materials-scroll flex gap-6 overflow-x-auto px-6 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-6 pl-[max(calc((100vw-1280px)/2),1.5rem)]">
            {MATERIALS.map((mat, i) => (
              <div
                key={mat.name}
                className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
                style={{ width: 280, scrollSnapAlign: 'start' }}
              >
                <img
                  src={`/media/material-${i + 1}.png`}
                  alt=""
                  className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                  <span
                    className="mb-3 inline-block rounded-lg border px-3 py-1 text-[9px] font-medium tracking-[0.2em] uppercase"
                    style={{ borderColor: 'rgba(212,167,106,0.3)', color: 'var(--accent-gold)' }}
                  >
                    {mat.tag}
                  </span>
                  <div className="font-serif text-xl font-semibold text-white">{mat.name}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white/50">{mat.desc}</div>
                </div>
              </div>
            ))}
            <div className="w-6 flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS
          ═══════════════════════════════════════ */}
      <section id="projects" className="px-6 py-24 md:py-32 t-transition" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
                Работы
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ color: 'var(--text-primary)' }}>
                Реализованные<br />
                <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>проекты</em>
              </h2>
            </div>
            <a
              href="/works"
              className="rounded-2xl px-8 py-3.5 text-[12px] font-medium tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Смотреть все
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                className={`reveal reveal-d${i + 1} group relative overflow-hidden rounded-2xl`}
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={proj.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-7 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="mb-2 text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                    {proj.type}
                  </div>
                  <div className="font-serif text-2xl font-semibold leading-tight text-white">
                    {proj.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section id="trust" className="px-6 py-24 md:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-14 max-w-lg">
            <p className="mb-4 text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>
              Отзывы
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl" style={{ color: 'var(--text-primary)' }}>
              Что говорят<br />
              <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>клиенты</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                className={`reveal reveal-d${i + 1} rounded-2xl p-8 t-transition`}
                style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="mb-5 font-serif text-5xl leading-none" style={{ color: 'var(--accent)' }}>
                  &ldquo;
                </div>
                <p className="mb-6 text-[14px] italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.text}
                </p>
                <div>
                  <div className="text-[12px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
                    {t.author}
                  </div>
                  <div className="mt-1 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT / CTA
          ═══════════════════════════════════════ */}
      <section id="contact" className="relative px-6 py-28 md:py-36">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0D0905 0%, #1A1208 50%, #0A0704 100%)' }} />
        <img
          src="/media/contact-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.58) 100%)',
          }}
        />

        {/* Decorative lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
          <path d="M0 400Q350 340 700 400Q1050 460 1400 400" stroke="#D4A76A" strokeWidth="2" fill="none" />
          <path d="M0 440Q350 380 700 440Q1050 500 1400 440" stroke="#D4A76A" strokeWidth="1.5" fill="none" />
          <path d="M0 360Q350 300 700 360Q1050 420 1400 360" stroke="#D4A76A" strokeWidth="1" fill="none" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — Info */}
          <div>
            <p className="mb-4 text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-gold)' }}>
              Приедьте и потрогайте
            </p>
            <h2 className="font-display mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ color: '#fff' }}>
              Найдите свой<br />
              <em className="not-italic" style={{ color: 'var(--accent-gold)' }}>слэб</em>
            </h2>
            <p className="mb-12 max-w-md text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Более 1200 слэбов в наличии. Шоурум в Сочи, ул. Краснофлотская, 11/16. Работаем по всей России. Бесплатная консультация.
            </p>
            <div className="flex flex-wrap gap-10">
              <div>
                <div className="mb-2 text-[9px] font-medium tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Телефон
                </div>
                <div className="font-serif text-xl font-normal text-white">+7 (800) *** ** **</div>
              </div>
              <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div className="mb-2 text-[9px] font-medium tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Адрес
                </div>
                <div className="font-serif text-lg font-normal text-white">Сочи, Краснофлотская 11/16</div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={(e) => handleFormSubmit(e, 'contact')} className="flex flex-col gap-4">
            <p className="mb-2 text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Оставить заявку
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Ваше имя"
                className="rounded-xl border px-5 py-4 text-[13px] outline-none transition-colors duration-300 placeholder:text-white/25"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="rounded-xl border px-5 py-4 text-[13px] outline-none transition-colors duration-300 placeholder:text-white/25"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
            <input
              type="text"
              placeholder="Что вас интересует?"
              className="rounded-xl border px-5 py-4 text-[13px] outline-none transition-colors duration-300 placeholder:text-white/25"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <textarea
              rows={4}
              placeholder="Расскажите о вашем проекте..."
              className="resize-y rounded-xl border px-5 py-4 text-[13px] outline-none transition-colors duration-300 placeholder:text-white/25"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <button
              type="submit"
              className="mt-2 self-start rounded-2xl px-10 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: formStatus === 'sent' ? '#3D6B4F' : 'var(--accent)' }}
            >
              {formStatus === 'sent' ? 'Отправлено ✓' : 'Отправить заявку'}
            </button>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Ответим в течение 2 часов в рабочее время
            </p>
          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t px-6 py-16 md:py-20" style={{ backgroundColor: '#141008', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <span className="font-serif text-2xl font-semibold tracking-[0.1em] uppercase text-white">
                SEQUOIA
              </span>
              <span className="mt-1 block text-[8px] tracking-[0.28em] uppercase" style={{ color: 'var(--accent)' }}>
                Wood Company
              </span>
              <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Эксклюзивная мебель из редких пород дерева. Полный цикл производства. Индивидуальные проекты любой сложности.
              </p>
            </div>

            {/* Catalog links */}
            <div>
              <div className="mb-5 text-[12px] font-semibold tracking-[0.1em] uppercase text-white">
                Каталог
              </div>
              <ul className="flex flex-col gap-3">
                {['Террасная доска', 'Фасадная доска', 'Планкен', 'Слэбы'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors duration-300"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <div className="mb-5 text-[12px] font-semibold tracking-[0.1em] uppercase text-white">
                Компания
              </div>
              <ul className="flex flex-col gap-3">
                {['О компании', 'Технология', 'Проекты', 'Контакты'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors duration-300"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <div className="mb-5 text-[12px] font-semibold tracking-[0.1em] uppercase text-white">
                Контакты
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Шоурум
                  </div>
                  <div className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    г. Сочи, ул. Краснофлотская, 11/16
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Телефон
                  </div>
                  <div className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    +7 (800) *** ** **
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Email
                  </div>
                  <div className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    info@sequoia-wood.ru
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 border-t pt-8 sm:flex-row" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © 2025 Живое дерево · Премиальная термодревесина
            </div>
            <div className="flex gap-5">
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <TelegramIcon />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { CloseIcon } from '@/components/sections/modern-home/icons'
import { assetUrl } from '@/lib/base-path'
import type { V2Theme } from './useV2Theme'

export type V2NavVariant = 'home' | 'standalone'

type V2NavLink = {
  label: string
  href: string
  homeHref: string
}

const V2_NAV_LINKS: V2NavLink[] = [
  { label: 'Каталог', href: '/catalog', homeHref: '#catalog' },
  { label: 'Материалы', href: '/breeds', homeHref: '/breeds' },
  { label: 'Работы', href: '/works', homeHref: '/works' },
  { label: 'Производство', href: '/v2#process', homeHref: '#process' },
  { label: 'О нас', href: '/about', homeHref: '/about' },
  { label: 'Контакты', href: '/contacts', homeHref: '/contacts' },
]

type V2NavProps = {
  variant?: V2NavVariant
  theme: V2Theme
  onToggleTheme: () => void
}

function navHref(link: V2NavLink, variant: V2NavVariant): string {
  return variant === 'home' ? link.homeHref : link.href
}

function NavLink({
  href,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  children: ReactNode
}) {
  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}

export default function V2Nav({ variant = 'home', theme, onToggleTheme }: V2NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const solidNav = scrolled || theme === 'nature'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const homeHref = variant === 'home' ? '#home' : '/v2'

  return (
    <>
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
            <NavLink
              key={link.label}
              href={navHref(link, variant)}
              onClick={closeMenu}
              className="text-3xl font-bold uppercase tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            href="/contacts"
            onClick={closeMenu}
            className="mt-4 rounded-2xl px-8 py-4 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Связаться
          </NavLink>
        </div>
      )}

      <nav
        className={`v2-nav fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          solidNav ? 'v2-nav--solid' : ''
        } ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          backgroundColor: solidNav ? 'var(--bg-nav)' : 'transparent',
          backdropFilter: solidNav ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: solidNav ? 'blur(20px)' : 'none',
          borderBottom: solidNav ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: solidNav ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="v2-nav-inner relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-6 sm:gap-4">
          <NavLink href={homeHref} className="nav-logo-link relative z-10 shrink-0 text-decoration-none">
            <img src={assetUrl('/media/logo.png')} alt="Главный по слэбам" className="nav-logo" />
          </NavLink>

          <ul className="v2-nav-links pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 xl:gap-7 lg:pointer-events-auto lg:flex">
            {V2_NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  href={navHref(link, variant)}
                  className="whitespace-nowrap text-[13px] font-medium tracking-[0.06em] uppercase transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <span className="hidden text-[10px] tracking-[0.1em] uppercase sm:block" style={{ color: 'var(--text-tertiary)' }}>
              {theme === 'thermo' ? 'Тёмная' : 'Светлая'}
            </span>
            <button
              type="button"
              onClick={onToggleTheme}
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
            <NavLink
              href="/contacts"
              className="hidden rounded-xl px-5 py-2.5 text-[12px] font-medium tracking-[0.08em] uppercase text-white transition-all duration-300 hover:opacity-90 sm:block"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Связаться
            </NavLink>
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
    </>
  )
}

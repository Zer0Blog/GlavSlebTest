'use client'

import { useCallback, useEffect, useState } from 'react'
import { NAV_LINKS } from '@/components/sections/modern-home/data'
import { CloseIcon } from '@/components/sections/modern-home/icons'

export default function V3Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      {menuOpen && (
        <div className="v3-mobile-menu">
          <button type="button" className="v3-mobile-menu__close" onClick={closeMenu} aria-label="Закрыть меню">
            <CloseIcon />
          </button>
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="v3-mobile-menu__link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="v3-nav__cta v3-mobile-menu__cta" onClick={closeMenu}>
            Связаться
          </a>
        </div>
      )}

      <nav className={`v3-nav${scrolled ? ' v3-nav--scrolled' : ''}`}>
        <div className="v3-nav__inner">
          <a href="#home" className="v3-nav__logo-link">
            <img src="/media/logo.png" alt="FORESTOFF" className="v3-nav__logo" />
          </a>

          <ul className="v3-nav__links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className="v3-nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="v3-nav__actions">
            <a href="#contact" className="v3-nav__cta v3-nav__cta--desktop">
              Связаться
            </a>
            <button
              type="button"
              className="v3-nav__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

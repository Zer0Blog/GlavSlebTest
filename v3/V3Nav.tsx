'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

export default function V3Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`v3-nav${scrolled ? ' v3-nav--scrolled' : ''}`}>
      <div className="v3-nav__inner">
        <a href="#home" className="v3-nav__logo-link">
          <img src="/media/logo.png" alt="FORESTOFF" className="v3-nav__logo" />
        </a>

        <ul className="v3-nav__links">
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="v3-nav__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/contacts" className="v3-nav__cta">
          Связаться
        </a>
      </div>
    </nav>
  )
}

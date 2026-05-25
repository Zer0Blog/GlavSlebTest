'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ContactModal from '@/components/ui/ContactModal'

const links = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/breeds', label: 'Породы' },
  { href: '/works', label: 'Работы' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [modal, setModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="site-chrome-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 container-page h-[var(--nav-h)]"
        style={{
          background: 'rgba(14,12,10,.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid var(--border)',
        }}>
        <Link
          href="/"
          className="font-display text-lg md:text-xl tracking-wide shrink-0"
          style={{ color: 'var(--text)' }}>
          Главный <span style={{ color: 'var(--accent)' }}>по слэбам</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: pathname === l.href ? 'var(--text)' : 'var(--muted)' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setModal(true)}
            className="btn-primary text-[11px] sm:text-[12px] px-4 py-2 sm:px-6 sm:py-2.5">
            Заявка
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden p-2 -mr-2 transition-colors"
            style={{ color: 'var(--text)' }}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden pt-[var(--nav-h)]"
          style={{ background: 'rgba(14,12,10,.97)' }}>
          <div className="container-page py-6 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="py-4 text-[15px] tracking-widest uppercase border-b border-[var(--border)] transition-colors"
                style={{ color: pathname === l.href ? 'var(--accent)' : 'var(--text)' }}>
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setModal(true) }}
              className="btn-primary w-full mt-6">
              Оставить заявку
            </button>
          </div>
        </div>
      )}

      {modal && <ContactModal onClose={() => setModal(false)} />}
    </>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ContactModal from '@/components/ui/ContactModal'
import { assetUrl } from '@/lib/base-path'

const links = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/breeds', label: 'Материалы' },
  { href: '/works', label: 'Работы' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const pathname = usePathname()
  const useForestoffLogo = pathname === '/about' || pathname === '/contacts'
  const useV2Chrome = useForestoffLogo
  const [modal, setModal] = useState(false)
  const [menuAtPath, setMenuAtPath] = useState<string | null>(null)
  const menuOpen = menuAtPath === pathname

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`site-chrome-nav ${useV2Chrome ? 'site-chrome-nav--v2' : ''} fixed top-0 left-0 right-0 z-50`}
        style={{
          background: 'rgba(14,12,10,.92)',
          backdropFilter: useV2Chrome ? 'blur(20px)' : 'blur(12px)',
          borderBottom: useV2Chrome ? '1px solid var(--border)' : '0.5px solid var(--border)',
        }}>
        <div
          className={`site-chrome-nav__inner relative ${useV2Chrome ? 'site-chrome-nav__inner--v2' : 'container-page'} flex h-[var(--nav-h)] w-full items-center justify-between gap-3 sm:gap-4`}
        >
          {useForestoffLogo ? (
            <Link href="/" className="nav-logo-link relative z-10 shrink-0 text-decoration-none">
              <img src={assetUrl('/media/logo.png')} alt="FORESTOFF" className="nav-logo" />
            </Link>
          ) : (
            <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3">
              <img src={assetUrl('/media/logo.png')} alt="Главный по слэбам" className="h-10 w-10 rounded-full object-contain" />
              <span className="font-display text-lg tracking-wide md:text-xl" style={{ color: 'var(--text)' }}>
                Главный <span style={{ color: 'var(--accent)' }}>по слэбам</span>
              </span>
            </Link>
          )}

          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:pointer-events-auto lg:flex ${useV2Chrome ? 'gap-5 xl:gap-7' : 'gap-7 xl:gap-9'}`}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap uppercase transition-colors duration-200 ${useV2Chrome ? 'text-[13px] font-medium tracking-[0.06em]' : 'text-[13px] tracking-widest'}`}
                style={{ color: pathname === l.href ? 'var(--text)' : 'var(--muted)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setModal(true)}
              className="btn-primary text-[11px] sm:text-[12px] px-4 py-2 sm:px-6 sm:py-2.5">
              {useV2Chrome ? 'Связаться' : 'Заявка'}
            </button>
            <button
              type="button"
              onClick={() => setMenuAtPath(menuOpen ? null : pathname)}
              className="lg:hidden p-2 -mr-2 transition-colors"
              style={{ color: 'var(--text)' }}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
              onClick={() => { setMenuAtPath(null); setModal(true) }}
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

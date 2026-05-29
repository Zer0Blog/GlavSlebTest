'use client'

import type { ReactNode } from 'react'
import V2Nav, { type V2NavVariant } from './V2Nav'
import V2Footer from './V2Footer'
import { useV2Theme } from './useV2Theme'

type V2PageShellProps = {
  children: ReactNode
  variant?: V2NavVariant
}

export default function V2PageShell({ children, variant = 'standalone' }: V2PageShellProps) {
  const { theme, toggleTheme } = useV2Theme()

  return (
    <div className="home-v2 modern-home min-h-screen">
      <V2Nav variant={variant} theme={theme} onToggleTheme={toggleTheme} />
      {children}
      <V2Footer />
    </div>
  )
}

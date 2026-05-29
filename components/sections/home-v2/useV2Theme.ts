'use client'

import { useCallback, useEffect, useState } from 'react'

export type V2Theme = 'thermo' | 'nature'

function readSavedTheme(): V2Theme {
  if (typeof window === 'undefined') return 'thermo'
  try {
    const saved = localStorage.getItem('sq-theme')
    if (saved === 'thermo' || saved === 'nature') return saved
  } catch {
    /* ignore */
  }
  return 'thermo'
}

export function useV2Theme() {
  const [theme, setTheme] = useState<V2Theme>(readSavedTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('sq-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'thermo' ? 'nature' : 'thermo'))
  }, [])

  return { theme, toggleTheme }
}

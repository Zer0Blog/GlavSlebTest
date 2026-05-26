'use client'

import { useEffect } from 'react'
import V3Body from './V3Body'
import V3Hero from './V3Hero'
import V3Nav from './V3Nav'

export default function V3HomePage() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'thermo')
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <div className="v3-home">
      <V3Nav />
      <V3Hero />
      <V3Body />
    </div>
  )
}

import type { Metadata } from 'next'
import V3HomePage from './V3HomePage'
import './v3.css'

export const metadata: Metadata = {
  title: 'FORESTOFF — Термодревесина премиум-качества',
  description: 'Стабильность. Красота. Долговечность. Термообработка для вашего проекта.',
}

export default function V3Page() {
  return <V3HomePage />
}

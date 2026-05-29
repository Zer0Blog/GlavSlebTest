import type { ReactNode } from 'react'

type Props = {
  kicker: string
  title: ReactNode
  description?: string
  variant?: 'default' | 'gradient'
  compactMobile?: boolean
}

export default function PageHeader({
  kicker,
  title,
  description,
  variant = 'default',
  compactMobile = false,
}: Props) {
  return (
    <header
      className={`container-page ${
        compactMobile ? 'py-7 md:py-14 lg:py-16' : 'py-10 md:py-14 lg:py-16'
      } border-b border-[var(--border)]`}
      style={
        variant === 'gradient'
          ? {
              background: 'linear-gradient(135deg, #1A1208 0%, var(--bg) 100%)',
              borderBottom: '0.5px solid var(--border)',
            }
          : { background: 'var(--bg2)' }
      }>
      <p className="kicker mb-3 md:mb-4">{kicker}</p>
      <h1 className="font-display font-medium leading-[1.08] text-[clamp(2rem,6vw,3.5rem)] mb-2 md:mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-sm md:text-base max-w-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      )}
    </header>
  )
}

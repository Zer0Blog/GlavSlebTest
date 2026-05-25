'use client'
import Link from 'next/link'

interface SlabCardProps {
  id: string
  species: string
  size: string
  price: string
  woodClass?: string
  featured?: boolean
}

export default function SlabCard({
  id,
  species,
  size,
  price,
  woodClass = 'wood-1',
  featured = false,
}: SlabCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="group relative overflow-hidden block cursor-pointer min-h-[280px] sm:min-h-[320px]"
      style={{
        aspectRatio: featured ? undefined : '3/4',
        background: 'var(--bg2)',
      }}>
      <div
        className={`w-full h-full min-h-[inherit] transition-transform duration-700 ease-out group-hover:scale-[1.04] ${woodClass}`}
        style={{ minHeight: featured ? '100%' : undefined }}
      />

      <div
        className="absolute inset-0 opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(14,12,10,.92) 0%, transparent 55%)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-0 md:translate-y-2 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
        <p className="kicker !text-[10px] sm:!text-[11px] !tracking-[.12em] mb-1 sm:mb-1.5">{species}</p>
        <p className="font-display text-lg sm:text-xl mb-1">Слэб #{id}</p>
        <p className="text-[12px] sm:text-[13px]" style={{ color: 'var(--muted)' }}>
          {size}
        </p>
        <p className="text-[14px] sm:text-[15px] font-medium mt-2" style={{ color: 'var(--gold)' }}>
          от {price}
        </p>
      </div>
    </Link>
  )
}

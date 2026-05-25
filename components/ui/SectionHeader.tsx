import type { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  kicker: string
  title: ReactNode
  href?: string
  linkLabel?: string
}

export default function SectionHeader({ kicker, title, href, linkLabel = 'Смотреть все →' }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12 lg:mb-14">
      <div>
        <p className="kicker mb-2 md:mb-3">{kicker}</p>
        <h2 className="font-display font-medium leading-[1.1] text-[clamp(1.75rem,4vw,3rem)]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="link-arrow self-start sm:self-auto shrink-0">
          {linkLabel}
        </Link>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import SlabCard from '@/components/ui/SlabCard'
import SectionHeader from '@/components/ui/SectionHeader'

const SPECS = [
  { label: '╨Ф╨╗╨╕╨╜╨░', value: '240 ╤Б╨╝' },
  { label: '╨и╨╕╤А╨╕╨╜╨░', value: '96 ╤Б╨╝' },
  { label: '╨в╨╛╨╗╤Й╨╕╨╜╨░', value: '8 ╤Б╨╝' },
  { label: '╨Т╨╡╤Б', value: '~180 ╨║╨│' },
  { label: '╨б╤Г╤И╨║╨░', value: '╨Ъ╨░╨╝╨╡╤А╨╜╨░╤П, 2 ╨│╨╛╨┤╨░' },
  { label: '╨Т╨╗╨░╨╢╨╜╨╛╤Б╤В╤М', value: '8тАУ10%' },
  { label: '╨в╨╛╤А╤Ж╤Л', value: '╨Ч╨░╨╗╨╕╤В╤Л ╤Н╨┐╨╛╨║╤Б╨╕╨┤╨╛╨╝' },
  { label: '╨Э╨░╨╗╨╕╤З╨╕╨╡', value: '╨Э╨░ ╤Б╨║╨╗╨░╨┤╨╡', accent: true },
]

const THUMBS = ['wood-3', 'wood-1', 'wood-2', 'wood-3']

const RELATED = [
  { id: '1248', species: '╨Ф╤Г╨▒ ╤З╨╡╤А╨╡╤И╤З╨░╤В╤Л╨╣', size: '195├Ч80├Ч6 ╤Б╨╝', price: '62 000 тВ╜', woodClass: 'wood-1' },
  { id: '1205', species: '╨Ф╤Г╨▒ ╤З╨╡╤А╨╡╤И╤З╨░╤В╤Л╨╣', size: '220├Ч92├Ч7 ╤Б╨╝', price: '78 000 тВ╜', woodClass: 'wood-2' },
  { id: '1190', species: '╨Ф╤Г╨▒ ╤З╨╡╤А╨╡╤И╤З╨░╤В╤Л╨╣', size: '260├Ч105├Ч9 ╤Б╨╝', price: '95 000 тВ╜', woodClass: 'wood-3' },
  { id: '1175', species: '╨Ф╤Г╨▒ ╤З╨╡╤А╨╡╤И╤З╨░╤В╤Л╨╣', size: '180├Ч72├Ч5 ╤Б╨╝', price: '48 000 тВ╜', woodClass: 'wood-1' },
]

export default function ProductPageClient() {
  const [activeThumb, setActiveThumb] = useState(0)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(320px,420px)]">
        <div style={{ background: 'var(--bg2)' }}>
          <div className="h-[45vh] sm:h-[50vh] lg:h-[70vh]">
            <div className={`w-full h-full ${THUMBS[activeThumb]}`} />
          </div>
          <div className="flex gap-0.5 p-0.5" style={{ background: 'var(--bg)' }}>
            {THUMBS.map((cls, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveThumb(i)}
                className={`flex-1 h-14 sm:h-20 transition-all ${cls}`}
                style={{
                  border: i === activeThumb ? '2px solid var(--accent)' : '2px solid transparent',
                  opacity: i === activeThumb ? 1 : 0.6,
                }}
                aria-label={`╨д╨╛╤В╨╛ ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className="flex flex-col px-5 sm:px-8 lg:px-10 py-8 lg:py-14 lg:max-h-[calc(100vh-var(--nav-h))] lg:overflow-y-auto"
          style={{ background: 'var(--bg2)' }}>
          <p className="text-[12px] tracking-wider mb-6 lg:mb-8" style={{ color: 'var(--muted)' }}>
            <Link href="/catalog" className="hover:underline hover:text-[var(--text)]">
              ╨Ъ╨░╤В╨░╨╗╨╛╨│
            </Link>
            {' ┬╖ '}
            <Link href="/catalog?breed=oak" className="hover:underline hover:text-[var(--text)]">
              ╨Ф╤Г╨▒
            </Link>
            {' ┬╖ '}
            <span style={{ color: 'var(--accent)' }}>╨б╨╗╤Н╨▒ #1247</span>
          </p>

          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[12px] tracking-[.08em] uppercase mb-4 sm:mb-5 self-start"
            style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--accent)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            ╨Ф╤Г╨▒ ╤З╨╡╤А╨╡╤И╤З╨░╤В╤Л╨╣
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-medium mb-2">╨б╨╗╤Н╨▒ #1247</h1>
          <p className="text-sm mb-6 sm:mb-8" style={{ color: 'var(--muted)' }}>
            ╨Р╨▓╨░╤А╨╕╨╣╨╜╨╛╨╡ ╨┤╨╡╤А╨╡╨▓╨╛, ╤Г╨╗. ╨Э╨░╨▓╨░╨│╨╕╨╜╤Б╨║╨░╤П, ╨б╨╛╤З╨╕ ┬╖ 2021 ╨│╨╛╨┤
          </p>

          <p className="font-display text-2xl sm:text-3xl mb-2" style={{ color: 'var(--gold)' }}>
            85 000 тВ╜
          </p>
          <p className="text-[12px] mb-6 sm:mb-9" style={{ color: 'var(--muted)' }}>
            ╨ж╨╡╨╜╨░ ╨╖╨░ ╤Б╨╗╤Н╨▒. ╨Ю╨▒╤А╨░╨▒╨╛╤В╨║╨░ ╨╝╨░╤Б╨╗╨╛╨╝ тАФ ╨┐╨╛ ╨╖╨░╨┐╤А╨╛╤Б╤Г.
          </p>

          <div
            className="grid grid-cols-2 gap-px mb-6 sm:mb-9"
            style={{ background: 'var(--border)', border: '0.5px solid var(--border)' }}>
            {SPECS.map(s => (
              <div key={s.label} className="px-4 sm:px-5 py-3 sm:py-4" style={{ background: 'var(--bg2)' }}>
                <p className="text-[11px] tracking-[.1em] uppercase mb-1 sm:mb-1.5" style={{ color: 'var(--muted)' }}>
                  {s.label}
                </p>
                <p className="text-[14px] sm:text-[15px] font-medium" style={{ color: s.accent ? '#6BBF6B' : 'var(--text)' }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="p-4 sm:p-5 mb-6 sm:mb-9 text-[13px] leading-[1.7]"
            style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--muted)' }}>
            ╨н╤В╨╛╤В ╨┤╤Г╨▒ ╤А╨╛╤Б ╨▓ ╤Ж╨╡╨╜╤В╤А╨╡ ╨б╨╛╤З╨╕ ╨▒╨╛╨╗╨╡╨╡ 80 ╨╗╨╡╤В. ╨Т╤Л╤А╨░╨╢╨╡╨╜╨╜╤Л╨╡ ╨│╨╛╨┤╨╛╨▓╤Л╨╡ ╨║╨╛╨╗╤М╤Ж╨░, ╨╢╨╕╨▓╤Л╨╡ ╨║╤А╨░╤П, ╤В╤С╨╝╨╜╤Л╨╣ ╤Б╨╡╤А╨┤╤Ж╨╡╨▓╨╕╨╜╨╜╤Л╨╣
            ╨╛╤В╤В╨╡╨╜╨╛╨║. ╨Ш╨┤╨╡╨░╨╗╤М╨╜╨╛ ╨┤╨╗╤П ╨╛╨▒╨╡╨┤╨╡╨╜╨╜╨╛╨│╨╛ ╤Б╤В╨╛╨╗╨░ ╨╕╨╗╨╕ ╨▒╨░╤А╨╜╨╛╨╣ ╤Б╤В╨╛╨╣╨║╨╕.
          </div>

          <div className="mt-auto pt-6 sm:pt-8 border-t border-[var(--border)]">
            <p className="text-[13px] font-medium tracking-wider mb-4 sm:mb-5">╨Ю╤Б╤В╨░╨▓╨╕╤В╤М ╨╖╨░╤П╨▓╨║╤Г ╨╜╨░ ╤Н╤В╨╛╤В ╤Б╨╗╤Н╨▒</p>
            <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
              ╨Ш╨╝╤П
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="╨Т╨░╤И╨╡ ╨╕╨╝╤П"
              className="w-full px-4 py-3.5 text-sm mb-3"
            />
            <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
              ╨в╨╡╨╗╨╡╤Д╨╛╨╜ ╨╕╨╗╨╕ Telegram
            </label>
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="+7 ╨╕╨╗╨╕ @username"
              className="w-full px-4 py-3.5 text-sm mb-4"
            />
            <button type="button" className="btn-primary w-full">
              ╨е╨╛╤З╤Г ╤Н╤В╨╛╤В ╤Б╨╗╤Н╨▒
            </button>
            <p className="text-center text-[12px] mt-3" style={{ color: 'var(--muted)' }}>
              ╨Ю╤В╨▓╨╡╤В╨╕╨╝ ╨▓ ╤В╨╡╤З╨╡╨╜╨╕╨╡ ╤З╨░╤Б╨░ ┬╖ ╨Ф╨╛╤Б╤В╨░╨▓╨║╨░ ╨┐╨╛ ╨▓╤Б╨╡╨╣ ╨а╨╛╤Б╤Б╨╕╨╕
            </p>
          </div>
        </div>
      </div>

      <section className="container-page py-12 md:py-16 lg:py-20" style={{ background: 'var(--bg2)' }}>
        <SectionHeader
          kicker="╨Я╨╛╤Е╨╛╨╢╨╕╨╡ ╤Б╨╗╤Н╨▒╤Л"
          title={
            <>
              ╨Ф╤А╤Г╨│╨╕╨╡ <em className="italic" style={{ color: 'var(--gold)' }}>╨┤╤Г╨▒╨╛╨▓╤Л╨╡</em> ╤Б╨╗╤Н╨▒╤Л
            </>
          }
          href="/catalog?breed=oak"
          linkLabel="╨Т╤Б╨╡ ╨┤╤Г╨▒╤Л тЖТ"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0.5">
          {RELATED.map(s => (
            <SlabCard key={s.id} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}

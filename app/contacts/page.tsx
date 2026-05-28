'use client'
import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Clock, Send } from 'lucide-react'
import '../v3-page-theme.css'
import '../about-contacts-v2-mobile.css'
import { assetUrl } from '@/lib/base-path'

const CONTACTS = [
  { icon: MapPin, label: 'Адрес', value: 'Сочи, ул. Краснофлотская, 11/16', sub: 'Производство и шоурум' },
  { icon: Phone, label: 'Телефон', value: '+7 (800) *** ** **', sub: 'Пн–Пт 9:00–18:00', href: 'tel:+78000000000' },
  { icon: MessageCircle, label: 'Telegram', value: '@glavsleb', sub: 'Отвечаем быстро', href: 'https://t.me/glavsleb' },
  { icon: Clock, label: 'Режим', value: 'Пн–Пт 9:00–18:00', sub: 'Сб по записи' },
]

const MESSENGERS = [
  { label: 'Telegram', href: 'https://t.me/glavsleb' },
  { label: 'WhatsApp', href: 'https://wa.me/78000000000' },
  { label: 'VK', href: '#' },
]

export default function ContactsPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="v3-page-theme contacts-page">
      <header className="container-page contacts-hero-wrap py-8 md:py-12">
        <div className="contacts-hero-media relative w-full overflow-hidden rounded-3xl sm:rounded-[2rem]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster={assetUrl('/media/hero-poster.png')}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={assetUrl('/media/hero-web.mp4')} type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }} />
          <div className="contacts-hero-content absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
            <p className="kicker-v3">Контакты</p>
            <h1 className="contacts-hero-title font-display mb-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]" style={{ color: '#F5F0EA' }}>
              Свяжитесь
              <br />
              <span className="not-italic" style={{ color: 'var(--page-gold)' }}>с командой FORESTOFF</span>
            </h1>
          </div>
        </div>
        <p className="contacts-hero-intro lead-v3 mt-6 max-w-2xl">Адрес, карта и мессенджеры — выбирайте удобный способ связи.</p>
      </header>

      <section className="contacts-section contacts-section--main container-page pb-14 md:pb-20">
        <div className="contacts-main-grid grid-v3 grid-v3-2">
          <article className="contacts-card panel-v3 p-6 md:p-8">
            <div className="grid-v3">
            {CONTACTS.map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex gap-4 sm:gap-5">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid var(--page-border)', color: 'var(--page-accent)' }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--page-muted)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-[15px] font-medium hover:underline block" target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium">{value}</p>
                  )}
                  <p className="text-[13px] mt-0.5" style={{ color: 'var(--page-muted)' }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
            </div>

            <div className="mt-8">
              <p className="kicker-v3">Мессенджеры</p>
              <div className="flex flex-wrap gap-3">
                {MESSENGERS.map(m => (
                  <a
                    key={m.label}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs tracking-[.12em] uppercase border"
                    style={{ borderColor: 'var(--page-border)', color: 'var(--page-text)' }}>
                    <Send size={14} style={{ color: 'var(--page-accent)' }} />
                    {m.label}
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className="contacts-card panel-v3 p-6 md:p-8">
            <p className="kicker-v3">Карта</p>
            <h2 className="title-v3 text-2xl md:text-3xl !leading-[1.15]">
              Шоурум и производство
              <br />
              <span>в Сочи</span>
            </h2>
            <p className="lead-v3 mt-5">г. Сочи, ул. Краснофлотская, 11/16</p>
            <div className="mt-6 rounded-xl border p-6 text-center" style={{ borderColor: 'var(--page-border)', background: 'var(--page-section)' }}>
              <MapPin size={34} className="mx-auto mb-3" style={{ color: 'var(--page-accent)' }} />
              <p className="lead-v3">Открываем маршрут и отправляем геолокацию по запросу в мессенджер.</p>
              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 rounded-xl px-5 py-3 text-xs tracking-[.14em] uppercase"
                style={{ background: 'var(--page-accent)', color: '#fff' }}>
                Открыть карту
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="contacts-section contacts-section--form py-14 md:py-20" style={{ background: 'var(--page-section)' }}>
        <div className="container-page max-w-3xl">
          <p className="kicker-v3">Обратная связь</p>
          <h2 className="title-v3">
            Напишите нам
            <br />
            <span>по вашему проекту</span>
          </h2>
          <p className="lead-v3 mt-5 mb-8">Расскажите, что вас интересует: слэбы, столы или индивидуальное изготовление.</p>
          {sent ? (
            <div className="panel-v3 p-8 md:p-10 text-center">
              <p className="font-display text-xl sm:text-2xl mb-3">Заявка отправлена!</p>
              <p className="text-[14px]" style={{ color: 'var(--page-muted)' }}>
                Мы ответим в течение часа в рабочее время.
              </p>
            </div>
          ) : (
            <form className="contacts-form-card panel-v3 p-6 md:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--page-muted)' }}>
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full px-4 py-3.5 text-sm mb-4 rounded-xl border bg-transparent"
                style={{ borderColor: 'var(--page-border)' }}
              />

              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--page-muted)' }}>
                Телефон или Telegram
              </label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="+7 или @username"
                className="w-full px-4 py-3.5 text-sm mb-4 rounded-xl border bg-transparent"
                style={{ borderColor: 'var(--page-border)' }}
              />

              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--page-muted)' }}>
                Сообщение
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                placeholder="Интересует конкретный слэб? Нужен стол под заказ? Расскажите..."
                className="w-full px-4 py-3.5 text-sm mb-4 resize-y rounded-xl border bg-transparent"
                style={{ borderColor: 'var(--page-border)' }}
              />

              <button type="submit" className="w-full rounded-xl py-3.5 text-xs tracking-[.14em] uppercase font-semibold" style={{ background: 'var(--page-accent)', color: '#fff' }}>
                Отправить сообщение
              </button>
              <p className="text-center text-[12px] mt-3" style={{ color: 'var(--page-muted)' }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

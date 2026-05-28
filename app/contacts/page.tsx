'use client'
import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { MapPin, Phone, MessageCircle, Clock, Send } from 'lucide-react'
import '../v3-page-theme.css'
import '../about-contacts-v2-mobile.css'
import '../v2/home-v2.css'
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
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')
  const [coopStatus, setCoopStatus] = useState<'idle' | 'sent'>('idle')
  const [contactFormMode, setContactFormMode] = useState<'request' | 'coop'>('request')

  const handleSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'coop') => {
    e.preventDefault()
    const set = type === 'contact' ? setFormStatus : setCoopStatus
    set('sent')
    setTimeout(() => set('idle'), 3000)
  }, [])

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

      <section
        className="v2-contact"
        style={{ '--v2-contact-bg-image': `url(${assetUrl('/media/contact-bg.png')})` } as CSSProperties}
      >
        <div className="container-page v2-contact__layout">
          <div>
            <p className="v2-section-label v2-contact-kicker">Приедьте и потрогайте</p>
            <h2 className="v2-contact-h2">Найдите свой<br /><span>слэб</span></h2>
            <p className="v2-contact-p">
              Работаем с тремя форматами: термо, сушёное и естественной влажности.
              Поможем подобрать подходящий вариант под ваш проект.
            </p>
            <div className="v2-contact-details">
              <div>
                <div className="v2-contact-dt">Телефон</div>
                <div className="v2-contact-dd">+7 (800) *** ** **</div>
              </div>
              <div>
                <div className="v2-contact-dt">Адрес</div>
                <div className="v2-contact-dd">Сочи, Краснофлотская 11/16</div>
              </div>
            </div>
          </div>

          <div className="v2-contact-forms">
            <div className="v2-contact-switch" role="tablist" aria-label="Тип обращения">
              <button
                type="button"
                role="tab"
                aria-selected={contactFormMode === 'request'}
                className={`v2-contact-switch__btn${contactFormMode === 'request' ? ' is-active' : ''}`}
                onClick={() => setContactFormMode('request')}
              >
                Оставить заявку
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={contactFormMode === 'coop'}
                className={`v2-contact-switch__btn${contactFormMode === 'coop' ? ' is-active' : ''}`}
                onClick={() => setContactFormMode('coop')}
              >
                Сотрудничество
              </button>
            </div>

            {contactFormMode === 'request' ? (
              <form onSubmit={e => handleSubmit(e, 'contact')} className="v2-contact-form">
                <p className="v2-contact-form-label">Оставить заявку</p>
                <div className="v2-contact-row">
                  <input type="text" className="v2-contact-input" placeholder="Ваше имя" />
                  <input type="tel" className="v2-contact-input" placeholder="Телефон" />
                </div>
                <input type="text" className="v2-contact-input" placeholder="Что вас интересует?" />
                <textarea rows={4} className="v2-contact-input" placeholder="Расскажите о проекте..." style={{ resize: 'vertical' }} />
                <button
                  type="submit"
                  className="v2-btn"
                  style={{ background: formStatus === 'sent' ? '#3D6B4F' : 'var(--v2-accent)', alignSelf: 'flex-start', padding: '16px 44px' }}
                >
                  {formStatus === 'sent' ? 'Отправлено ✓' : 'Отправить заявку'}
                </button>
                <p className="v2-contact-note">Ответим в течение 2 часов в рабочее время</p>
              </form>
            ) : (
              <form onSubmit={e => handleSubmit(e, 'coop')} className="v2-contact-form v2-contact-form--secondary">
                <p className="v2-contact-form-label">Предложить сотрудничество</p>
                <div className="v2-contact-row">
                  <input type="text" className="v2-contact-input" placeholder="Компания / имя" />
                  <input type="tel" className="v2-contact-input" placeholder="Телефон / мессенджер" />
                </div>
                <input type="text" className="v2-contact-input" placeholder="Формат сотрудничества (опт, дизайн-проекты, поставки)" />
                <textarea rows={4} className="v2-contact-input" placeholder="Опишите предложение..." style={{ resize: 'vertical' }} />
                <button
                  type="submit"
                  className="v2-btn"
                  style={{ background: coopStatus === 'sent' ? '#3D6B4F' : 'var(--v2-accent)', alignSelf: 'flex-start', padding: '16px 44px' }}
                >
                  {coopStatus === 'sent' ? 'Отправлено ✓' : 'Отправить предложение'}
                </button>
                <p className="v2-contact-note">Ответим в течение 2 часов в рабочее время</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

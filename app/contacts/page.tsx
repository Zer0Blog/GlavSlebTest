'use client'
import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, MessageCircle, Clock, ChevronRight } from 'lucide-react'
import { IconTelegramBrand, IconVKBrand, IconWhatsAppBrand } from '@/components/sections/home-v2/V2Icons'
import '../v3-page-theme.css'
import '../about-contacts-v2-mobile.css'
import '../modern-home.css'
import '../v2/home-v2.css'
import { assetUrl } from '@/lib/base-path'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'

const VIEWPORT = { once: true, amount: 0.35 } as const

const FAQ = [
  {
    q: 'Как быстро вы отвечаете?',
    a: 'В рабочие часы — в течение 30 минут. Заявки вне рабочего времени обрабатываем утром следующего дня.',
  },
  {
    q: 'Есть ли шоурум?',
    a: 'Да, по адресу г. Сочи, ул. Краснофлотская, 11/16. Приезжайте посмотреть слэбы вживую — запись по телефону.',
  },
  {
    q: 'Работаете ли вы с регионами?',
    a: 'Да, доставляем по всей России. Крупные слэбы отправляем специализированной транспортной компанией.',
  },
  {
    q: 'Возможно ли сотрудничество?',
    a: 'Открыты к партнёрству с дизайнерами, архитекторами и мебельными мастерскими. Заполните форму сотрудничества.',
  },
]

const CONTACTS = [
  { icon: MapPin, label: 'Адрес', value: 'Сочи, ул. Краснофлотская, 11/16', sub: 'Производство и шоурум' },
  { icon: Phone, label: 'Телефон', value: '+7 (800) *** ** **', sub: 'Пн–Пт 9:00–18:00', href: 'tel:+78000000000' },
  { icon: MessageCircle, label: 'Telegram', value: '@glavsleb', sub: 'Отвечаем быстро', href: 'https://t.me/glavsleb' },
  { icon: Clock, label: 'Режим', value: 'Пн–Пт 9:00–18:00', sub: 'Сб по записи' },
]

const MESSENGERS = [
  { label: 'Telegram', href: 'https://t.me/glavsleb', icon: IconTelegramBrand },
  { label: 'WhatsApp', href: 'https://wa.me/78000000000', icon: IconWhatsAppBrand },
  { label: 'VK', href: '#', icon: IconVKBrand },
]

const MAP_LON = 39.988429
const MAP_LAT = 43.497706
const MAP_ZOOM = 17

const MAP_EMBED_SRC =
  `https://yandex.ru/map-widget/v1/?ll=${MAP_LON}%2C${MAP_LAT}&z=${MAP_ZOOM}&pt=${MAP_LON}%2C${MAP_LAT}%2Cpm2rdm`

export default function ContactsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle')
  const [coopStatus, setCoopStatus] = useState<'idle' | 'sent'>('idle')
  const [contactFormMode, setContactFormMode] = useState<'request' | 'coop'>('request')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'coop') => {
    e.preventDefault()
    const set = type === 'contact' ? setFormStatus : setCoopStatus
    set('sent')
    setTimeout(() => set('idle'), 3000)
  }, [])

  return (
    <V2PageShell variant="standalone">
    <div className="v3-page-theme contacts-page">

      {/* ── HERO — полноэкранный, как /about ── */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={assetUrl('/media/banner_dark.png')}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: '70% center' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="contacts-hero-gradient absolute inset-0" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-24 sm:px-10 md:px-14 md:pb-20 lg:px-16">
          <motion.p
            className="contacts-hero-kicker mb-4 text-[11px] font-semibold uppercase tracking-[0.36em]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Контакты
          </motion.p>
          <motion.h1
            className="contacts-hero-h1 mt-0 max-w-5xl font-semibold uppercase leading-[0.95] tracking-[0.04em]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          >
            Свяжитесь
            <br />
            <span className="contacts-hero-h1-accent font-medium" style={{ letterSpacing: '0.06em' }}>
              с командой FORESTOFF
            </span>
          </motion.h1>
          <motion.p
            className="contacts-hero-lead mt-6 max-w-2xl font-light"
            style={{ fontSize: 'clamp(14px, 1.45vw, 17px)', lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            Адрес, карта и мессенджеры — выбирайте удобный способ связи.
          </motion.p>
        </div>
      </section>

      {/* ── ШОУРУМ И ПРОИЗВОДСТВО ── */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8" style={{ alignItems: 'stretch' }}>

          {/* Информационная карточка */}
          <motion.article
            className="contacts-card flex flex-col rounded-[var(--v2-radius-xl)] p-7 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            {/* Заголовок шоурума */}
            <div className="mb-8 flex-1">
              <p className="contacts-kicker mb-3 text-[10px] font-semibold uppercase tracking-[0.36em]">
                Локация
              </p>
              <h2
                className="contacts-heading font-semibold uppercase leading-[1.05] tracking-[0.06em]"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              >
                Шоурум и производство
                <br />
                <span className="contacts-heading-accent font-medium" style={{ letterSpacing: '0.08em' }}>
                  в Сочи
                </span>
              </h2>
            </div>

            {/* Контактные данные */}
            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              {CONTACTS.map(({ icon: Icon, label, value, sub, href }, i) => (
                <motion.div
                  key={label}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <div className="contacts-icon-box flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--v2-radius-md)]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="contacts-label mb-1 text-[10px] uppercase tracking-[0.18em]">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="contacts-value block text-[14px] font-medium transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="contacts-value text-[14px] font-medium">
                        {value}
                      </p>
                    )}
                    <p className="contacts-label mt-0.5 text-[12px]">
                      {sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Мессенджеры */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            >
              <p className="contacts-kicker contacts-kicker--gold mb-3 text-[10px] font-semibold uppercase tracking-[0.36em]">
                Мессенджеры
              </p>
              <div className="flex flex-wrap gap-3">
                {MESSENGERS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacts-messenger-btn inline-flex items-center gap-2 rounded-[var(--v2-radius-lg)] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]"
                  >
                    <Icon size={14} className="contacts-messenger-icon" />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.article>

          {/* Карта */}
          <motion.article
            className="contacts-map-card overflow-hidden rounded-[var(--v2-radius-xl)]"
            style={{ minHeight: '400px' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="relative h-full w-full" style={{ minHeight: '400px' }}>
              <iframe
                title="FORESTOFF — Сочи, ул. Краснофлотская, 11/16"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 block h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── ОТВЕТЫ НА ВОПРОСЫ ── */}
      <section className="contacts-faq-section mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:px-14 md:pb-28 lg:px-16">
        <div className="pt-16 md:pt-20">
          <motion.p
            className="contacts-kicker mb-4 text-[10px] font-semibold uppercase tracking-[0.36em]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            Частые вопросы
          </motion.p>
          <motion.h2
            className="contacts-heading mb-12 max-w-2xl font-semibold uppercase leading-[1.0] tracking-[0.06em]"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          >
            Ответы на вопросы
          </motion.h2>

          <div className="grid gap-x-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                className="contacts-faq-item"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="contacts-faq-question text-[15px] font-medium tracking-[0.01em]">
                    {item.q}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{
                      color: 'var(--v2-accent)',
                      flexShrink: 0,
                      transition: 'transform 0.25s ease',
                      transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="contacts-faq-answer pb-5 text-[14px] font-light leading-[1.75]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФОРМА СВЯЗИ (без изменений) ── */}
      <section
        className="v2-contact v2-contact--standalone"
        style={{ '--v2-contact-bg-image': `url(${assetUrl('/media/contact-bg.png')})` } as CSSProperties}
      >
        <div className="container-page v2-contact__layout">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
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
          </motion.div>

          <motion.div
            className="v2-contact-forms"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          >
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
          </motion.div>
        </div>
      </section>
    </div>
    </V2PageShell>
  )
}

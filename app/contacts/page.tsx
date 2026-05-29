'use client'
import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, MessageCircle, Clock, Send, ChevronRight } from 'lucide-react'
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
  { label: 'Telegram', href: 'https://t.me/glavsleb' },
  { label: 'WhatsApp', href: 'https://wa.me/78000000000' },
  { label: 'VK', href: '#' },
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
    <div className="v3-page-theme contacts-page pt-20 md:pt-24">
      <header className="container-page contacts-hero-wrap py-8 md:py-12">
        <div className="contacts-hero-media relative w-full overflow-hidden rounded-3xl sm:rounded-[2rem]">
          <img
            src={assetUrl('/media/banner_dark.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }} />
          <div className="contacts-hero-content absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
            <motion.p
              className="kicker-v3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Контакты
            </motion.p>
            <motion.h1
              className="contacts-hero-title font-display mb-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            >
              Свяжитесь
              <br />
              <span className="not-italic" style={{ color: 'var(--page-gold)' }}>с командой FORESTOFF</span>
            </motion.h1>
            <motion.p
              className="contacts-hero-intro lead-v3 mt-4 sm:mt-5 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              Адрес, карта и мессенджеры — выбирайте удобный способ связи.
            </motion.p>
          </div>
        </div>
      </header>

      <section className="contacts-section contacts-section--main container-page pb-14 md:pb-20">
        <div className="contacts-main-grid grid-v3 grid-v3-2">
          <motion.article
            className="contacts-card contacts-card--info panel-v3 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="contacts-card__showroom">
              <h2 className="title-v3 contacts-card-showroom-title text-3xl md:text-4xl !leading-[1.15]">
                Шоурум и производство
                <br />
                <span>в Сочи</span>
              </h2>
              <p className="lead-v3 mt-5">г. Сочи, ул. Краснофлотская, 11/16</p>
            </div>

            <div className="grid-v3 contacts-card__details">
            {CONTACTS.map(({ icon: Icon, label, value, sub, href }, i) => (
              <motion.div
                key={label}
                className="flex gap-4 sm:gap-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
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
              </motion.div>
            ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            >
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
            </motion.div>
          </motion.article>

          <motion.article
            className="contacts-card contacts-card--map"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="contacts-card__map">
              <iframe
                title="FORESTOFF — Сочи, ул. Краснофлотская, 11/16"
                src={MAP_EMBED_SRC}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.article>
        </div>
      </section>

      <section className="contacts-faq container-page pb-14 md:pb-20">
        <motion.p
          className="kicker-v3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          Частые вопросы
        </motion.p>
        <motion.h2
          className="title-v3 contacts-faq__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        >
          Ответы на вопросы
        </motion.h2>

        <div className="contacts-faq__list">
          {FAQ.map((item, i) => (
            <motion.div
              key={item.q}
              className="contacts-faq__item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
            >
              <button
                type="button"
                className="contacts-faq__trigger"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="contacts-faq__question">{item.q}</span>
                <ChevronRight
                  size={16}
                  className="contacts-faq__chevron"
                  style={{ transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="contacts-faq__answer-wrap"
                  >
                    <p className="contacts-faq__answer">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

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

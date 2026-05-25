'use client'
import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

const CONTACTS = [
  { icon: MapPin, label: 'Адрес', value: 'Сочи, ул. Производственная, 12', sub: 'Производство и склад' },
  { icon: Phone, label: 'Телефон', value: '+7 (862) 200-00-00', sub: 'Пн–Пт 9:00–18:00', href: 'tel:+78622000000' },
  { icon: MessageCircle, label: 'Telegram', value: '@glavsleb', sub: 'Отвечаем быстро', href: 'https://t.me/glavsleb' },
  { icon: Clock, label: 'Режим', value: 'Пн–Пт 9:00–18:00', sub: 'Сб по записи' },
]

export default function ContactsPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div>
      <PageHeader
        kicker="Контакты"
        title={
          <>
            Свяжитесь <em className="italic" style={{ color: 'var(--gold)' }}>с нами</em>
          </>
        }
        description="Ответим в течение часа в рабочее время"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="container-page lg:max-w-none py-10 md:py-14 lg:py-16 lg:border-r border-[var(--border)]">
          <div className="mb-10 md:mb-12">
            {CONTACTS.map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex gap-4 sm:gap-5 mb-6 md:mb-8">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0"
                  style={{ border: '0.5px solid var(--border)', color: 'var(--accent)' }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-[15px] font-medium hover:underline block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium">{value}</p>
                  )}
                  <p className="text-[13px] mt-0.5" style={{ color: 'var(--muted)' }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center h-[220px] sm:h-[280px]"
            style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
            <div className="text-center px-4">
              <MapPin size={32} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
              <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
                Сочи, ул. Производственная, 12
              </p>
              <a
                href="https://yandex.ru/maps/org/glavny_po_slebam/236719908969"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[12px] tracking-wider uppercase pb-0.5 link-arrow !border-[var(--accent)]"
                style={{ color: 'var(--accent)' }}>
                Открыть в Яндекс Картах →
              </a>
            </div>
          </div>
        </div>

        <div className="container-page lg:max-w-none py-10 md:py-14 lg:py-16">
          <h2 className="font-display text-2xl sm:text-3xl mb-2">Напишите нам</h2>
          <p className="text-[14px] mb-8 md:mb-10" style={{ color: 'var(--muted)' }}>
            Расскажите что вас интересует — подберём слэб или обсудим изделие
          </p>

          {sent ? (
            <div className="p-8 md:p-10 text-center" style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
              <p className="font-display text-xl sm:text-2xl mb-3">Заявка отправлена!</p>
              <p className="text-[14px]" style={{ color: 'var(--muted)' }}>
                Мы ответим в течение часа в рабочее время.
              </p>
            </div>
          ) : (
            <>
              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full px-4 py-3.5 text-sm mb-4"
              />

              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                Телефон или Telegram
              </label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="+7 или @username"
                className="w-full px-4 py-3.5 text-sm mb-4"
              />

              <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                Сообщение
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                placeholder="Интересует конкретный слэб? Нужен стол под заказ? Расскажите..."
                className="w-full px-4 py-3.5 text-sm mb-4 resize-y"
              />

              <button type="button" onClick={() => setSent(true)} className="btn-primary w-full">
                Отправить сообщение
              </button>
              <p className="text-center text-[12px] mt-3" style={{ color: 'var(--muted)' }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

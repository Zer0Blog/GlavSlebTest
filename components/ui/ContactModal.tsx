'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function ContactModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.8)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title">
      <div
        className="relative w-full sm:max-w-md p-6 sm:p-10 max-h-[92vh] overflow-y-auto sm:rounded-none"
        style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 transition-colors hover:text-[var(--text)]"
          style={{ color: 'var(--muted)' }}
          aria-label="Закрыть">
          <X size={20} />
        </button>

        <h3 id="contact-modal-title" className="font-display text-2xl sm:text-3xl mb-2 pr-8">
          Оставить заявку
        </h3>
        <p className="text-[13px] mb-6 sm:mb-8" style={{ color: 'var(--muted)' }}>
          Ответим в течение часа в рабочее время
        </p>

        <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
          Имя
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Как вас зовут?"
          className="w-full px-4 py-3.5 text-sm mb-3"
        />

        <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
          Телефон или Telegram
        </label>
        <input
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
          placeholder="+7 или @username"
          className="w-full px-4 py-3.5 text-sm mb-3"
        />

        <label className="block text-[11px] tracking-[.08em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
          Что интересует?
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          placeholder="Слэб, столешница, стол под заказ..."
          className="w-full px-4 py-3.5 text-sm mb-4 resize-y"
        />

        <button type="button" className="btn-primary w-full">
          Отправить заявку
        </button>
        <p className="text-center text-[12px] mt-3" style={{ color: 'var(--muted)' }}>
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  )
}

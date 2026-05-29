'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ADVANTAGES,
  CATALOG_ITEMS,
  CATEGORIES,
  MATERIALS,
  PROCESS_STATS,
  PROCESS_STEPS,
  TESTIMONIALS,
  WOOD_SPECIES,
} from '@/components/sections/modern-home/data'
import { assetUrl } from '@/lib/base-path'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'

/* ─── SVG иконки ─────────────────────────────────────────── */
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.82A1 1 0 004.64 21c1.9-.22 6.36-1.07 8.36-3 2.17-2.1 2.5-5.5 2.5-7 0 0 2.5 0 4.5 2.5 0-3.5-1.5-7-3-8z" />
  </svg>
)
const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const ADV_ICONS = [<IconShield key="s" />, <IconLeaf key="l" />, <IconAward key="a" />]

const CATALOG_CAT_LABELS: Record<string, string> = {
  river: 'Стол-река',
  slab: 'Слэб',
  epoxy: 'Эпоксид',
  office: 'Офис',
}

const CATALOG_BENTO_SLOT: Record<number, string> = {
  1: 'v2-catalog-card--featured',
  4: 'v2-catalog-card--b1',
  5: 'v2-catalog-card--b2',
  6: 'v2-catalog-card--b3',
}

function catalogShortName(name: string) {
  const match = name.match(/«([^»]+)»/)
  return match ? match[1] : name
}

/* ─── Компонент ─────────────────────────────────────────── */
type ContactFormMode = 'request' | 'coop'

export default function HomePageV2() {
  const [formStatus, setFormStatus]       = useState<'idle' | 'sent'>('idle')
  const [consultStatus, setConsultStatus] = useState<'idle' | 'sent'>('idle')
  const [coopStatus, setCoopStatus] = useState<'idle' | 'sent'>('idle')
  const [contactFormMode, setContactFormMode] = useState<ContactFormMode>('request')

  /* Reveal on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.home-v2 .v2-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent, type: 'contact' | 'consult' | 'coop') => {
    e.preventDefault()
    const set = type === 'contact' ? setFormStatus : type === 'consult' ? setConsultStatus : setCoopStatus
    set('sent'); setTimeout(() => set('idle'), 3000)
  }, [])

  return (
    <V2PageShell variant="home">

      {/* ═══ HERO — полноэкранный баннер (макет) ═════════════════ */}
      <section id="home" className="v2-hero">
        <img
          className="v2-hero__bg"
          src={assetUrl('/media/hero-forestoff.png')}
          alt=""
          fetchPriority="high"
        />
        <div className="v2-hero__overlay" aria-hidden />
        <div className="container-page v2-hero__frame">
          <div className="v2-hero__content">
            <p className="v2-hero__eyebrow v2-anim v2-anim-d1">FORESTOFF · термо, сушёное, естественной влажности</p>
            <h1 className="v2-hero__h1 v2-anim v2-anim-d2">
              <span className="v2-hero__title-line">Древесина</span>
              <span className="v2-hero__title-line v2-hero__title-accent">под вашу задачу</span>
            </h1>
            <p className="v2-hero__sub v2-anim v2-anim-d3">
              Термо, сушёное и естественной влажности.
              <span className="v2-hero__lead-break" />
              Подберём формат под проект, бюджет и сроки.
            </p>
            <div className="v2-hero__cta v2-anim v2-anim-d4">
              <a href="#catalog" className="v2-btn v2-btn-hero">
                Смотреть каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTRO PANEL — макет под hero ═════════════════════ */}
      <section className="v2-intro">
        <div className="v2-intro-panel v2-reveal">
            <div className="v2-marquee-wrap v2-marquee-wrap--panel">
              <div className="v2-marquee-track">
                {[...WOOD_SPECIES, ...WOOD_SPECIES].map((sp, i) => (
                  <div className="v2-marquee-item" key={i}>
                    <span className="v2-marquee-text">{sp}</span>
                    <span className="v2-marquee-dot" />
                  </div>
                ))}
              </div>
            </div>

            <div className="v2-intro-grid">
              <div className="v2-intro-cell v2-intro-cell--cats">
                <h3 className="v2-intro-heading">Категории</h3>
                <ul className="v2-cat-list">
                  {CATEGORIES.map(cat => (
                    <li className="v2-cat-item" key={cat}>
                      <a href="#catalog">
                        <span>{cat}</span>
                        <span className="v2-cat-chevron"><IconChevronRight /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="v2-intro-cell v2-intro-cell--adv">
                <h3 className="v2-intro-heading">Преимущества</h3>
                <div className="v2-adv-list">
                  {ADVANTAGES.map((adv, i) => (
                    <div className="v2-adv-item" key={adv.title}>
                      <div className="v2-adv-icon">{ADV_ICONS[i]}</div>
                      <div>
                        <div className="v2-adv-title">{adv.title}</div>
                        <div className="v2-adv-desc">{adv.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="v2-intro-cell v2-intro-cell--featured">
                <div className="v2-intro-featured__media">
                  <img src={assetUrl('/media/catalog-4.png')} alt="" loading="lazy" />
                </div>
                <div className="v2-intro-featured__body">
                  <div className="v2-intro-featured__title">Термодоска ясень</div>
                  <div className="v2-intro-featured__meta">20 × 120 × 2000 мм</div>
                  <div className="v2-intro-featured__price">5 420 ₽ / м²</div>
                  <a href="/catalog" className="v2-btn v2-btn-wide v2-btn-submit">
                    Подробнее
                  </a>
                </div>
              </div>

              <div className="v2-intro-cell v2-intro-cell--form">
                <h3 className="v2-intro-heading">Получите консультацию</h3>
                <p className="v2-intro-lead">Подберём решение под ваш проект</p>
                <form onSubmit={e => handleSubmit(e, 'consult')} className="v2-form">
                  <input type="text" className="v2-input" placeholder="Имя" />
                  <input type="tel" className="v2-input" placeholder="Телефон" />
                  <textarea className="v2-input v2-input-area" placeholder="Сообщение" rows={4} />
                  <button
                    type="submit"
                    className="v2-btn v2-btn-wide v2-btn-submit"
                    style={{ background: consultStatus === 'sent' ? '#3D6B4F' : undefined }}
                  >
                    {consultStatus === 'sent' ? 'Отправлено ✓' : 'Отправить'}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </section>

      {/* ═══ КАТАЛОГ — bento (макет) ══════════════════════════ */}
      <section id="catalog" className="v2-catalog">
        <div className="container-page">
          <div className="v2-catalog-bento v2-reveal">
            <header className="v2-catalog-head">
              <p className="v2-catalog-kicker">Коллекция</p>
              <h2 className="v2-catalog-title">
                Столы из
                <br />
                <span className="v2-title-accent">живого дерева</span>
              </h2>
              <p className="v2-catalog-desc">
                Эксклюзивные столы, слэбы и изделия из редких пород — подбор под интерьер, размеры и задачу проекта.
              </p>
            </header>

            <div className="v2-catalog-bento-stack">
              {CATALOG_ITEMS.filter(item => item.id === 2 || item.id === 3).map(item => (
                <article key={item.id} className="v2-catalog-card">
                  <img src={assetUrl(item.image)} alt="" loading="lazy" />
                  <div className="v2-catalog-card__shade" aria-hidden />
                  <div className="v2-catalog-card__body">
                    <span className="v2-catalog-card__tag">{CATALOG_CAT_LABELS[item.cat] ?? item.cat}</span>
                    <h3 className="v2-catalog-card__title">{catalogShortName(item.name)}</h3>
                  </div>
                  <span className="v2-catalog-card__arrow" aria-hidden>
                    <IconChevronRight />
                  </span>
                </article>
              ))}
            </div>

            {CATALOG_ITEMS.filter(item => item.id !== 2 && item.id !== 3).map(item => {
              const featured = item.id === 1
              const slot = CATALOG_BENTO_SLOT[item.id] ?? ''
              return (
                <article
                  key={item.id}
                  className={`v2-catalog-card ${slot}${featured ? ' is-featured' : ''}`}
                >
                  <img src={assetUrl(item.image)} alt="" loading="lazy" />
                  <div className="v2-catalog-card__shade" aria-hidden />
                  <div className="v2-catalog-card__body">
                    <span className="v2-catalog-card__tag">{CATALOG_CAT_LABELS[item.cat] ?? item.cat}</span>
                    <h3 className="v2-catalog-card__title">{catalogShortName(item.name)}</h3>
                    {featured && (
                      <>
                        <p className="v2-catalog-card__desc">{item.species}</p>
                        <a href="/catalog" className="v2-btn v2-catalog-card__btn">
                          Подробнее
                        </a>
                      </>
                    )}
                  </div>
                  {!featured && (
                    <span className="v2-catalog-card__arrow" aria-hidden>
                      <IconChevronRight />
                    </span>
                  )}
                </article>
              )
            })}
          </div>

          <div className="v2-catalog-cta v2-reveal">
            <a href="/catalog" className="v2-btn v2-catalog-cta-btn">
              Смотреть весь каталог
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ОТЗЫВЫ ══════════════════════════════════════════ */}
      <section id="trust" className="v2-testimonials">
        <div className="container-page">
          <header className="v2-testimonials-head v2-reveal">
            <p className="v2-section-label">Отзывы</p>
            <h2 className="v2-heading-sm">Что говорят<br /><span className="v2-title-accent">клиенты</span></h2>
          </header>
          <div className="v2-test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className={`v2-test-card v2-reveal v2-reveal-d${i + 1}`} key={t.author}>
                <div className="v2-test-quote">"</div>
                <p className="v2-test-text">{t.text}</p>
                <div className="v2-test-author">{t.author}</div>
                <div className="v2-test-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ПРОЦЕСС — показатели | фото | этапы ═════════════════ */}
      <section id="process" className="v2-process">
        <div className="container-page">
          <header className="v2-process-head v2-reveal">
            <p className="v2-process-kicker">Производство</p>
            <h2 className="v2-process-title">Собственное производство<br /><span className="v2-title-accent">полного цикла</span></h2>
            <p className="v2-process-lead">
              От валки леса до финальной полировки — каждый этап под нашим контролем.
            </p>
          </header>

          <div className="v2-process__layout">
            <div className="v2-process-steps v2-reveal v2-reveal-d1">
              {PROCESS_STEPS.map((step, i) => (
                <div className={`v2-step v2-reveal v2-reveal-d${Math.min(i + 1, 4)}`} key={step.num}>
                  <span className="v2-step-num">{step.num}</span>
                  <div>
                    <div className="v2-step-title">{step.title}</div>
                    <div className="v2-step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="v2-process-right v2-reveal v2-reveal-d2">
              <div className="v2-process-visual">
                <img src={assetUrl('/media/process.png')} alt="" className="v2-process-img" loading="lazy" />
              </div>
              <div className="v2-process-stats">
                {PROCESS_STATS.map((stat, i) => (
                  <div
                    className={`v2-stat-box v2-reveal v2-reveal-d${Math.min(i + 1, 4)}`}
                    key={stat.label}
                  >
                    <div>
                      <div className="v2-stat-num">{stat.num}</div>
                      <div className="v2-stat-label">{stat.label}</div>
                      {stat.desc ? <div className="v2-stat-desc">{stat.desc}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ МАТЕРИАЛЫ ═══════════════════════════════════════ */}
      <section id="materials" className="v2-materials">
        <div className="container-page v2-materials__header v2-reveal">
          <div className="v2-materials__header-inner">
            <p className="v2-materials-lead">
              Каждая порода — свой характер, история, аромат.
            </p>
            <header className="v2-materials-head">
              <p className="v2-section-label">Материалы</p>
              <h2 className="v2-heading-sm">Редкие породы<br /><span className="v2-title-accent">со всего мира</span></h2>
            </header>
          </div>
        </div>

        <div className="v2-mat-marquee" aria-label="Породы дерева">
          <div className="v2-mat-marquee__track">
            {[...MATERIALS, ...MATERIALS].map((mat, i) => (
              <article className="v2-mat-card" key={`${mat.name}-${i}`}>
                <img
                  src={assetUrl(`/media/material-${(i % MATERIALS.length) + 1}.png`)}
                  alt=""
                  loading="lazy"
                />
                <div className="v2-mat-overlay">
                  <span className="v2-mat-tag">{mat.tag}</span>
                  <div className="v2-mat-name">{mat.name}</div>
                  <div className="v2-mat-desc">{mat.desc}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ КОНТАКТ ═════════════════════════════════════════ */}
      <section
        id="contact"
        className="v2-contact"
        style={{ '--v2-contact-bg-image': `url(${assetUrl('/media/contact-bg.png')})` } as CSSProperties}
      >
        <div className="container-page v2-contact__layout">
          <div className="v2-reveal">
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

          <div className="v2-contact-forms v2-reveal v2-reveal-d1">
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
                  <input type="tel"  className="v2-contact-input" placeholder="Телефон" />
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

    </V2PageShell>
  )
}

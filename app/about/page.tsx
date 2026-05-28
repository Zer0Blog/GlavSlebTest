'use client'
import '../v3-page-theme.css'
import '../about-contacts-v2-mobile.css'
import { assetUrl } from '@/lib/base-path'

const PRODUCTION_FACTS = [
  { num: '4', label: 'цеха полного цикла' },
  { num: '2500', label: 'кв. м производства' },
  { num: '1200+', label: 'слэбов в наличии' },
  { num: 'Siemens', label: 'пресс-вакуумная сушка' },
]

const PRODUCTION_STEPS = [
  {
    title: 'Собственная заготовка и распиловка',
    desc: 'Контролируем цикл от валки дерева до распила на профессиональных ленточных пилорамах.',
  },
  {
    title: 'Высокотехнологичная сушка',
    desc: 'Используем пресс-вакуумную сушилку Siemens для стабильности и защиты от внутренних напряжений.',
  },
  {
    title: 'Заливочная и столярный цех',
    desc: 'Делаем столы-реки, полимерные объекты, выполняем точную калибровку и финишную обработку.',
  },
  {
    title: 'Цех металлопроката',
    desc: 'Производим собственные подстолья, опоры и каркасы для комплексных проектов под ключ.',
  },
]

const TEAM = [
  {
    name: 'Производственная команда',
    role: 'Цеха, сушка, распиловка',
    desc: 'Мастера полного цикла — от распила массивных бревен до финишной обработки и упаковки изделий.',
  },
  {
    name: 'Проектная команда',
    role: 'Клиенты и реализация',
    desc: 'Подбирает материал под задачу и ведет проект: термо, сушёное и естественной влажности.',
  },
]

export default function AboutPage() {
  return (
    <div className="v3-page-theme about-page">
      <header className="container-page about-hero-wrap py-8 md:py-12">
        <div className="about-hero-media relative w-full overflow-hidden rounded-3xl sm:rounded-[2rem]">
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
          <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }} />
          <div className="about-hero-content absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
            <p className="kicker-v3">О нас</p>
            <h1 className="about-hero-title font-display mb-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]" style={{ color: '#F5F0EA' }}>
              Производство мебели
              <br />
              <span className="not-italic" style={{ color: 'var(--page-gold)' }}>полного цикла</span>
            </h1>
          </div>
        </div>
        <div className="about-hero-intro max-w-3xl mt-8 md:mt-10">
          <p className="lead-v3">
            FORESTOFF создаёт премиальные изделия из редких пород дерева: от собственной заготовки и распиловки
            до готовой мебели и предметов интерьера под ключ.
          </p>
        </div>
      </header>

      <section className="about-section about-section--facts container-page pb-14 md:pb-20">
        <div className="grid-v3 grid-v3-2">
          {PRODUCTION_FACTS.map(item => (
            <div key={item.label} className="panel-v3 p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--page-accent)' }}>
                {item.num}
              </div>
              <div className="mt-2 text-[11px] tracking-[.16em] uppercase" style={{ color: 'var(--page-muted)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section about-section--process py-14 md:py-20" style={{ background: 'var(--page-section)' }}>
        <div className="container-page">
          <p className="kicker-v3">Производство</p>
          <h2 className="title-v3">
            Как мы работаем
            <br />
            <span>на каждом этапе</span>
          </h2>
          <div className="grid-v3 grid-v3-2 mt-10">
            {PRODUCTION_STEPS.map((step, idx) => (
              <article key={step.title} className="panel-v3 p-6 md:p-8">
                <div className="text-[11px] tracking-[.16em] uppercase mb-4" style={{ color: 'var(--page-gold)' }}>
                  Этап {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold leading-tight">{step.title}</h3>
                <p className="lead-v3 mt-4">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--team container-page py-14 md:py-20">
        <div className="grid-v3 grid-v3-2">
          <div className="panel-v3 p-6 md:p-8">
            <p className="kicker-v3">Команда</p>
            <h2 className="title-v3">
              Люди
              <br />
              <span>за проектами</span>
            </h2>
            <div className="grid-v3 mt-8">
              {TEAM.map(member => (
                <article key={member.name} className="rounded-xl border p-5" style={{ borderColor: 'var(--page-border)' }}>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-[11px] tracking-[.14em] uppercase mt-2" style={{ color: 'var(--page-gold)' }}>
                    {member.role}
                  </p>
                  <p className="lead-v3 mt-4">{member.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel-v3 p-6 md:p-8">
            <p className="kicker-v3">Философия</p>
            <h2 className="title-v3">
              Материал,
              <br />
              <span>который живёт</span>
            </h2>
            <p className="lead-v3 mt-6">
              Мы не просто производим мебель — мы раскрываем характер древесины. Используем редкие породы,
              соблюдаем технологию сушки и создаём изделия, которые служат десятилетиями.
            </p>
            <p className="lead-v3 mt-4">
              Для нас важно сохранить естественную красоту материала, поэтому каждый проект проектируем индивидуально:
              по размерам, стилю и задачам пространства.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

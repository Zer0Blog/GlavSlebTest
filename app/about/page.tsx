'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { assetUrl } from '@/lib/base-path'
import V2PageShell from '@/components/sections/home-v2/V2PageShell'
import '../modern-home.css'
import '../v2/home-v2.css'

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
    desc: 'Мастера полного цикла - от распила массивных бревен до финишной обработки и упаковки изделий.',
  },
  {
    name: 'Проектная команда',
    role: 'Клиенты и реализация',
    desc: 'Подбирает материал под задачу и ведет проект: термо, сушеное и естественной влажности.',
  },
]

export default function AboutPage() {
  return (
    <V2PageShell variant="standalone">
    <div className="about-page">
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={assetUrl('/media/about-hero.mp4')} type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="about-hero-gradient absolute inset-0" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-24 sm:px-10 md:px-14 md:pb-20 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="about-kicker"
          >
            FORESTOFF
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 max-w-5xl text-4xl font-semibold uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Производство мебели
            <br />
            полного цикла
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="about-lead mt-6 max-w-2xl text-base md:text-lg"
          >
            От собственной заготовки до готовой мебели под ключ. Работаем с редкими породами дерева и ведем каждый
            проект с инженерной точностью.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
        <h2 className="about-kicker about-kicker--section">Производство в цифрах</h2>
        <div className="about-border-y mt-8 grid gap-8 border-y py-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTION_FACTS.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <p className="about-stat-num">{item.num}</p>
              <p className="about-stat-label">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-section--alt border-y">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
          <h2 className="about-kicker about-kicker--section">Как мы работаем</h2>
          <p className="mt-4 max-w-3xl text-2xl leading-tight sm:text-3xl md:text-4xl">
            Каждый этап построен как единая технологическая цепочка без аутсорса.
          </p>

          <ol className="mt-10 space-y-10">
            {PRODUCTION_STEPS.map((step, idx) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="about-border-l grid gap-4 border-l pl-6 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <p className="about-step-label">Этап {String(idx + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="text-2xl leading-tight">{step.title}</h3>
                  <p className="about-body mt-3 max-w-3xl">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 py-16 sm:px-10 md:grid-cols-2 md:px-14 md:py-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 className="about-kicker about-kicker--section">Команда</h2>
          <p className="mt-4 text-3xl leading-tight md:text-4xl">Люди, которые ведут проект от сырья до монтажа</p>

          <div className="mt-10 space-y-8">
            {TEAM.map((member) => (
              <article key={member.name} className="about-border-t border-t pt-5">
                <h3 className="text-xl">{member.name}</h3>
                <p className="about-step-label mt-2">{member.role}</p>
                <p className="about-body mt-3">{member.desc}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="about-border-t flex flex-col justify-between border-t pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          <div>
            <h2 className="about-kicker about-kicker--section">Философия</h2>
            <p className="mt-4 text-3xl leading-tight md:text-4xl">Материал, который живет десятилетиями</p>
            <p className="about-body mt-6">
              Мы не копируем формы. Мы раскрываем характер древесины через точную сушку, деликатную обработку и
              индивидуальную проектировку под реальное пространство.
            </p>
            <p className="about-body mt-4">
              Поэтому в наших изделиях остаются и структура волокон, и инженерная стабильность, и ощущение ручной
              работы на каждом касании.
            </p>
          </div>

          <Link
            href="/contacts"
            className="about-link mt-10 inline-block w-fit border-b pb-2 text-sm uppercase tracking-[0.14em]"
          >
            Обсудить проект
          </Link>
        </motion.div>
      </section>
    </div>
    </V2PageShell>
  )
}

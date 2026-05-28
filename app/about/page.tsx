'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <div className="bg-[#17120D] text-[#F5F0EA] -mt-[var(--nav-h)]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120D] via-[#17120D]/50 to-transparent" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-24 sm:px-10 md:px-14 md:pb-20 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-xs uppercase tracking-[0.25em] text-[#D4A76A]"
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
            className="mt-6 max-w-2xl text-base text-[#E8DED3] md:text-lg"
          >
            От собственной заготовки до готовой мебели под ключ. Работаем с редкими породами дерева и ведем каждый
            проект с инженерной точностью.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[#B7915E]">Производство в цифрах</h2>
        <div className="mt-8 grid gap-8 border-y border-[#3A2E22] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTION_FACTS.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <p className="text-3xl font-semibold text-[#D4A76A] md:text-4xl">{item.num}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#988271]">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#2E241B] bg-[#201810]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#B7915E]">Как мы работаем</h2>
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
                className="grid gap-4 border-l border-[#6D553B] pl-6 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[#D4A76A]">Этап {String(idx + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="text-2xl leading-tight">{step.title}</h3>
                  <p className="mt-3 max-w-3xl text-[#C8B7A7]">{step.desc}</p>
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
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#B7915E]">Команда</h2>
          <p className="mt-4 text-3xl leading-tight md:text-4xl">Люди, которые ведут проект от сырья до монтажа</p>

          <div className="mt-10 space-y-8">
            {TEAM.map((member) => (
              <article key={member.name} className="border-t border-[#3A2E22] pt-5">
                <h3 className="text-xl">{member.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#D4A76A]">{member.role}</p>
                <p className="mt-3 text-[#C8B7A7]">{member.desc}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col justify-between border-t border-[#3A2E22] pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#B7915E]">Философия</h2>
            <p className="mt-4 text-3xl leading-tight md:text-4xl">Материал, который живет десятилетиями</p>
            <p className="mt-6 text-[#C8B7A7]">
              Мы не копируем формы. Мы раскрываем характер древесины через точную сушку, деликатную обработку и
              индивидуальную проектировку под реальное пространство.
            </p>
            <p className="mt-4 text-[#C8B7A7]">
              Поэтому в наших изделиях остаются и структура волокон, и инженерная стабильность, и ощущение ручной
              работы на каждом касании.
            </p>
          </div>

          <Link
            href="/contacts"
            className="mt-10 inline-block w-fit border-b border-[#6D553B] pb-2 text-sm uppercase tracking-[0.14em] text-[#D4A76A] transition-colors hover:text-[#F5F0EA]"
          >
            Обсудить проект
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

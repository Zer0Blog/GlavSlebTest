'use client'

const TEAM = [
  { name: 'Армен', role: 'Производство', desc: 'Руководит цехом с первого дня. Знает каждое дерево в Сочи по имени.' },
  { name: 'Николай', role: 'Продажи и клиенты', desc: 'Помогает подобрать идеальный слэб под любой проект и бюджет.' },
]

const STEPS = [
  { num: '01', title: 'Заготовка', desc: 'Получаем аварийные деревья от городских служб Сочи. Работаем только с легальными источниками.' },
  { num: '02', title: 'Распил', desc: 'Профессиональное оборудование позволяет распустить бревно на слэбы любой толщины — от 3 до 15 см.' },
  { num: '03', title: 'Сушка', desc: 'Камерная сушка 1–3 года. Влажность доводим до 8–10%. Торцы заливаем эпоксидом от трещин.' },
  { num: '04', title: 'Обработка', desc: 'Шлифовка, выравнивание, нанесение масла или лака по желанию заказчика.' },
  { num: '05', title: 'Отгрузка', desc: 'Бережная упаковка, доставка по всей России. Работаем с транспортными компаниями и карго.' },
]

const STATS = [
  { num: '2013', label: 'год основания' },
  { num: '1000+', label: 'слэбов на складе' },
  { num: '15+', label: 'пород дерева' },
  { num: '500+', label: 'выполненных заказов' },
]

export default function AboutPage() {
  return (
    <div>
      <header className="relative container-page py-12 md:py-16 lg:py-20 overflow-hidden" style={{ background: 'var(--bg2)' }}>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 wood-3 opacity-20 md:opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <p className="kicker mb-4 md:mb-5">О компании</p>
          <h1 className="font-display font-medium leading-[1.05] mb-5 md:mb-6" style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>
            Мы даём деревьям
            <br />
            <em className="italic" style={{ color: 'var(--gold)' }}>вторую жизнь</em>
          </h1>
          <p className="text-sm md:text-base leading-[1.8] max-w-xl" style={{ color: 'var(--muted)' }}>
            С 2013 года перерабатываем аварийные деревья с улиц Сочи. Вместо утилизации — уникальные слэбы, столы и
            столешницы с историей.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--border)]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="px-4 sm:px-8 lg:px-12 py-8 md:py-10 text-center"
            style={{ borderRight: i < STATS.length - 1 ? '0.5px solid var(--border)' : undefined }}>
            <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ color: 'var(--accent)' }}>
              {s.num}
            </p>
            <p className="text-[10px] sm:text-[12px] tracking-[.1em] uppercase leading-snug" style={{ color: 'var(--muted)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <section className="container-page py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="kicker mb-3 md:mb-4">История</p>
            <h2 className="font-display font-medium text-3xl md:text-4xl leading-[1.1] mb-6 md:mb-8">Как всё начиналось</h2>
            <p className="text-[15px] leading-[1.8] mb-4 md:mb-5" style={{ color: 'var(--muted)' }}>
              В 2013 году Армен увидел, как городские службы убирают огромный упавший платан в центре Сочи. Вместо того
              чтобы отвезти его на свалку, он договорился забрать бревно себе.
            </p>
            <p className="text-[15px] leading-[1.8] mb-4 md:mb-5" style={{ color: 'var(--muted)' }}>
              Так появился первый слэб. Потом второй. Потом люди начали спрашивать, можно ли купить. И понеслось.
            </p>
            <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--muted)' }}>
              Сегодня мы — производство полного цикла: от получения аварийного дерева до готового изделия с доставкой по
              России.
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="h-[280px] sm:h-[400px] lg:h-[500px] wood-1" />
            <div
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 px-5 py-3 sm:px-6 sm:py-4"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              <p className="font-display text-2xl sm:text-3xl font-bold">Сочи</p>
              <p className="text-[11px] tracking-[.08em] uppercase mt-1">место производства</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20" style={{ background: 'var(--bg2)' }}>
        <div className="container-page">
        <p className="kicker mb-3 md:mb-4">Производство</p>
        <h2 className="font-display font-medium text-3xl md:text-4xl mb-10 md:mb-16">Как мы работаем</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0.5">
          {STEPS.map(s => (
            <div key={s.num} className="p-6 md:p-8" style={{ background: 'var(--bg)', border: '0.5px solid var(--border)' }}>
              <p className="font-display text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: 'var(--border)' }}>
                {s.num}
              </p>
              <h3 className="font-display text-lg md:text-xl mb-2 md:mb-3">{s.title}</h3>
              <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16 lg:py-20">
        <p className="kicker mb-3 md:mb-4">Команда</p>
        <h2 className="font-display font-medium text-3xl md:text-4xl mb-8 md:mb-14">Люди за слэбами</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 max-w-3xl">
          {TEAM.map(m => (
            <div key={m.name} className="p-8 md:p-10" style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)' }}>
              <div
                className="w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 flex items-center justify-center font-display text-2xl italic"
                style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', color: 'var(--accent)' }}>
                {m.name[0]}
              </div>
              <h3 className="font-display text-xl md:text-2xl mb-1">{m.name}</h3>
              <p className="text-[12px] tracking-[.1em] uppercase mb-3 md:mb-4" style={{ color: 'var(--accent)' }}>
                {m.role}
              </p>
              <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

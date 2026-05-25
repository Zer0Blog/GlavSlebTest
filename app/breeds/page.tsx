'use client'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

const BREEDS = [
  { id: 'oak', abbr: 'Дб', name: 'Дуб черешчатый', lat: 'Quercus robur', hardness: '3.7 кН', color: '#8B6240', count: 312, desc: 'Самая распространённая и востребованная порода в нашем производстве. Плотная, твёрдая древесина с выраженным рисунком годовых колец. Оттенки от светло-янтарного до глубокого тёмно-коричневого. Со временем темнеет, приобретая благородную патину.', woodClass: 'wood-3' },
  { id: 'cedar', abbr: 'Кд', name: 'Кедр ливанский', lat: 'Cedrus libani', hardness: '2.4 кН', color: '#C49A6C', count: 89, desc: 'Ароматная смолистая древесина с золотисто-розовым оттенком. Лёгкий вес при хорошей прочности. Естественная устойчивость к влаге и насекомым. Каждый слэб наполнен живым ароматом.', woodClass: 'wood-2' },
  { id: 'plane', abbr: 'Пл', name: 'Платан восточный', lat: 'Platanus orientalis', hardness: '3.1 кН', color: '#A07850', count: 145, desc: 'Редкая порода с уникальным мраморным рисунком — переплетение светлых и тёмных прожилок создаёт неповторимый узор. Каждый слэб платана совершенно уникален. Высоко ценится дизайнерами.', woodClass: 'wood-1' },
  { id: 'sequoia', abbr: 'Св', name: 'Секвойя', lat: 'Sequoiadendron giganteum', hardness: '2.2 кН', color: '#7A4030', count: 54, desc: 'Древесина самых больших деревьев на планете. Характерные красно-коричневые оттенки, лёгкий вес при внушительных размерах. Слэбы секвойи — настоящие гиганты, идеальны для монументальных обеденных столов.', woodClass: 'wood-3' },
  { id: 'ash', abbr: 'Яс', name: 'Ясень обыкновенный', lat: 'Fraxinus excelsior', hardness: '4.0 кН', color: '#C8A878', count: 198, desc: 'Одна из самых прочных и упругих пород. Светлая древесина с чётким прямым рисунком. Прекрасно поддаётся обработке, хорошо держит форму. Отличный выбор для столешниц с высокой нагрузкой.', woodClass: 'wood-2' },
  { id: 'walnut', abbr: 'Ор', name: 'Орех грецкий', lat: 'Juglans regia', hardness: '3.5 кН', color: '#5C3A20', count: 76, desc: 'Благородная порода с глубоким шоколадным оттенком. Красивый волнистый рисунок, высокая плотность. Орех — классика мирового столярного искусства, символ роскоши и долговечности.', woodClass: 'wood-1' },
]

export default function BreedsPage() {
  return (
    <div>
      <PageHeader
        kicker="Породы дерева"
        variant="gradient"
        title={
          <>
            15 пород,
            <br />
            <em className="italic" style={{ color: 'var(--gold)' }}>каждая — особенная</em>
          </>
        }
        description="Все деревья — из Сочи. Перерабатываем аварийные посадки, сохраняя историю каждого дерева в текстуре слэба."
      />

      <div>
        {BREEDS.map((b, i) => (
          <article
            key={b.id}
            id={b.id}
            className="container-page py-10 md:py-14 lg:py-16 border-b border-[var(--border)] scroll-mt-[calc(var(--nav-h)+1rem)]"
            style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)' }}>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? '' : ''
              }`}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 sm:gap-4 mb-5 md:mb-6">
                  <span className="font-display italic text-5xl sm:text-6xl leading-none" style={{ color: 'var(--border)' }}>
                    {b.abbr}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium">{b.name}</h2>
                    <p className="text-sm italic mt-1" style={{ color: 'var(--muted)' }}>
                      {b.lat}
                    </p>
                  </div>
                </div>

                <p className="text-[15px] leading-[1.8] mb-6 md:mb-8" style={{ color: 'var(--muted)' }}>
                  {b.desc}
                </p>

                <div className="flex flex-wrap gap-5 sm:gap-6 mb-6 md:mb-8">
                  <div className="pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
                    <p className="text-[11px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                      Твёрдость
                    </p>
                    <p className="font-display text-lg sm:text-xl">{b.hardness}</p>
                  </div>
                  <div className="pl-4" style={{ borderLeft: '2px solid var(--border)' }}>
                    <p className="text-[11px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                      Слэбов
                    </p>
                    <p className="font-display text-lg sm:text-xl">{b.count}</p>
                  </div>
                  <div className="pl-4 flex items-center gap-2" style={{ borderLeft: '2px solid var(--border)' }}>
                    <div>
                      <p className="text-[11px] tracking-[.1em] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                        Цвет
                      </p>
                      <div className="w-5 h-5 rounded-full mt-1" style={{ background: b.color }} />
                    </div>
                  </div>
                </div>

                <Link href={`/catalog?breed=${b.id}`} className="btn-primary">
                  Смотреть слэбы
                </Link>
              </div>

              <div className={`h-56 sm:h-72 md:h-80 lg:h-[400px] ${b.woodClass} ${i % 2 === 1 ? 'lg:order-1' : ''}`} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

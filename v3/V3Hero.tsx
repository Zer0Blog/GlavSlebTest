import Image from 'next/image'
import heroBg from './media/hero-forestoff.png'

export default function V3Hero() {
  return (
    <section id="home" className="v3-hero" aria-label="Главный баннер">
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        className="v3-hero__bg"
        sizes="100vw"
      />
      <div className="v3-hero__overlay" aria-hidden />

      <div className="v3-hero__panel">
        <p className="v3-hero__eyebrow v3-fade v3-fade-d1">FORESTOFF · термодревесина</p>

        <h1 className="v3-hero__title v3-fade v3-fade-d2">
          <span className="v3-hero__title-line">Термодревесина</span>
          <span className="v3-hero__title-line v3-hero__title-accent">премиум-качества</span>
        </h1>

        <p className="v3-hero__lead v3-fade v3-fade-d3">
          Стабильность. Красота. Долговечность.
          <span className="v3-hero__lead-break" />
          Термообработка для вашего проекта.
        </p>

        <div className="v3-hero__actions v3-fade v3-fade-d4">
          <a href="#catalog" className="v3-hero__cta">
            Смотреть каталог
          </a>
        </div>
      </div>
    </section>
  )
}

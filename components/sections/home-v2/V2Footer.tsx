import { assetUrl } from '@/lib/base-path'
import { IconIG, IconTG, IconWA } from './V2Icons'

export default function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="container-page">
        <div className="v2-footer__grid">
          <div className="v2-footer__col v2-footer__col--brand">
            <div className="v2-footer__brand">
              <img
                src={assetUrl('/media/logo.png')}
                alt="Главный по слэбам"
                className="nav-logo"
              />
            </div>
            <div className="v2-footer__tagline">Wood Company · Сочи</div>
            <p className="v2-footer__desc">
              Эксклюзивная мебель из редких пород дерева. Полный цикл производства. Индивидуальные проекты любой сложности.
            </p>
          </div>
          <div className="v2-footer__col v2-footer__col--nav">
            <div className="v2-footer__col-title">Каталог</div>
            <ul className="v2-footer__links">
              {['Террасная доска', 'Фасадная доска', 'Планкен', 'Слэбы'].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="v2-footer__col v2-footer__col--nav">
            <div className="v2-footer__col-title">Компания</div>
            <ul className="v2-footer__links">
              {['О компании', 'Технология', 'Проекты', 'Контакты'].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="v2-footer__col v2-footer__col--contacts">
            <div className="v2-footer__col-title">Контакты</div>
            <div className="v2-footer__contacts-list">
              {[
                { label: 'Шоурум', val: 'г. Сочи, ул. Краснофлотская, 11/16' },
                { label: 'Телефон', val: '+7 (800) *** ** **' },
                { label: 'Email', val: 'info@sequoia-wood.ru' },
              ].map(c => (
                <div key={c.label} className="v2-footer__contact-item">
                  <div className="v2-footer__contact-label">{c.label}</div>
                  <div className="v2-footer__contact-val">{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="v2-footer__bottom">
          <span className="v2-footer__copy">© 2025 Главный по слэбам · Термо, сушёное и естественной влажности</span>
          <div className="v2-footer__socials">
            <a href="#" aria-label="Instagram"><IconIG /></a>
            <a href="#" aria-label="Telegram"><IconTG /></a>
            <a href="#" aria-label="WhatsApp"><IconWA /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import appStoreIcon from '../assets/app-store-icon.png';
import gplayIcon from '../assets/gplay-icon.png';
import { getTranslatedMobileFeatures, getTranslatedNearbyServices, useLanguage } from '../i18n';

const storeIcons = [appStoreIcon, gplayIcon];

export function MobileAppTeaser() {
  const { t } = useLanguage();
  const appFeatures = getTranslatedMobileFeatures(t);
  const nearbyServices = getTranslatedNearbyServices(t);

  return (
    <section className="section section--panel">
      <div className="container">
        <div className="mobile-teaser">
          <div className="mobile-teaser__copy">
            <div className="pill pill--accent">
              <span className="pulse-dot" />
              {t.mobile.pill}
            </div>
            <h2>
              {t.mobile.titlePrefix}
              <span>{t.mobile.titleHighlight}</span>
            </h2>
            <p>{t.mobile.description}</p>

            <div className="app-feature-grid">
              {appFeatures.map((feature) => (
                <article key={feature.title}>
                  <span>{feature.icon}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="store-badges">
              {t.mobile.stores.map((store, index) => (
                <div key={store.label} className="store-badge" aria-disabled="true">
                  <img src={storeIcons[index]} alt="" aria-hidden="true" />
                  <p>
                    <small>{store.sub}</small>
                    <strong>{store.label}</strong>
                  </p>
                  <b>{t.mobile.soon}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="phone-stack" aria-hidden="true">
            <div className="phone phone--left">
              <div className="phone__screen">
                <header>
                  <strong>
                    easy<span>Q</span>
                  </strong>
                  <small>9:41</small>
                </header>
                <p>{t.mobile.phone.nearby}</p>
                {nearbyServices.map((service) => (
                  <article key={service.name} style={{ backgroundColor: service.color }}>
                    <div>
                      <strong>{service.name}</strong>
                      <small>{service.category}</small>
                    </div>
                    <div>
                      <b>★ {service.rating}</b>
                      <small>{service.distance}</small>
                    </div>
                  </article>
                ))}
                <button type="button">{t.mobile.phone.bookNow}</button>
              </div>
            </div>

            <div className="phone phone--right">
              <div className="phone__screen">
                <h3>{t.mobile.phone.bonusTitle}</h3>
                <div className="bonus-total">
                  <strong>1,240</strong>
                  <small>{t.mobile.phone.points}</small>
                </div>
                <div className="bonus-progress">
                  <small>{t.mobile.phone.nextReward}</small>
                  <span>
                    <b />
                  </span>
                </div>
                {t.mobile.phone.bonuses.map((bonus) => (
                  <p className="bonus-row" key={bonus.label}>
                    <span>{bonus.label}</span>
                    <b className={bonus.points.startsWith('+') ? 'is-positive' : 'is-negative'}>{bonus.points}</b>
                    <small>{bonus.date}</small>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

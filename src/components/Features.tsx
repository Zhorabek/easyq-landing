import { getTranslatedFeatures, useLanguage } from '../i18n';
import { IconCheck } from './icons';

export function Features() {
  const { t } = useLanguage();
  const featureCards = getTranslatedFeatures(t);

  return (
    <section id="features" className="section section--dark">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.features.eyebrow}</p>
          <h2>{t.features.title}</h2>
          <p>{t.features.subtitle}</p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className={`feature-card feature-card--${card.tone}`} key={card.title}>
              {card.highlight ? <span className="feature-card__badge">{t.features.businessBadge}</span> : null}
              <span className="feature-card__icon">{card.icon}</span>
              <p className="feature-card__subtitle">{card.subtitle}</p>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.features.map((feature) => (
                  <li key={feature}>
                    <IconCheck size={14} /> {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

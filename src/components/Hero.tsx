import { BUSINESS_BOT_URL } from '../data';
import { useLanguage } from '../i18n';
import { CRMMock } from './CRMMock';
import { IconArrow, IconTelegram } from './icons';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="hero section-grid-bg">
      <div className="container hero__inner">
        <div className="hero__copy fade-up">
          <div className="pill pill--accent">
            <span className="pulse-dot" />
            {t.hero.pill}
          </div>

          <h1>
            {t.hero.titleLine1}
            <br />
            <span>{t.hero.titleLine2}</span>
          </h1>

          <p className="hero__lead">
            {t.hero.leadPrefix}
            <strong>{t.hero.leadStrong}</strong>
            {t.hero.leadSuffix}
          </p>

          <div className="hero__actions">
            <a className="button button--accent button--large" href={BUSINESS_BOT_URL} target="_blank" rel="noreferrer">
              {t.hero.primaryCta}
            </a>
            <a className="text-link" href="#how">
              {t.hero.secondaryCta} <IconArrow size={14} />
            </a>
          </div>

          <p className="hero__note">{t.hero.note}</p>

          <div className="hero__stats" aria-label={t.hero.statsAria}>
            {t.hero.stats.map((stat) => (
              <span key={stat.label}>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="float">
            <CRMMock />
          </div>
          <div className="telegram-badge">
            <span>
              <IconTelegram size={16} color="#2196F3" />
            </span>
            <p>
              <strong>{t.hero.badgeTitle}</strong>
              <small>{t.hero.badgeText}</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

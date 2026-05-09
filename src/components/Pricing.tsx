import { useRef } from 'react';
import { BUSINESS_BOT_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconArrow, IconCheck } from './icons';

type PricingCardProps = {
  plan: string;
  price: string;
  period: string;
  highlighted?: boolean;
  features: readonly string[];
  badge: string;
  cta: string;
};

function PricingCard({ plan, price, period, features, highlighted, badge, cta }: PricingCardProps) {
  return (
    <article className={highlighted ? 'pricing-card pricing-card--highlighted' : 'pricing-card'}>
      {highlighted ? <span className="pricing-card__badge">{badge}</span> : null}
      <p>{plan}</p>
      <div className="pricing-card__price">
        <strong>{price}</strong>
        <span>/ {period}</span>
      </div>
      <hr />
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <IconCheck size={15} /> {feature}
          </li>
        ))}
      </ul>
      <a className="button pricing-card__button" href={BUSINESS_BOT_URL} target="_blank" rel="noreferrer">
        {cta}
      </a>
    </article>
  );
}

export function Pricing() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const slidePricing = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>('.pricing-card');

    if (!track) return;

    const styles = window.getComputedStyle(track);
    const parsedGap = parseFloat(styles.columnGap);
    const gap = Number.isFinite(parsedGap) ? parsedGap : 20;
    const cardStep = firstCard ? firstCard.offsetWidth + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: cardStep * direction,
      behavior: 'smooth',
    });
  };

  return (
    <section id="pricing" className="section section--panel">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.pricing.eyebrow}</p>
          <h2>{t.pricing.title}</h2>
          <p>{t.pricing.subtitle}</p>
        </div>

        <div className="pricing-carousel">
          <div className="pricing-carousel__controls">
            <button
              className="pricing-carousel__button pricing-carousel__button--prev"
              type="button"
              aria-label={t.pricing.previousLabel}
              onClick={() => slidePricing(-1)}
            >
              <IconArrow size={18} />
            </button>
            <button
              className="pricing-carousel__button"
              type="button"
              aria-label={t.pricing.nextLabel}
              onClick={() => slidePricing(1)}
            >
              <IconArrow size={18} />
            </button>
          </div>

          <div className="pricing-grid" ref={trackRef} tabIndex={0}>
            {t.pricing.plans.map((plan) => (
              <PricingCard key={plan.plan} {...plan} badge={t.pricing.badge} cta={t.pricing.cta} />
            ))}
          </div>
        </div>

        <p className="pricing-note">{t.pricing.note}</p>
      </div>
    </section>
  );
}

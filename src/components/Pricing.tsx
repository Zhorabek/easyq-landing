import { BUSINESS_BOT_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconCheck } from './icons';

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

  return (
    <section id="pricing" className="section section--panel">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.pricing.eyebrow}</p>
          <h2>{t.pricing.title}</h2>
          <p>{t.pricing.subtitle}</p>
        </div>

        <div className="pricing-grid">
          {t.pricing.plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} badge={t.pricing.badge} cta={t.pricing.cta} />
          ))}
        </div>

        <p className="pricing-note">{t.pricing.note}</p>
      </div>
    </section>
  );
}

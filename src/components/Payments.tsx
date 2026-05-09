import { HUMO_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconArrow, IconCheck } from './icons';

export function Payments() {
  const { t } = useLanguage();

  return (
    <section id="payments" className="section payment-section">
      <div className="container payment-section__inner">
        <div className="payment-section__brand">
          <span>HUMO</span>
          <small>bank card payments</small>
        </div>

        <div className="payment-section__copy">
          <p className="eyebrow">{t.payments.eyebrow}</p>
          <h2>{t.payments.title}</h2>
          <p>{t.payments.description}</p>
          <ul className="check-list">
            {t.payments.points.map((point) => (
              <li key={point}>
                <IconCheck size={16} /> {point}
              </li>
            ))}
          </ul>
          <a className="button button--ghost" href={HUMO_URL} target="_blank" rel="noreferrer">
            {t.payments.cta} <IconArrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

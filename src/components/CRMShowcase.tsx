import { CRM_URL } from '../data';
import { useLanguage } from '../i18n';
import { CRMMock } from './CRMMock';
import { IconArrow, IconCheck } from './icons';

export function CRMShowcase() {
  const { t } = useLanguage();

  return (
    <section className="section section--panel">
      <div className="container crm-showcase">
        <div className="crm-showcase__copy">
          <p className="eyebrow">{t.crm.eyebrow}</p>
          <h2>{t.crm.title}</h2>
          <p>{t.crm.description}</p>
          <ul className="check-list">
            {t.crm.features.map((feature) => (
              <li key={feature}>
                <IconCheck size={16} /> {feature}
              </li>
            ))}
          </ul>
          <a className="button button--accent" href={CRM_URL} target="_blank" rel="noreferrer">
            {t.crm.cta} <IconArrow size={14} />
          </a>
        </div>
        <div className="crm-showcase__visual float">
          <CRMMock />
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '../i18n';
import { IconCheck } from './icons';

export function AboutUs() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section section--panel">
      <div className="container about-section">
        <div className="about-section__copy">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.description}</p>
          <h3>{t.about.servicesTitle}</h3>
          <ul className="check-list">
            {t.about.services.map((service) => (
              <li key={service}>
                <IconCheck size={16} /> {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="company-card">
          <h3>{t.about.companyTitle}</h3>
          <dl>
            {t.about.companyDetails.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

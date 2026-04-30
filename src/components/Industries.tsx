import { getTranslatedIndustries, useLanguage } from '../i18n';

export function Industries() {
  const { t } = useLanguage();
  const industries = getTranslatedIndustries(t);

  return (
    <section id="industries" className="section section--dark">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.industries.eyebrow}</p>
          <h2>{t.industries.title}</h2>
          <p>{t.industries.subtitle}</p>
        </div>

        <div className="industry-grid">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.name} style={{ backgroundColor: industry.color }}>
              <span>{industry.icon}</span>
              <h3>{industry.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '../i18n';

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how" className="section section--dark">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.how.eyebrow}</p>
          <h2>{t.how.title}</h2>
        </div>

        <div className="steps">
          <span className="steps__line" aria-hidden="true" />
          {t.how.steps.map((step) => (
            <article className="step-card" key={step.step}>
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

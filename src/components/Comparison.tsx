import { useLanguage } from '../i18n';
import { IconCheck } from './icons';

export function Comparison() {
  const { t } = useLanguage();

  return (
    <section className="section section--dark">
      <div className="container comparison">
        <div className="section-heading">
          <h2>{t.comparison.title}</h2>
          <p>{t.comparison.subtitle}</p>
        </div>

        <div className="comparison-grid">
          <article className="comparison-card">
            <h3>{t.comparison.withoutTitle}</h3>
            {t.comparison.without.map((item) => (
              <p key={item}>
                <span>×</span>
                {item}
              </p>
            ))}
          </article>

          <article className="comparison-card comparison-card--accent">
            <h3>{t.comparison.withTitle}</h3>
            {t.comparison.with.map((item) => (
              <p key={item}>
                <IconCheck size={16} />
                {item}
              </p>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from '../i18n';

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="section section--dark">
      <div className="container">
        <div className="section-heading">
          <div className="stars" aria-hidden="true">
            {'★★★★★'}
          </div>
          <h2>{t.testimonials.title}</h2>
        </div>

        <div className="testimonial-grid">
          {t.testimonials.items.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="stars stars--small" aria-hidden="true">
                {'★★★★★'}
              </div>
              <p>&quot;{testimonial.text}&quot;</p>
              <div className="testimonial-card__person">
                <span>{testimonial.name[0]}</span>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.business}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

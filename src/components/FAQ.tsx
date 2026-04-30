import { useState } from 'react';
import { useLanguage } from '../i18n';
import { IconChevronDown } from './icons';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  return (
    <section className="section section--dark faq-section">
      <div className="container faq">
        <div className="section-heading">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
          <p>{t.faq.subtitle}</p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article className={isOpen ? 'faq-item faq-item--open' : 'faq-item'} key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <IconChevronDown />
                </button>
                <div id={`faq-answer-${index}`} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

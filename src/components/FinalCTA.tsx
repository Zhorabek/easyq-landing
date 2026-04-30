import { BUSINESS_BOT_URL, TELEGRAM_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconArrow, IconTelegram } from './icons';

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <span className="final-cta__mark">Q</span>
        <h2>{t.finalCta.title}</h2>
        <p>{t.finalCta.description}</p>
        <div className="final-cta__actions">
          <a className="button button--accent button--large" href={BUSINESS_BOT_URL} target="_blank" rel="noreferrer">
            {t.finalCta.primary} <IconArrow size={16} />
          </a>
          <a className="button button--ghost button--large" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            <IconTelegram size={18} color="#2196F3" /> {t.finalCta.secondary}
          </a>
        </div>
        <small>{t.finalCta.note}</small>
      </div>
    </section>
  );
}

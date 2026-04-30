import businessBot from '../assets/business-bot.png';
import clientBot from '../assets/client-bot.png';
import { getTranslatedBotFeatures, useLanguage } from '../i18n';
import { IconTelegram } from './icons';

const botImages = [
  {
    image: clientBot,
    tone: 'blue',
  },
  {
    image: businessBot,
    tone: 'accent',
  },
] as const;

export function BotScreenshots() {
  const { t } = useLanguage();
  const botFeatures = getTranslatedBotFeatures(t);

  return (
    <section className="section telegram-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.telegram.eyebrow}</p>
          <h2>{t.telegram.title}</h2>
          <p>{t.telegram.subtitle}</p>
        </div>

        <div className="bot-grid">
          {t.telegram.bots.map((bot, index) => (
            <article className="bot-card" key={bot.label}>
              <div className={`bot-card__label bot-card__label--${botImages[index].tone}`}>
                <IconTelegram size={16} />
                <span>{bot.label}</span>
              </div>
              <div className="bot-card__image">
                <img src={botImages[index].image} alt={`${bot.label} screenshot`} loading="lazy" />
              </div>
              <div className="bot-card__copy">
                <h3>{bot.title}</h3>
                <p>{bot.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="telegram-feature-grid">
          {botFeatures.map((feature) => (
            <article key={feature.title}>
              <span>{feature.icon}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

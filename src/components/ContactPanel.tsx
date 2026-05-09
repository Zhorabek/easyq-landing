import instagramLogo from '../assets/instagram-logo.png';
import whatsappLogo from '../assets/whatsapp-logo.png';
import { BUSINESS_BOT_URL, INSTAGRAM_URL, WHATSAPP_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconArrow, IconTelegram } from './icons';

const contactLinks = [
  { key: 'Instagram', href: INSTAGRAM_URL, image: instagramLogo, alt: 'Instagram logo' },
  { key: 'WhatsApp', href: WHATSAPP_URL, image: whatsappLogo, alt: 'WhatsApp logo' },
  { key: 'Telegram', href: BUSINESS_BOT_URL, icon: 'TG' },
];

export function ContactPanel() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section section--dark">
      <div className="container contact-panel">
        <div className="section-heading">
          <p className="eyebrow">{t.contactPanel.eyebrow}</p>
          <h2>{t.contactPanel.title}</h2>
          <p>{t.contactPanel.description}</p>
        </div>

        <div className="contact-panel__grid">
          {t.contactPanel.options.map((option, index) => {
            const link = contactLinks[index];
            return (
              <a key={option.name} className="contact-card" href={link.href} target="_blank" rel="noreferrer">
                <span className={`contact-card__icon contact-card__icon--${link.key.toLowerCase()}`}>
                  {'image' in link ? <img src={link.image} alt={link.alt} /> : <IconTelegram size={20} />}
                </span>
                <strong>{option.name}</strong>
                <p>{option.description}</p>
                <small>{option.handle}</small>
                <IconArrow size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

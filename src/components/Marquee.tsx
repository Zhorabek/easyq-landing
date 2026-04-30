import { useLanguage } from '../i18n';

export function Marquee() {
  const { t } = useLanguage();

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-strip__track">
        {[0, 1].map((repeat) => (
          <div className="marquee-strip__group" key={repeat}>
            {t.marquee.map((service) => (
              <span key={`${repeat}-${service}`}>
                {service}
                <b>•</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

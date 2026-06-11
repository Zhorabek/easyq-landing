import { LANGS, useLang } from '../i18n';
import { Icon, Logo } from '../ui';
import { INSTAGRAM_URL, TELEGRAM_URL, WHATSAPP_URL } from '../data';

type FootLink = { label: string; href: string; external?: boolean };

export function Footer() {
  const { t, lang, setLang } = useLang();
  const f = t.footer;
  const L = f.links;

  const cols: Array<{ title: string; links: FootLink[] }> = [
    {
      title: f.product,
      links: [
        { label: L.features, href: '/#features' },
        { label: L.pricing, href: '/#pricing' },
        { label: L.industries, href: '/#industries' },
        { label: L.how, href: '/#how' },
      ],
    },
    {
      title: f.company,
      links: [
        { label: L.about, href: '/about' },
        { label: L.stories, href: '/#stories' },
        { label: L.contact, href: WHATSAPP_URL, external: true },
        { label: L.faq, href: '/#faq' },
      ],
    },
    {
      title: f.support,
      links: [
        { label: 'Telegram', href: TELEGRAM_URL, external: true },
        { label: 'Instagram', href: INSTAGRAM_URL, external: true },
        { label: 'WhatsApp', href: WHATSAPP_URL, external: true },
      ],
    },
  ];

  const socials: Array<{ icon: string; href: string }> = [
    { icon: 'send', href: TELEGRAM_URL },
    { icon: 'globe', href: INSTAGRAM_URL },
    { icon: 'phone', href: WHATSAPP_URL },
  ];

  return (
    <footer style={{ background: 'var(--dark-2)', color: 'var(--on-dark-2)', paddingTop: 64 }}>
      <div className="container">
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <Logo dark size={26} />
            <p className="pretty" style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 16 }}>
              {f.tagline}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {socials.map((sc) => (
                <a key={sc.icon} href={sc.href} target="_blank" rel="noopener" style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.06)', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <Icon name={sc.icon} size={18} stroke={2} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'grid', gap: 11 }}>
                {col.links.map((lnk, j) => (
                  <a
                    key={j}
                    href={lnk.href}
                    target={lnk.external ? '_blank' : undefined}
                    rel={lnk.external ? 'noopener' : undefined}
                    style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--on-dark-2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--on-dark-2)')}
                  >
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '22px 0 30px', borderTop: '1px solid rgba(255,255,255,.08)', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{f.rights}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--on-dark-2)' }}>{f.lang}:</span>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,.06)', borderRadius: 999, padding: 3, gap: 2 }}>
              {LANGS.map((Lg) => (
                <button
                  key={Lg.code}
                  onClick={() => setLang(Lg.code)}
                  style={{ fontSize: 13, fontWeight: 700, padding: '5px 11px', borderRadius: 999, color: Lg.code === lang ? 'var(--accent-ink)' : 'var(--on-dark-2)', background: Lg.code === lang ? 'var(--accent)' : 'transparent' }}
                >
                  {Lg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

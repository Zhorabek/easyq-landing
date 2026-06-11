import { useEffect, useState } from 'react';
import { type Language, LANGS, useLang } from '../i18n';
import { Button, Icon, Logo } from '../ui';
import { CRM_URL, SIGNUP_URL } from '../data';

function LangSwitch({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--surface-2)', borderRadius: 999, padding: 3, gap: 2 }}>
      {LANGS.map((L) => {
        const on = L.code === lang;
        return (
          <button
            key={L.code}
            onClick={() => setLang(L.code)}
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              padding: '5px 11px',
              borderRadius: 999,
              color: on ? 'var(--accent-ink)' : 'var(--ink-3)',
              background: on ? 'var(--accent)' : 'transparent',
              transition: 'all .15s ease',
            }}
          >
            {L.label}
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const { t, lang, setLang, theme, setTheme } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: Array<[string, string]> = [
    ['#features', t.nav.features],
    ['#industries', t.nav.industries],
    ['#how', t.nav.how],
    ['#pricing', t.nav.pricing],
    ['#faq', t.nav.faq],
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all .25s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 18, height: 72 }}>
        <a href="#top" style={{ flex: 'none' }}>
          <Logo />
        </a>
        <nav className="nav-links" style={{ display: 'flex', gap: 4, marginLeft: 14 }}>
          {links.map(([h, l]) => (
            <a
              key={h}
              href={h}
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-2)', padding: '8px 13px', borderRadius: 9, transition: 'background .15s, color .15s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)';
                e.currentTarget.style.color = 'var(--ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink-2)';
              }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangSwitch lang={lang} setLang={setLang} />
          <button
            aria-label="Theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--surface-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center', transition: 'background .15s, color .15s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--ink-2)';
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} stroke={2} />
          </button>
          <a href={CRM_URL} className="nav-signin" style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
            {t.nav.signin}
          </a>
          <Button variant="primary" size="sm" href={SIGNUP_URL}>
            {t.nav.start}
          </Button>
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            style={{ display: 'none', width: 42, height: 42, borderRadius: 11, background: 'var(--surface)', border: '1px solid var(--line)' }}
          >
            <Icon name={open ? 'x' : 'layers'} size={20} />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)', padding: '10px 0' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} style={{ fontSize: 17, fontWeight: 600, padding: '12px 4px', color: 'var(--ink)' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

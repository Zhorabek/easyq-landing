import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { Icon, Reveal } from '../ui';
import { CRM_URL } from '../data';

// Each benefit row in the left column maps to a CRM screen shown in the embed.
const CRM_TAB_SCREENS = ['calendar', 'staff', 'customers', 'analytics'];

function CrmEmbed({ lang, theme, screenIndex }: { lang: string; theme: string; screenIndex: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.5);
  const [dw, setDw] = useState(1280);
  const [loaded, setLoaded] = useState(false);
  // theme is baked into the initial src; later changes are pushed via postMessage
  const initialTheme = useRef(theme).current;
  const DESIGN_H = 860;
  const MOBILE_H = 720;
  const screen = CRM_TAB_SCREENS[screenIndex] || 'calendar';
  const narrow = dw === 402;

  // scale the fixed-width CRM to the available column width; render the CRM's own
  // mobile layout (~402px) on narrow screens instead of a shrunken desktop one
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const recalc = () => {
      const w = el.clientWidth;
      const designW = w < 560 ? 402 : 1280;
      setDw(designW);
      setScale(w / designW);
    };
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    recalc();
    return () => ro.disconnect();
  }, []);

  const post = (msg: Record<string, unknown>) => {
    try {
      frameRef.current?.contentWindow?.postMessage({ easyqcrm: true, ...msg }, '*');
    } catch {
      /* cross-origin guard */
    }
  };
  useEffect(() => { if (loaded) post({ screen }); }, [screen, loaded]);
  useEffect(() => { if (loaded) post({ lang }); }, [lang, loaded]);
  useEffect(() => { if (loaded) post({ theme }); }, [theme, loaded]);

  const base = CRM_URL.replace(/\/$/, '');
  const src = `${base}/?embed=1&theme=${initialTheme}&screen=${screen}&lang=${lang}`;

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: 'var(--surface)', border: '1px solid var(--line)' }}>
      {/* browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 15px', background: 'var(--surface-2)', borderBottom: '1px solid var(--line)' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </span>
        <div style={{ marginLeft: 8, flex: 1, maxWidth: 280, display: 'flex', alignItems: 'center', gap: 7, background: 'var(--bg)', borderRadius: 7, padding: '5px 12px', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, border: '1px solid var(--line)' }}>
          <Icon name="shield" size={12} stroke={2} style={{ color: 'var(--accent-deep)' }} /> app.easyq.uz
        </div>
      </div>
      {/* scaled live CRM */}
      <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: Math.round((narrow ? MOBILE_H : DESIGN_H) * scale), background: 'var(--surface)', overflow: 'hidden' }}>
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 2 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', border: '3px solid var(--line)', borderTopColor: 'var(--accent-deep)', animation: 'sp 1s linear infinite' }} />
          </div>
        )}
        <iframe
          ref={frameRef}
          title="EasyQ CRM"
          src={src}
          onLoad={() => setLoaded(true)}
          style={{ position: 'absolute', top: 0, left: 0, width: dw, height: narrow ? MOBILE_H : DESIGN_H, border: 'none', transform: `scale(${scale})`, transformOrigin: 'top left' }}
        />
      </div>
    </div>
  );
}

export function CrmSection() {
  const { t, lang, theme } = useLang();
  const crm = t.crm;
  const icons = ['calendar', 'users', 'scissors', 'chart'];
  const [tab, setTab] = useState(0);
  return (
    <section id="crm" className="section" style={{ background: 'var(--dark)', color: 'var(--on-dark)' }}>
      <div className="container crm-grid" style={{ display: 'grid', gridTemplateColumns: '.82fr 1.18fr', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 16, display: 'flex' }}>
            {crm.eyebrow}
          </div>
          <h2 className="h2 balance" style={{ margin: 0, color: '#fff' }}>
            {crm.title}
          </h2>
          <p className="lead pretty" style={{ marginTop: 18, color: 'var(--on-dark-2)' }}>
            {crm.sub}
          </p>
          <div style={{ display: 'grid', gap: 14, marginTop: 30 }}>
            {crm.benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 13, cursor: 'pointer' }} onClick={() => setTab(i)}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    flex: 'none',
                    display: 'grid',
                    placeItems: 'center',
                    background: tab === i ? 'var(--accent)' : 'rgba(255,255,255,.07)',
                    color: tab === i ? 'var(--accent-ink)' : 'var(--accent)',
                    transition: 'all .2s',
                  }}
                >
                  <Icon name={icons[i]} size={20} stroke={2} />
                </div>
                <div>
                  <div style={{ fontSize: 16.5, fontWeight: 800, color: '#fff' }}>{b.t}</div>
                  <div className="pretty" style={{ fontSize: 14, color: 'var(--on-dark-2)', marginTop: 2, lineHeight: 1.5 }}>
                    {b.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <CrmEmbed lang={lang} theme={theme} screenIndex={tab} />
        </Reveal>
      </div>
    </section>
  );
}

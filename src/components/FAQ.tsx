import { useState } from 'react';
import { useLang } from '../i18n';
import { Icon, Reveal, SectionHead } from '../ui';

export function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <SectionHead eyebrow={f.eyebrow} title={f.title} center max={620} />
        <div style={{ marginTop: 44, display: 'grid', gap: 12 }}>
          {f.items.map((it, i) => {
            const on = open === i;
            return (
              <Reveal key={i} delay={i * 50} className="card" style={{ borderRadius: 16, overflow: 'hidden', borderColor: on ? 'var(--line-2)' : 'var(--line)' }}>
                <button onClick={() => setOpen(on ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', textAlign: 'left' }}>
                  <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.01em', flex: 1, color: 'var(--ink)' }}>{it.q}</span>
                  <span
                    style={{
                      flex: 'none',
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: on ? 'var(--accent)' : 'var(--surface-2)',
                      color: on ? 'var(--accent-ink)' : 'var(--ink-2)',
                      display: 'grid',
                      placeItems: 'center',
                      transition: 'all .2s',
                      transform: on ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    <Icon name="chevron" size={17} stroke={2.4} />
                  </span>
                </button>
                <div style={{ maxHeight: on ? 200 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
                  <p className="pretty" style={{ margin: 0, padding: '0 22px 22px', color: 'var(--ink-2)', fontSize: 15.5, lineHeight: 1.6 }}>
                    {it.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

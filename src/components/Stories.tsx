import { useLang } from '../i18n';
import { Photo, Reveal, SectionHead, Stars } from '../ui';

export function Stories() {
  const { t } = useLang();
  const s = t.stories;
  const tones: Array<'rose' | 'warm2' | 'cool'> = ['rose', 'warm2', 'cool'];
  return (
    <section id="stories" className="section">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} center max={620} />
        <div className="stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 52 }}>
          {s.items.map((it, i) => (
            <Reveal key={i} delay={i * 90} className="card" style={{ padding: 28, borderRadius: 22, display: 'flex', flexDirection: 'column' }}>
              <Stars value={5} size={16} />
              <p className="pretty" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.01em', lineHeight: 1.45, color: 'var(--ink)', margin: '16px 0 24px', flex: 1 }}>
                “{it.q}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                <Photo tone={tones[i]} ratio="1 / 1" round="50%" style={{ width: 48, height: 48, flex: 'none' }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{it.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>
                    {it.b} · {it.i.split('·')[0].trim()}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

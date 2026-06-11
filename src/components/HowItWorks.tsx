import { useLang } from '../i18n';
import { Reveal, SectionHead } from '../ui';

export function HowItWorks() {
  const { t } = useLang();
  const h = t.how;
  return (
    <section id="how" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <SectionHead eyebrow={h.eyebrow} title={h.title} sub={h.sub} center max={680} />
        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '26px 24px', marginTop: 56, position: 'relative' }}>
          {h.steps.map((st, i) => (
            <Reveal key={i} delay={(i % 3) * 80} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: 'var(--card)',
                    border: '1.5px solid var(--line-2)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 18,
                    color: 'var(--ink)',
                    flex: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{ flex: 1, height: 2, background: i % 3 === 2 ? 'transparent' : 'repeating-linear-gradient(90deg,var(--line-2) 0 6px,transparent 6px 12px)' }}
                  className="how-line"
                />
              </div>
              <h3 style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 6px' }}>{st.t}</h3>
              <p className="pretty" style={{ margin: 0, color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5 }}>
                {st.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

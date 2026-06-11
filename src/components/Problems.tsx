import { useLang } from '../i18n';
import { Icon, Reveal, SectionHead } from '../ui';

export function Problems() {
  const { t } = useLang();
  const p = t.problems;
  const icons = ['trend', 'bell', 'clock', 'wallet', 'users', 'send'];
  return (
    <section id="features" className="section">
      <div className="container">
        <SectionHead eyebrow={p.eyebrow} title={p.title} sub={p.sub} center max={760} />
        <div className="prob-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 56 }}>
          {p.items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 70} className="card prob-card" style={{ padding: 26, borderRadius: 20 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--accent-tint)', display: 'grid', placeItems: 'center', marginBottom: 18, color: 'var(--accent-deep)' }}>
                <Icon name={icons[i]} size={24} stroke={2} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 8px' }}>{it.t}</h3>
              <p className="pretty" style={{ margin: 0, color: 'var(--ink-2)', fontSize: 15.5, lineHeight: 1.55 }}>
                {it.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

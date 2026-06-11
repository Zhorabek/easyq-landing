import { useLang } from '../i18n';
import { Icon, Logo, Reveal, SectionHead } from '../ui';

export function Comparison() {
  const { t } = useLang();
  const c = t.compare;
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <SectionHead eyebrow={c.eyebrow} title={c.title} center max={620} />
        <div className="cmp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, maxWidth: 900, margin: '50px auto 0' }}>
          {/* without */}
          <Reveal className="card" style={{ padding: 28, borderRadius: 22, background: 'var(--card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#FBEAEA', color: '#D9534F', display: 'grid', placeItems: 'center' }}>
                <Icon name="x" size={17} stroke={2.4} />
              </span>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink-2)' }}>{c.without}</span>
            </div>
            <div style={{ display: 'grid', gap: 2 }}>
              {c.rows.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, padding: '12px 0', borderTop: i ? '1px solid var(--line)' : 'none', color: 'var(--ink-3)', fontSize: 15, fontWeight: 600 }}>
                  <Icon name="x" size={18} stroke={2.4} style={{ color: '#D9A0A0', flex: 'none', marginTop: 1 }} />
                  {r[0]}
                </div>
              ))}
            </div>
          </Reveal>
          {/* with */}
          <Reveal delay={100} style={{ padding: 28, borderRadius: 22, background: 'var(--block)', color: '#fff', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ flex: 'none' }}>
                <Logo dark size={20} />
              </span>
            </div>
            <div style={{ display: 'grid', gap: 2 }}>
              {c.rows.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, padding: '12px 0', borderTop: i ? '1px solid rgba(255,255,255,.1)' : 'none', fontSize: 15.5, fontWeight: 700 }}>
                  <Icon name="check" size={18} stroke={2.6} style={{ color: 'var(--accent)', flex: 'none', marginTop: 1 }} />
                  {r[1]}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

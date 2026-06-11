import { useLang } from '../i18n';
import { Icon, Reveal, SectionHead } from '../ui';

export function AboutUs() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="section">
      <div className="container" style={{ paddingTop: 24 }}>
        <SectionHead eyebrow={a.eyebrow} title={a.title} sub={a.description} max={760} />
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 36, marginTop: 48, alignItems: 'start' }}>
          <Reveal>
            <h3 className="h3" style={{ margin: '0 0 18px' }}>
              {a.servicesTitle}
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {a.services.map((service) => (
                <div key={service} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--accent-tint)', color: 'var(--accent-deep)', display: 'grid', placeItems: 'center', flex: 'none', marginTop: 1 }}>
                    <Icon name="check" size={15} stroke={2.6} />
                  </span>
                  <span style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{service}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="card" style={{ padding: 28, borderRadius: 22 }}>
            <h3 className="h3" style={{ margin: '0 0 18px' }}>
              {a.companyTitle}
            </h3>
            <dl style={{ margin: 0, display: 'grid', gap: 0 }}>
              {a.companyDetails.map(([label, value], i) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 18, padding: '11px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <dt style={{ fontSize: 13.5, color: 'var(--ink-3)', fontWeight: 600, flex: 'none' }}>{label}</dt>
                  <dd style={{ margin: 0, fontSize: 13.5, color: 'var(--ink)', fontWeight: 700, textAlign: 'right' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

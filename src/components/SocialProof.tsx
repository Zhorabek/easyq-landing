import { useLang } from '../i18n';
import { Reveal } from '../ui';

export function SocialProof() {
  const { t } = useLang();
  const s = t.social;
  const logos = ['Barber House', 'Lola Beauty', 'AutoSpa', 'DentaPro', 'FitZone', 'VetCare', 'GlowSpa', 'Royal Cuts'];
  const stats: Array<[string, string, string]> = [
    ['1 200+', s.s1, s.s1l],
    ['85 000+', s.s2, s.s2l],
    ['−70%', s.s3, s.s3l],
    ['4.9★', s.s4, s.s4l],
  ];
  return (
    <section className="section--tight" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal as="p" className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 26 }}>
          {s.title}
        </Reveal>
        <div className="logo-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 40px', marginBottom: 44 }}>
          {logos.map((l, i) => (
            <Reveal key={l} delay={i * 40} style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink-3)', opacity: 0.72 }}>
              {l}
            </Reveal>
          ))}
        </div>
        <div className="stat-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {stats.map(([big, mid, lab], i) => (
            <Reveal key={i} delay={i * 70} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(30px,3.6vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--ink)' }}>{big}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-2)', marginTop: 2 }}>{mid}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>{lab}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

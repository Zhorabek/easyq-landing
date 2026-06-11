import { useLang } from '../i18n';
import { Icon, Reveal, SectionHead } from '../ui';

// industry tile: icon + duotone treatment
const INDUSTRIES_META: Array<{ icon: string; g: [string, string] }> = [
  { icon: 'scissors', g: ['#2F6E6A', '#16403E'] }, // Barbershops
  { icon: 'star', g: ['#9E5276', '#582844'] }, // Beauty Salons
  { icon: 'droplet', g: ['#37719F', '#1C3F61'] }, // Car Washes
  { icon: 'tooth', g: ['#2E8795', '#16505A'] }, // Dental Clinics
  { icon: 'heartpulse', g: ['#3F8C5C', '#1F4E34'] }, // Medical Centers
  { icon: 'dumbbell', g: ['#B0703A', '#6B4220'] }, // Fitness Clubs
  { icon: 'spark', g: ['#6B5AA6', '#382B63'] }, // Massage Studios
  { icon: 'paw', g: ['#996A41', '#583B24'] }, // Veterinary Clinics
];

export function Industries() {
  const { t } = useLang();
  const ind = t.industries;
  return (
    <section id="industries" className="section">
      <div className="container">
        <SectionHead eyebrow={ind.eyebrow} title={ind.title} sub={ind.sub} center max={680} />
        <div className="ind-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 52 }}>
          {ind.list.map((name, i) => {
            const m = INDUSTRIES_META[i] || INDUSTRIES_META[0];
            return (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div
                  className="ind-card"
                  style={{
                    position: 'relative',
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow), inset 0 0 0 1px rgba(255,255,255,.06)',
                    aspectRatio: '3 / 3.6',
                    background: `linear-gradient(155deg, ${m.g[0]}, ${m.g[1]})`,
                  }}
                >
                  {/* large faint watermark icon */}
                  <div className="ind-deco" style={{ position: 'absolute', right: -10, top: 38, zIndex: 1, color: '#fff', opacity: 0.14, pointerEvents: 'none' }}>
                    <Icon name={m.icon} size={120} stroke={1.4} />
                  </div>
                  {/* scrim for label legibility */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,20,.6) 0%, rgba(8,12,20,.04) 52%)', zIndex: 2, pointerEvents: 'none' }} />
                  {/* category icon chip top-left */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 14,
                      top: 14,
                      zIndex: 3,
                      width: 38,
                      height: 38,
                      borderRadius: 11,
                      background: 'rgba(255,255,255,.18)',
                      backdropFilter: 'blur(6px)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      pointerEvents: 'none',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.22)',
                    }}
                  >
                    <Icon name={m.icon} size={20} stroke={2} />
                  </div>
                  {/* name + arrow */}
                  <div style={{ position: 'absolute', left: 16, right: 14, bottom: 14, zIndex: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, pointerEvents: 'none' }}>
                    <span style={{ color: '#fff', fontSize: 16.5, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.15, textShadow: '0 1px 8px rgba(0,0,0,.5)' }}>{name}</span>
                    <span className="ind-arrow" style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'grid', placeItems: 'center', flex: 'none', transition: 'transform .2s' }}>
                      <Icon name="arrow" size={15} stroke={2.4} style={{ color: '#0F172A' }} />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" delay={120} className="muted" style={{ textAlign: 'center', marginTop: 28, fontSize: 15, fontWeight: 600 }}>
          {ind.cta}
        </Reveal>
      </div>
    </section>
  );
}

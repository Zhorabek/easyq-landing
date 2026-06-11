import { useLang } from '../i18n';
import { Button, Icon, Photo, Reveal } from '../ui';
import { SIGNUP_URL } from '../data';
import { Bubble } from './Bubble';

function HeroComposition() {
  const { t } = useLang();
  const c = t.tgChat;
  const owner = t.heroOwner;
  const crm = t.crmMini;
  const rows = [
    { n: crm.a1n, s: crm.a1s, time: '15:00', col: '#B4D94E' },
    { n: crm.a2n, s: crm.a2s, time: '16:30', col: '#7BB7E8' },
    { n: crm.a3n, s: crm.a3s, time: '17:15', col: '#E8B57B' },
  ];
  return (
    <div className="hero-comp-wrap" style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto' }}>
      {/* main owner photo */}
      <Photo label="business owner · barbershop, Tashkent" tone="warm2" ratio="4 / 5" round="24px" style={{ boxShadow: 'var(--shadow-lg)', border: '6px solid #fff' }}>
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 16,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            background: 'rgba(255,255,255,.9)',
            backdropFilter: 'blur(6px)',
            padding: '7px 12px 7px 8px',
            borderRadius: 999,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#CBA988,#9c7a58)', flex: 'none' }} />
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#0F172A' }}>{owner.name}</div>
            <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 600 }}>{owner.role}</div>
          </div>
        </div>
      </Photo>

      {/* telegram booking popup */}
      <div style={{ position: 'absolute', right: -28, top: 26, width: 214, zIndex: 6 }} className="float-card">
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', border: '1px solid rgba(15,23,42,.08)' }}>
          <div style={{ background: '#2AABEE', padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 9, color: '#fff' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <Icon name="scissors" size={16} stroke={2} />
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800 }}>{c.title}</div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>{c.sub}</div>
            </div>
          </div>
          <div style={{ padding: '11px 11px 13px', background: '#EAF3F8', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <Bubble side="in">{c.b1}</Bubble>
            <Bubble side="out" chip>
              {c.svc}
            </Bubble>
            <Bubble side="in">{c.b2}</Bubble>
            <div style={{ display: 'flex', gap: 6 }}>
              <Bubble side="out" chip small>
                {c.slot1}
              </Bubble>
              <Bubble side="out" chip small active>
                {c.slot2}
              </Bubble>
            </div>
            <Bubble side="in" ok>
              {c.b3}
            </Bubble>
          </div>
        </div>
      </div>

      {/* crm mini card */}
      <div style={{ position: 'absolute', left: -26, bottom: -38, width: 234, zIndex: 7 }} className="float-card-2">
        <div className="card" style={{ padding: 14, borderRadius: 16, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="calendar" size={15} stroke={2} style={{ color: 'var(--accent-deep)' }} />
              {crm.title}
            </div>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--accent-deep)', background: 'var(--accent-tint)', padding: '3px 7px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-deep)' }} />
              {crm.live}
            </span>
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 3, height: 26, borderRadius: 3, background: row.col, flex: 'none' }} />
              <div style={{ flex: 1, lineHeight: 1.2 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700 }}>{row.n}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{row.s}</div>
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-2)', fontVariantNumeric: 'tabular-nums' }}>{row.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 90 }}>
      {/* soft ambient wash */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-tint), transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="container hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 56, alignItems: 'center' }}>
        {/* LEFT */}
        <div style={{ minWidth: 0 }}>
          <Reveal as="div" className="pill" style={{ marginBottom: 22, background: 'var(--accent-tint)', borderColor: 'transparent', color: 'var(--accent-deep)' }}>
            <Icon name="send" size={14} stroke={2.2} style={{ color: 'var(--accent-deep)' }} />
            {t.hero.badge}
          </Reveal>
          <Reveal as="h1" className="display balance" delay={60} style={{ margin: 0 }}>
            {t.hero.title1}
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(var(--accent),var(--accent))',
                backgroundSize: '100% .16em',
                backgroundPosition: '0 92%',
                backgroundRepeat: 'no-repeat',
                WebkitBoxDecorationBreak: 'clone',
                boxDecorationBreak: 'clone',
                paddingBottom: '.04em',
              }}
            >
              {t.hero.title2}
            </span>
          </Reveal>
          <Reveal as="p" className="lead pretty" delay={130} style={{ marginTop: 24, maxWidth: 480 }}>
            {t.hero.sub}
          </Reveal>
          <Reveal as="div" delay={200} style={{ display: 'flex', gap: 12, marginTop: 54, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Button variant="primary" size="lg" icon="arrow" href={SIGNUP_URL}>
                {t.hero.ctaPrimary}
              </Button>
              <span
                className="hero-scribble handwritten"
                style={{ color: 'var(--accent-deep)', fontSize: 25, transform: 'rotate(-5deg)', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 0.9 }}
              >
                {t.hero.scribble}
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" style={{ marginTop: 1, marginLeft: 14 }}>
                  <path d="M8 2 C 12 12, 16 16, 20 22" stroke="var(--accent-deep)" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M20 22 L 13 21 M20 22 L 19 15" stroke="var(--accent-deep)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <Button variant="ghost" size="lg" href="#how">
              {t.hero.ctaSecondary}
            </Button>
          </Reveal>
          <Reveal as="div" delay={260} className="muted" style={{ marginTop: 22, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="check" size={16} stroke={2.4} style={{ color: 'var(--accent-deep)' }} />
            {t.hero.note}
          </Reveal>
        </div>

        {/* RIGHT — composition */}
        <Reveal as="div" delay={180} style={{ position: 'relative', minHeight: 480 }}>
          <HeroComposition />
        </Reveal>
      </div>
    </section>
  );
}

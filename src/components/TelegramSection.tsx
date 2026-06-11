import { useLang } from '../i18n';
import { Icon, PhoneFrame, Reveal } from '../ui';
import { Bubble } from './Bubble';

export function TelegramSection() {
  const { t } = useLang();
  const g = t.tg;
  const c = t.tgChat;
  const feats: Array<[string, string, string]> = [
    ['send', g.f1t, g.f1d],
    ['phone', g.f2t, g.f2d],
    ['calendar', g.f3t, g.f3d],
    ['bell', g.f4t, g.f4d],
  ];
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="container tg-grid" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
        <Reveal>
          <div className="eyebrow eyebrow--accent" style={{ marginBottom: 16, display: 'flex' }}>
            <Icon name="send" size={14} stroke={2.2} />
            {g.eyebrow}
          </div>
          <h2 className="h2 balance" style={{ margin: 0 }}>
            {g.title}
          </h2>
          <p className="lead pretty" style={{ marginTop: 18 }}>
            {g.sub}
          </p>
          <div style={{ display: 'grid', gap: 4, marginTop: 30 }}>
            {feats.map(([ic, ti, de], i) => (
              <div key={i} style={{ display: 'flex', gap: 15, padding: '15px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--card)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', flex: 'none', color: 'var(--accent-deep)' }}>
                  <Icon name={ic} size={21} stroke={2} />
                </div>
                <div>
                  <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: '-.01em' }}>{ti}</div>
                  <div className="pretty" style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 3, lineHeight: 1.5 }}>
                    {de}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} style={{ display: 'flex', justifyContent: 'center', gap: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '8% 12%', background: 'radial-gradient(circle,var(--accent-tint),transparent 70%)', zIndex: 0 }} />
          <PhoneFrame style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ background: '#2AABEE', padding: '50px 16px 13px', display: 'flex', alignItems: 'center', gap: 11, color: '#fff' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.25)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name="scissors" size={19} stroke={2} />
              </div>
              <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, whiteSpace: 'nowrap' }}>{c.title}</div>
                <div style={{ fontSize: 11.5, opacity: 0.85, whiteSpace: 'nowrap' }}>{c.sub}</div>
              </div>
            </div>
            <div style={{ background: '#EAF3F8', padding: '16px 13px 20px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 360 }}>
              <Bubble side="in">{c.b1}</Bubble>
              <Bubble side="out" chip>
                {c.svc}
              </Bubble>
              <Bubble side="in">{c.b2}</Bubble>
              <div style={{ display: 'flex', gap: 7, alignSelf: 'flex-end' }}>
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
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 9, background: '#fff', borderRadius: 999, padding: '9px 14px', color: 'var(--ink-3)', fontSize: 12.5 }}>
                {c.input}
                <span style={{ marginLeft: 'auto', color: '#2AABEE' }}>
                  <Icon name="send" size={17} stroke={2} />
                </span>
              </div>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}

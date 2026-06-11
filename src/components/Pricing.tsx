import { type CSSProperties, useState } from 'react';
import { useLang } from '../i18n';
import { Button, Reveal, SectionHead } from '../ui';
import { SIGNUP_URL } from '../data';

function pillBtn(on: boolean): CSSProperties {
  return {
    fontSize: 14.5,
    fontWeight: 700,
    padding: '9px 18px',
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    color: on ? 'var(--accent-ink)' : 'var(--ink-2)',
    background: on ? 'var(--accent)' : 'transparent',
    transition: 'all .18s ease',
  };
}

export function Pricing() {
  const { t } = useLang();
  const p = t.pricing;
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHead eyebrow={p.eyebrow} title={p.title} sub={p.sub} center max={640} />
        {/* toggle */}
        <Reveal style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: 5 }}>
            <button onClick={() => setYearly(false)} style={pillBtn(!yearly)}>
              {p.monthly}
            </button>
            <button onClick={() => setYearly(true)} style={pillBtn(yearly)}>
              {p.yearly}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: yearly ? 'var(--accent-ink)' : 'var(--accent-deep)',
                  background: yearly ? 'rgba(255,255,255,.35)' : 'var(--accent-tint)',
                  padding: '2px 7px',
                  borderRadius: 999,
                  marginLeft: 7,
                }}
              >
                {p.save}
              </span>
            </button>
          </div>
        </Reveal>
        {/* tiers */}
        <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 44, alignItems: 'stretch' }}>
          {p.tiers.map((tier, i) => {
            const popular = i === 1;
            return (
              <Reveal
                key={i}
                delay={i * 70}
                style={{
                  position: 'relative',
                  borderRadius: 22,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: popular ? 'var(--block)' : 'var(--card)',
                  color: popular ? '#fff' : 'var(--ink)',
                  border: popular ? 'none' : '1px solid var(--line)',
                  boxShadow: popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transform: popular ? 'translateY(-8px)' : 'none',
                }}
              >
                {popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent)',
                      color: 'var(--accent-ink)',
                      fontSize: 11.5,
                      fontWeight: 800,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      padding: '5px 13px',
                      borderRadius: 999,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.popular}
                  </span>
                )}
                <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: '.03em', textTransform: 'uppercase', color: popular ? 'var(--accent)' : 'var(--ink-3)' }}>
                  {p.staffLabel.replace('{n}', tier.staff)}
                </div>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 33, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1 }}>{yearly ? tier.y : tier.m}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.7 }}>UZS</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: popular ? 'var(--on-dark-2)' : 'var(--ink-3)', marginTop: 4 }}>
                  {p.perMonth}
                  {yearly ? ' · ' + p.yearly : ''}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    color: popular ? 'var(--accent)' : 'var(--accent-deep)',
                    background: popular ? 'rgba(180,217,78,.12)' : 'var(--accent-tint)',
                    padding: '5px 10px',
                    borderRadius: 8,
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                  }}
                >
                  {tier.tag}
                </div>
                <p className="pretty" style={{ fontSize: 13.5, color: popular ? 'var(--on-dark-2)' : 'var(--ink-2)', margin: '16px 0 20px', lineHeight: 1.5, flex: 1 }}>
                  {tier.note}
                </p>
                <Button variant={popular ? 'primary' : 'ghost'} href={SIGNUP_URL} style={popular ? {} : { width: '100%' }}>
                  {p.cta}
                </Button>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" delay={120} className="muted pretty" style={{ textAlign: 'center', maxWidth: 760, margin: '30px auto 0', fontSize: 13.5, lineHeight: 1.6 }}>
          {p.footnote}
        </Reveal>
      </div>
    </section>
  );
}

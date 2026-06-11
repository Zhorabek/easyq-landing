import { useLang } from '../i18n';
import { Button, Reveal } from '../ui';
import { SIGNUP_URL } from '../data';

export function FinalCTA() {
  const { t } = useLang();
  const f = t.finalCta;
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ position: 'relative', overflow: 'hidden', borderRadius: 30, background: 'var(--block)', color: '#fff', padding: '72px 40px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 360, background: 'radial-gradient(circle,rgba(180,217,78,.22),transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 className="h2 balance" style={{ margin: '0 auto', color: '#fff', maxWidth: 660 }}>
              {f.title}
            </h2>
            <p className="lead pretty" style={{ margin: '18px auto 0', color: 'var(--on-dark-2)', maxWidth: 520 }}>
              {f.sub}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" icon="arrow" href={SIGNUP_URL}>
                {f.ctaPrimary}
              </Button>
              <Button variant="ondark" size="lg" href="#how">
                {f.ctaSecondary}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

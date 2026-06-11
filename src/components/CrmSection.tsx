import { useState } from 'react';
import { type Translation, useLang } from '../i18n';
import { Icon, Reveal } from '../ui';

type Block = { r: number; c: number; span: number; col: string; name: string; svc: string };

function ScheduleView({ cols, blocks }: { cols: string[]; blocks: Block[] }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '54px repeat(5,1fr)', gap: 6, marginBottom: 8 }}>
        <div />
        {cols.map((c) => (
          <div key={c} style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textAlign: 'center' }}>
            {c}
          </div>
        ))}
      </div>
      {['A', 'B', 'C'].map((_row, r) => (
        <div key={r} style={{ display: 'grid', gridTemplateColumns: '54px repeat(5,1fr)', gap: 6, marginBottom: 6, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: ['#CBA988', '#C9A6E8', '#7BB7E8'][r], flex: 'none' }} />
          </div>
          {[0, 1, 2, 3, 4].map((c) => {
            const b = blocks.find((x) => x.r === r && x.c === c);
            const covered = blocks.find((x) => x.r === r && x.c === c - 1 && x.span > 1);
            if (covered) return null;
            if (b)
              return (
                <div key={c} style={{ gridColumn: `span ${b.span}`, background: b.col + '22', borderLeft: `3px solid ${b.col}`, borderRadius: 7, padding: '6px 8px', minHeight: 42 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, lineHeight: 1.1 }}>{b.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{b.svc}</div>
                </div>
              );
            return <div key={c} style={{ background: 'var(--surface)', borderRadius: 7, minHeight: 42 }} />;
          })}
        </div>
      ))}
    </div>
  );
}

function StaffView() {
  const rows: Array<[string, string, string, string]> = [
    ['Sardor Karimov', 'Barber', '92%', '#CBA988'],
    ['Madina Yusupova', 'Stylist', '88%', '#C9A6E8'],
    ['Bekzod Tursunov', 'Barber', '81%', '#7BB7E8'],
    ['Aziz Komilov', 'Barber', '76%', '#E8B57B'],
  ];
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', background: 'var(--surface)', borderRadius: 11 }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: r[3], flex: 'none' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800 }}>{r[0]}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{r[1]}</div>
          </div>
          <div style={{ width: 90 }}>
            <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: r[2], height: '100%', background: 'var(--accent-deep)' }} />
            </div>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, width: 38, textAlign: 'right' }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

function ServicesView() {
  const rows: Array<[string, string, string]> = [
    ['Haircut', '45 min', '80 000'],
    ['Beard trim', '20 min', '40 000'],
    ['Haircut + beard', '60 min', '110 000'],
    ['Kids cut', '30 min', '55 000'],
  ];
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--surface)', borderRadius: 11 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-deep)', flex: 'none' }} />
          <div style={{ flex: 1, fontSize: 13.5, fontWeight: 800 }}>{r[0]}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="clock" size={13} stroke={2} />
            {r[1]}
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, width: 92, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {r[2]} <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>UZS</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsView() {
  const bars = [52, 68, 60, 84, 72, 95, 80];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const kpis: Array<[string, string, string]> = [
    ['Revenue', '12.4M', '+18%'],
    ['Bookings', '342', '+24%'],
    ['No-shows', '4%', '−70%'],
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ flex: 1, background: 'var(--surface)', borderRadius: 11, padding: '12px 13px' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>{k[0]}</div>
            <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em', marginTop: 2 }}>{k[1]}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-deep)' }}>{k[2]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130, padding: '0 4px' }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: Math.round(b * 1.05) + 'px', background: i === 5 ? 'var(--accent-deep)' : 'var(--accent)', borderRadius: 6, opacity: i === 5 ? 1 : 0.55 }} />
            <span style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700 }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMock({ crm, tab, setTab }: { crm: Translation['crm']; tab: number; setTab: (i: number) => void }) {
  const cols = ['09:00', '10:00', '11:00', '12:00', '13:00'];
  const blocks: Block[] = [
    { r: 0, c: 0, span: 2, col: '#B4D94E', name: 'Jasur A.', svc: 'Haircut' },
    { r: 1, c: 1, span: 1, col: '#7BB7E8', name: 'Dilnoza R.', svc: 'Color' },
    { r: 2, c: 0, span: 2, col: '#E8B57B', name: 'Otabek M.', svc: 'Beard' },
    { r: 0, c: 3, span: 2, col: '#C9A6E8', name: 'Aziz K.', svc: 'Shave' },
    { r: 1, c: 3, span: 1, col: '#B4D94E', name: 'Nodira S.', svc: 'Style' },
  ];
  return (
    <div style={{ background: 'var(--card)', borderRadius: 16, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', color: 'var(--ink)' }}>
      {/* window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </span>
        <div style={{ marginLeft: 10, display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 600 }}>
          <Icon name="shield" size={13} stroke={2} /> app.easyq.uz
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: 'var(--accent-deep)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-deep)' }} />
          18 <Icon name="calendar" size={13} stroke={2} style={{ opacity: 0.8 }} />
        </span>
      </div>
      {/* tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 14px 0', borderBottom: '1px solid var(--line)' }}>
        {crm.tabs.map((tb, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 13px',
              borderRadius: '8px 8px 0 0',
              color: tab === i ? 'var(--ink)' : 'var(--ink-3)',
              borderBottom: tab === i ? '2px solid var(--accent-deep)' : '2px solid transparent',
              background: tab === i ? 'var(--surface)' : 'transparent',
            }}
          >
            {tb}
          </button>
        ))}
      </div>
      {/* body */}
      <div style={{ padding: 16, minHeight: 290 }}>
        {tab === 0 && <ScheduleView cols={cols} blocks={blocks} />}
        {tab === 1 && <StaffView />}
        {tab === 2 && <ServicesView />}
        {tab === 3 && <AnalyticsView />}
      </div>
    </div>
  );
}

export function CrmSection() {
  const { t } = useLang();
  const crm = t.crm;
  const icons = ['calendar', 'users', 'scissors', 'chart'];
  const [tab, setTab] = useState(0);
  return (
    <section id="crm" className="section" style={{ background: 'var(--dark)', color: 'var(--on-dark)' }}>
      <div className="container crm-grid" style={{ display: 'grid', gridTemplateColumns: '.82fr 1.18fr', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 16, display: 'flex' }}>
            {crm.eyebrow}
          </div>
          <h2 className="h2 balance" style={{ margin: 0, color: '#fff' }}>
            {crm.title}
          </h2>
          <p className="lead pretty" style={{ marginTop: 18, color: 'var(--on-dark-2)' }}>
            {crm.sub}
          </p>
          <div style={{ display: 'grid', gap: 14, marginTop: 30 }}>
            {crm.benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 13, cursor: 'pointer' }} onClick={() => setTab(i)}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    flex: 'none',
                    display: 'grid',
                    placeItems: 'center',
                    background: tab === i ? 'var(--accent)' : 'rgba(255,255,255,.07)',
                    color: tab === i ? 'var(--accent-ink)' : 'var(--accent)',
                    transition: 'all .2s',
                  }}
                >
                  <Icon name={icons[i]} size={20} stroke={2} />
                </div>
                <div>
                  <div style={{ fontSize: 16.5, fontWeight: 800, color: '#fff' }}>{b.t}</div>
                  <div className="pretty" style={{ fontSize: 14, color: 'var(--on-dark-2)', marginTop: 2, lineHeight: 1.5 }}>
                    {b.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <DashboardMock crm={crm} tab={tab} setTab={setTab} />
        </Reveal>
      </div>
    </section>
  );
}

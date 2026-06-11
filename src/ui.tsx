import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

/* ---------------- Icons (simple line set) ---------------- */
export const ICONS: Record<string, string> = {
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevron: 'M6 9l6 6 6-6',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11',
  chart: 'M3 3v18h18M7 15l3-4 3 2 5-7',
  trend: 'M3 17l6-6 4 4 8-8M21 7v6M21 7h-6',
  spark: 'M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4L12 3Z',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 4 8.1 15.9M14.5 12.5 20 20M8.1 8.1 12 12',
  wallet: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM16 12h.01M21 9h-5a3 3 0 0 0 0 6h5',
  layers: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
  star: 'M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 21.3l1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z',
  pin: 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  droplet: 'M12 2.7s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z',
  tooth: 'M12 5.5C10.5 4 8.5 3.3 7 4 5 5 4.5 7.5 5 10c.4 2 .7 3.5 1 5.5.3 2 .6 3.5 1.5 3.5s1-2 1.3-3.7c.2-1.3.6-2.3 1.2-2.3s1 1 1.2 2.3c.3 1.7.4 3.7 1.3 3.7s1.2-1.5 1.5-3.5c.3-2 .6-3.5 1-5.5.5-2.5 0-5-2-6-1.5-.7-3.5 0-5 1.5Z',
  heartpulse: 'M20.8 5.6a5.5 5.5 0 0 0-8.8-1.4l-1 1-1-1A5.5 5.5 0 0 0 3.2 11l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0-.8-5.4M3.5 12.5h4l1.5-3 2.5 6 2-4 1.2 1h5',
  dumbbell: 'M6.5 6.5 17.5 17.5M3 8l2-2 3 3-2 2zM16 21l2-2-3-3-2 2zM2.5 11.5 5 14M19 10l2.5 2.5M9 4.5 11.5 7M12.5 17 15 19.5',
  paw: 'M8 13a3 3 0 0 0-3 3c0 2 2 3 4 3s4-1 4-3a3 3 0 0 0-3-3ZM6 9a1.5 2 0 1 0 0-.01M12.5 7a1.5 2 0 1 0 0-.01M17.5 10a1.5 2 0 1 0 0-.01',
  cross: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z',
};

type IconProps = {
  name: string;
  size?: number;
  stroke?: number;
  fill?: boolean;
  style?: CSSProperties;
  className?: string;
};

export function Icon({ name, size = 22, stroke = 1.9, fill = false, style, className }: IconProps) {
  const d = ICONS[name] || '';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {d
        .split('M')
        .filter(Boolean)
        .map((seg, i) => (
          <path key={i} d={'M' + seg} />
        ))}
    </svg>
  );
}

/* ---------------- Logo ---------------- */
export function Logo({ dark = false, size = 26 }: { dark?: boolean; size?: number }) {
  const ink = dark ? '#fff' : 'var(--ink)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: size + 8,
          height: size + 8,
          borderRadius: 9,
          background: 'var(--accent)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 4px 12px -4px var(--accent-ring)',
          flex: 'none',
        }}
      >
        <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="var(--accent-ink)" strokeWidth="2.4" />
          <path d="M15.5 15.5 L20 20" stroke="var(--accent-ink)" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span style={{ fontWeight: 800, fontSize: size * 0.82, letterSpacing: '-.03em', color: ink }}>
        easy<span style={{ color: 'var(--accent-deep)' }}>Q</span>
      </span>
    </span>
  );
}

/* ---------------- Button ---------------- */
type ButtonProps = {
  variant?: 'primary' | 'dark' | 'ghost' | 'ondark';
  size?: 'lg' | 'sm';
  children: ReactNode;
  icon?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
  target?: string;
  rel?: string;
};

export function Button({ variant = 'primary', size, children, icon, href = '#', onClick, style, target, rel }: ButtonProps) {
  const cls = `btn btn--${variant}${size ? ' btn--' + size : ''}`;
  return (
    <a className={cls} href={href} onClick={onClick} style={style} target={target} rel={rel || (target === '_blank' ? 'noopener' : undefined)}>
      {children}
      {icon && <Icon name={icon} size={size === 'lg' ? 19 : 17} stroke={2.2} />}
    </a>
  );
}

/* ---------------- Photo placeholder (duotone, labelled) ---------------- */
const PHOTO_TONES: Record<string, [string, string]> = {
  warm: ['#EADfce', '#D9C3A3'],
  warm2: ['#E9D9c6', '#CBA988'],
  cool: ['#DCE6EC', '#B9CBD6'],
  rose: ['#ECDAD6', '#D2A99e'],
  sand: ['#E8E0D0', '#CDBE9e'],
  slate: ['#DBE2EA', '#AFC0CF'],
};

let photoSeq = 0;

export function Photo({
  label,
  tone = 'warm',
  ratio = '4 / 3',
  round = 'var(--radius)',
  style,
  children,
}: {
  label?: string;
  tone?: keyof typeof PHOTO_TONES;
  ratio?: string;
  round?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const [c1, c2] = PHOTO_TONES[tone] || PHOTO_TONES.warm;
  const id = useRef('ph' + (photoSeq++).toString(36)).current;
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: ratio,
        borderRadius: round,
        overflow: 'hidden',
        background: `linear-gradient(135deg,${c1},${c2})`,
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={c2} strokeWidth="7" opacity=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {label && (
        <span
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            zIndex: 2,
            fontFamily: 'var(--mono)',
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(40,30,20,.62)',
            background: 'rgba(255,255,255,.55)',
            backdropFilter: 'blur(4px)',
            padding: '4px 9px',
            borderRadius: 7,
            letterSpacing: '-.01em',
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ---------------- Stars ---------------- */
export function Stars({ value = 5, size = 15 }: { value?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--accent-deep)' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} fill={i < Math.round(value)} stroke={1.6} style={{ opacity: i < Math.round(value) ? 1 : 0.3 }} />
      ))}
    </span>
  );
}

/* ---------------- Phone frame ---------------- */
export function PhoneFrame({ children, style, accent = false }: { children: ReactNode; style?: CSSProperties; accent?: boolean }) {
  return (
    <div
      style={{
        width: 300,
        borderRadius: 40,
        padding: 11,
        background: accent ? 'var(--ink)' : '#0c1322',
        boxShadow: 'var(--shadow-lg), inset 0 0 0 2px rgba(255,255,255,.06)',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 19,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 76,
          height: 22,
          background: '#0c1322',
          borderRadius: 999,
          zIndex: 5,
        }}
      />
      <div style={{ borderRadius: 30, overflow: 'hidden', background: '#fff', position: 'relative' }}>{children}</div>
    </div>
  );
}

/* ---------------- Scroll reveal (shared watcher) ---------------- */
type RevealItem = { el: HTMLElement; reveal: () => void };
const revealItems = new Set<RevealItem>();
let revealInit = false;

function ensureRevealWatcher() {
  if (revealInit) return;
  revealInit = true;
  const run = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealItems.forEach((item) => {
      const el = item.el;
      if (!el || !el.isConnected) {
        revealItems.delete(item);
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) {
        item.reveal();
        revealItems.delete(item);
      }
    });
  };
  window.addEventListener('scroll', run, { passive: true });
  window.addEventListener('resize', run, { passive: true });
  // safety net: poll briefly to catch anchor jumps, late layout & font loads
  let n = 0;
  const iv = setInterval(() => {
    run();
    if (++n > 25) clearInterval(iv);
  }, 180);
  window.addEventListener('load', run);
}

export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureRevealWatcher();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.96 && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const item: RevealItem = { el, reveal: () => setSeen(true) };
    revealItems.add(item);
    return () => {
      revealItems.delete(item);
    };
  }, []);
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={`fade-up ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  dark = false,
  max = 720,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  dark?: boolean;
  max?: number;
}) {
  return (
    <div style={{ maxWidth: max, margin: center ? '0 auto' : 0, textAlign: center ? 'center' : 'left' }}>
      {eyebrow && (
        <Reveal as="div" className="eyebrow eyebrow--accent" style={{ marginBottom: 16, justifyContent: center ? 'center' : 'flex-start', display: 'flex' }}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" className="h2 balance" delay={60} style={{ margin: 0, color: dark ? '#fff' : 'var(--ink)' }}>
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" className="lead pretty" delay={120} style={{ marginTop: 18, marginBottom: 0, color: dark ? 'var(--on-dark-2)' : 'var(--ink-2)' }}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}

import { type ReactNode } from 'react';

type BubbleProps = {
  side: 'in' | 'out';
  children: ReactNode;
  chip?: boolean;
  small?: boolean;
  active?: boolean;
  ok?: boolean;
};

export function Bubble({ side, children, chip, small, active, ok }: BubbleProps) {
  const out = side === 'out';
  if (chip) {
    return (
      <div style={{ alignSelf: 'flex-end' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: small ? 10 : 11,
            fontWeight: 700,
            padding: small ? '6px 9px' : '7px 11px',
            borderRadius: 12,
            background: active ? 'var(--accent)' : '#fff',
            color: active ? 'var(--accent-ink)' : '#2AABEE',
            border: active ? 'none' : '1.5px solid #cfe6f3',
          }}
        >
          {children}
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        alignSelf: out ? 'flex-end' : 'flex-start',
        maxWidth: '86%',
        background: ok ? '#DDF1D6' : out ? '#D6EAF8' : '#fff',
        color: '#0f2433',
        fontSize: 11,
        lineHeight: 1.35,
        fontWeight: 500,
        padding: '8px 11px',
        borderRadius: 13,
        borderBottomRightRadius: out ? 4 : 13,
        borderBottomLeftRadius: out ? 13 : 4,
        boxShadow: '0 1px 2px rgba(15,40,60,.08)',
      }}
    >
      {children}
    </div>
  );
}

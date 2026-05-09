type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <a className="logo" href="/" aria-label="easyQ home">
      <span className={compact ? 'logo-mark logo-mark--small' : 'logo-mark'}>Q</span>
      <span className={compact ? 'logo-word logo-word--small' : 'logo-word'}>
        easy<span>Q</span>
      </span>
    </a>
  );
}

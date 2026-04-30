import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n';

type StatCounterProps = {
  to: number;
  suffix: string;
  label: string;
};

function StatCounter({ to, suffix, label }: StatCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        let current = 0;
        const step = to / 60;
        const timer = window.setInterval(() => {
          current = Math.min(current + step, to);
          setValue(Math.round(current));
          if (current >= to) window.clearInterval(timer);
        }, 20);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [to]);

  return (
    <div className="stat-counter" ref={ref}>
      <strong>
        {value.toLocaleString()}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {t.stats.map((stat) => (
          <StatCounter key={stat.label} to={stat.to} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

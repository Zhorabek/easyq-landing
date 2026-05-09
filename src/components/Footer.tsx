import { CRM_URL } from '../data';
import { useLanguage } from '../i18n';
import { Logo } from './Logo';

function linkHref(columnIndex: number, linkIndex: number) {
  if (columnIndex === 0 && linkIndex === 0) return '/#features';
  if (columnIndex === 0 && linkIndex === 1) return CRM_URL;
  if (columnIndex === 0 && linkIndex === 2) return '/#features';
  if (columnIndex === 0 && linkIndex === 3) return '/#pricing';
  if (columnIndex === 0 && linkIndex === 4) return CRM_URL;
  if (columnIndex === 1) return '/#industries';
  if (columnIndex === 2 && linkIndex === 0) return '/about';
  if (columnIndex === 2 && linkIndex === 2) return '/#contact';
  return '#';
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Logo compact />
            <p>{t.footer.description}</p>
          </div>

          {t.footer.columns.map((column, columnIndex) => (
            <nav key={column.title} aria-label={`${column.title} footer links`}>
              <h3>{column.title}</h3>
              {column.links.map((link, linkIndex) => {
                const href = linkHref(columnIndex, linkIndex);
                const external = href.startsWith('http');
                return (
                  <a key={link} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                    {link}
                  </a>
                );
              })}
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}

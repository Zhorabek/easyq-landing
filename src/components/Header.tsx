import { useEffect, useState } from 'react';
import { BUSINESS_BOT_URL, CRM_URL } from '../data';
import { useLanguage } from '../i18n';
import { IconArrow, IconClose, IconMenu } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled ? 'site-header site-header--scrolled' : 'site-header'}>
      <div className="site-header__inner">
        <Logo />

        <nav className="desktop-nav" aria-label={t.header.primaryNavLabel}>
          {t.nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <a className="login-link" href={CRM_URL} target="_blank" rel="noreferrer">
            {t.header.login}
          </a>
          <a className="button button--small button--accent" href={BUSINESS_BOT_URL} target="_blank" rel="noreferrer">
            {t.header.tryFree} <IconArrow size={14} />
          </a>
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div className={menuOpen ? 'mobile-nav mobile-nav--open' : 'mobile-nav'}>
        <LanguageSwitcher />
        {t.nav.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a href={CRM_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
          {t.header.login}
        </a>
        <a className="button button--accent" href={BUSINESS_BOT_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
          {t.header.tryFree} <IconArrow size={14} />
        </a>
      </div>
    </header>
  );
}

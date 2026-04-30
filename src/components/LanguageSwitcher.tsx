import { languageOptions, useLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" aria-label={t.header.languageLabel}>
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          className={option.code === language ? 'is-active' : ''}
          aria-pressed={option.code === language}
          title={option.name}
          onClick={() => setLanguage(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

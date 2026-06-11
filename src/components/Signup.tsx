import { type CSSProperties, type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { type Language, LANGS, useLang } from '../i18n';
import { Button, Icon, Logo } from '../ui';
import { BUSINESS_BOT_URL, CRM_URL } from '../data';

type Step = 'method' | 'telegram' | 'phone' | 'business' | 'done';
type SignupResult = { username: string; password: string; businessName: string };

// industries.list order → business type slug (matches the bot/CRM type values)
const TYPE_MAP = ['barbershop', 'beauty_salon', 'carwash', 'dentistry', 'medical_services', 'fitness', 'massage', 'veterinary'];

const SU: Record<Language, any> = {
  uz: {
    signin: 'Hisobingiz bormi?', signinLink: 'Kirish',
    back: 'Orqaga', continue: 'Davom etish', step: 'Bosqich',
    brandTitle: 'Navbat tizimingizni 30 daqiqada ishga tushiring',
    brandBullets: ['Birinchi oy mutlaqo bepul', 'Telefon raqami orqali ham ro‘yxatdan o‘ting', 'Telegram orqali bir necha daqiqada'],
    brandQuote: '“EasyQ’ni Telegram orqali 20 daqiqada ishga tushirdik. Endi mijozlar o‘zi yoziladi.”',
    brandAuthor: 'Sardor Karimov', brandRole: 'Barber House egasi, Toshkent',
    method: { title: 'Bepul hisob yarating', sub: 'Biznesingizni Telegram orqali bir necha daqiqada ro‘yxatdan o‘tkazing.', tg: 'Telegram orqali davom etish', tgNote: 'Tavsiya etiladi · Eng tez usul', or: 'yoki', phone: 'Telefon raqami orqali ro‘yxatdan o‘tish', terms: 'Davom etish orqali siz Shartlar va Maxfiylik siyosatiga rozilik bildirasiz.' },
    tg: { title: 'Telegram bot orqali ulaning', sub: 'Botni oching, “Boshlash”ni bosing — hisobingiz avtomatik yaratiladi.', open: 'EasyQ botini ochish', bot: '@easyqueue_business_bot', scan: 'Yoki telefoningiz bilan QR-kodni skanerlang', s1: 'Botda “Boshlash” tugmasini bosing', s2: 'Biznes nomingizni yuboring', s3: 'Tayyor — bu yerga qayting', done: 'Botni ochdim — davom etish' },
    phone: { title: 'Telefon orqali ro‘yxatdan o‘tish', sub: 'Tasdiqlash uchun raqamingizni kiriting.', label: 'Telefon raqami', send: 'Kod yuborish', codeTitle: 'Tasdiqlash kodi', codeSub: 'raqamingizga kod yubordik', verify: 'Tasdiqlash va davom etish', resend: 'Kodni qayta yuborish' },
    biz: { title: 'Biznesingiz haqida', sub: 'Bu ma’lumotlar navbat sahifangizda ko‘rinadi.', name: 'Biznes nomi', namePh: 'Masalan, Barber House', industry: 'Soha', city: 'Shahar', team: 'Jamoa hajmi', teamOpts: ['1–2', '3–5', '6–10', '10+'], finish: 'Hisobni yaratish' },
    done: { title: 'Tayyor! Hisobingiz yaratildi', sub: 'Navbat sahifangiz allaqachon ishlayapti — havolani mijozlaringiz bilan ulashing.', link: 'Sizning navbat havolangiz', openCrm: 'CRM’ni ochish', openTg: 'Telegram botni ochish', hint: 'Keyingi qadam: xizmat va ustalaringizni qo‘shing.' },
    cities: ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Namangan', 'Farg‘ona', 'Qarshi', 'Nukus'],
  },
  ru: {
    signin: 'Уже есть аккаунт?', signinLink: 'Войти',
    back: 'Назад', continue: 'Продолжить', step: 'Шаг',
    brandTitle: 'Запустите систему записи за 30 минут',
    brandBullets: ['Первый месяц бесплатно', 'Можно зарегистрироваться и по номеру телефона', 'Через Telegram за пару минут'],
    brandQuote: '«Запустили EasyQ через Telegram за 20 минут. Теперь клиенты записываются сами.»',
    brandAuthor: 'Сардор Каримов', brandRole: 'Владелец Barber House, Ташкент',
    method: { title: 'Создайте бесплатный аккаунт', sub: 'Зарегистрируйте бизнес через Telegram за пару минут.', tg: 'Продолжить через Telegram', tgNote: 'Рекомендуем · Самый быстрый способ', or: 'или', phone: 'Регистрация по номеру телефона', terms: 'Продолжая, вы соглашаетесь с Условиями и Политикой конфиденциальности.' },
    tg: { title: 'Подключитесь через Telegram-бота', sub: 'Откройте бота, нажмите «Старт» — аккаунт создастся автоматически.', open: 'Открыть бот EasyQ', bot: '@easyqueue_business_bot', scan: 'Или отсканируйте QR-код телефоном', s1: 'Нажмите «Старт» в боте', s2: 'Отправьте название бизнеса', s3: 'Готово — вернитесь сюда', done: 'Я открыл бота — продолжить' },
    phone: { title: 'Регистрация по телефону', sub: 'Введите номер для подтверждения.', label: 'Номер телефона', send: 'Отправить код', codeTitle: 'Код подтверждения', codeSub: 'код отправлен на ваш номер', verify: 'Подтвердить и продолжить', resend: 'Отправить код снова' },
    biz: { title: 'О вашем бизнесе', sub: 'Эти данные появятся на странице записи.', name: 'Название бизнеса', namePh: 'Например, Barber House', industry: 'Отрасль', city: 'Город', team: 'Размер команды', teamOpts: ['1–2', '3–5', '6–10', '10+'], finish: 'Создать аккаунт' },
    done: { title: 'Готово! Аккаунт создан', sub: 'Ваша страница записи уже работает — поделитесь ссылкой с клиентами.', link: 'Ваша ссылка для записи', openCrm: 'Открыть CRM', openTg: 'Открыть Telegram-бота', hint: 'Следующий шаг: добавьте услуги и мастеров.' },
    cities: ['Ташкент', 'Самарканд', 'Бухара', 'Андижан', 'Наманган', 'Фергана', 'Карши', 'Нукус'],
  },
  en: {
    signin: 'Already have an account?', signinLink: 'Sign in',
    back: 'Back', continue: 'Continue', step: 'Step',
    brandTitle: 'Launch your booking system in 30 minutes',
    brandBullets: ['First month completely free', 'You can also register with a phone number', 'Through Telegram in minutes'],
    brandQuote: '“We launched EasyQ through Telegram in 20 minutes. Now customers book themselves.”',
    brandAuthor: 'Sardor Karimov', brandRole: 'Owner, Barber House · Tashkent',
    method: { title: 'Create your free account', sub: 'Register your business through Telegram in a couple of minutes.', tg: 'Continue with Telegram', tgNote: 'Recommended · Fastest way', or: 'or', phone: 'Register with a phone number', terms: 'By continuing you agree to the Terms and Privacy Policy.' },
    tg: { title: 'Connect through the Telegram bot', sub: 'Open the bot, press “Start” — your account is created automatically.', open: 'Open the EasyQ bot', bot: '@easyqueue_business_bot', scan: 'Or scan the QR code with your phone', s1: 'Press “Start” in the bot', s2: 'Send your business name', s3: 'Done — come back here', done: 'I’ve opened the bot — continue' },
    phone: { title: 'Register with phone', sub: 'Enter your number to verify.', label: 'Phone number', send: 'Send code', codeTitle: 'Verification code', codeSub: 'code sent to your number', verify: 'Verify & continue', resend: 'Resend code' },
    biz: { title: 'About your business', sub: 'This appears on your booking page.', name: 'Business name', namePh: 'e.g. Barber House', industry: 'Industry', city: 'City', team: 'Team size', teamOpts: ['1–2', '3–5', '6–10', '10+'], finish: 'Create account' },
    done: { title: 'All set! Your account is ready', sub: 'Your booking page is already live — share the link with your customers.', link: 'Your booking link', openCrm: 'Open your CRM', openTg: 'Open the Telegram bot', hint: 'Next step: add your services and specialists.' },
    cities: ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana', 'Qarshi', 'Nukus'],
  },
};

const fieldInput: CSSProperties = { width: '100%', border: '1.5px solid var(--line-2)', background: 'var(--bg)', color: 'var(--ink)', borderRadius: 12, padding: '13px 15px', fontSize: 15, fontWeight: 600, outline: 'none', fontFamily: 'var(--font)', transition: 'border-color .15s' };

function SUField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>{label}</span>
      {children}
    </label>
  );
}
function SUInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ ...fieldInput, ...(props.style || {}) }}
      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-deep)')}
      onBlur={(e) => (e.target.style.borderColor = 'var(--line-2)')}
    />
  );
}
function SUSelect({ value, onChange, children }: { value: number | string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={onChange} style={{ ...fieldInput, appearance: 'none', paddingRight: 38, cursor: 'pointer' }}>{children}</select>
      <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-3)' }}><Icon name="chevron" size={17} /></span>
    </div>
  );
}
function PrimaryBtn({ children, onClick, disabled, href, icon = 'arrow' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; href?: string; icon?: string | null }) {
  const style: CSSProperties = { width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 800, fontSize: 16, padding: '15px 22px', borderRadius: 14, background: disabled ? 'var(--surface-2)' : 'var(--accent)', color: disabled ? 'var(--ink-3)' : 'var(--accent-ink)', boxShadow: disabled ? 'none' : '0 10px 24px -10px var(--accent-ring)', transition: 'all .15s', cursor: disabled ? 'not-allowed' : 'pointer' };
  const inner = (<>{children}{icon && !disabled && <Icon name={icon} size={18} stroke={2.4} />}</>);
  if (href && !disabled) return <a href={href} style={style}>{inner}</a>;
  return <button onClick={disabled ? undefined : onClick} disabled={disabled} style={style}>{inner}</button>;
}

function QR({ size = 116 }: { size?: number }) {
  const cells = 11;
  const rnd = (x: number, y: number) => (x * 7 + y * 13 + x * y * 3) % 5 > 1;
  const s = size / cells;
  const corner = (cx: number, cy: number) => (
    <g>
      <rect x={cx * s} y={cy * s} width={s * 3} height={s * 3} rx={s * 0.6} fill="none" stroke="var(--ink)" strokeWidth={s * 0.55} />
      <rect x={(cx + 1) * s} y={(cy + 1) * s} width={s} height={s} fill="var(--ink)" />
    </g>
  );
  const dots: ReactNode[] = [];
  for (let y = 0; y < cells; y++)
    for (let x = 0; x < cells; x++) {
      if ((x < 4 && y < 4) || (x > 6 && y < 4) || (x < 4 && y > 6)) continue;
      if (rnd(x, y)) dots.push(<rect key={x + '-' + y} x={x * s + s * 0.12} y={y * s + s * 0.12} width={s * 0.76} height={s * 0.76} rx={s * 0.2} fill="var(--ink)" />);
    }
  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 14, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--line)' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{dots}{corner(0, 0)}{corner(cells - 3, 0)}{corner(0, cells - 3)}</svg>
    </div>
  );
}

function TopControls() {
  const { lang, setLang, theme, setTheme } = useLang();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'inline-flex', background: 'var(--surface-2)', borderRadius: 999, padding: 3, gap: 2 }}>
        {LANGS.map((L) => {
          const on = L.code === lang;
          return <button key={L.code} onClick={() => setLang(L.code)} style={{ fontSize: 13, fontWeight: 700, padding: '5px 11px', borderRadius: 999, color: on ? 'var(--accent-ink)' : 'var(--ink-3)', background: on ? 'var(--accent)' : 'transparent' }}>{L.label}</button>;
        })}
      </div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Theme" style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center' }}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} stroke={2} />
      </button>
    </div>
  );
}

function Stepper({ idx }: { idx: number }) {
  const { lang } = useLang();
  const t = SU[lang];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= idx ? 'var(--accent)' : 'var(--surface-2)', transition: 'background .3s' }} />
      ))}
      <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)', whiteSpace: 'nowrap', marginLeft: 6 }}>{t.step} {Math.min(idx + 1, 3)}/3</span>
    </div>
  );
}

function BrandPanel() {
  const { lang } = useLang();
  const t = SU[lang];
  return (
    <aside className="su-brand" style={{ width: 460, flex: 'none', background: 'var(--dark)', color: '#fff', padding: '48px 44px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, right: -100, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,217,78,.22), transparent 65%)' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <a href="/" style={{ display: 'inline-flex' }}><Logo dark size={26} /></a>
        <h1 className="balance" style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, margin: 'auto 0 0', maxWidth: 340 }}>{t.brandTitle}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
          {t.brandBullets.map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15.5, fontWeight: 600, color: 'var(--on-dark)' }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="check" size={15} stroke={3} /></span>
              {b}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 36 }}>
          <div style={{ display: 'flex', gap: 2, color: 'var(--accent)', marginBottom: 12 }}>{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={16} fill />)}</div>
          <p className="pretty" style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.45, color: '#fff', margin: 0 }}>{t.brandQuote}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 16 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#CBA988,#9c7a58)', flex: 'none' }} />
            <div><div style={{ fontSize: 14, fontWeight: 800 }}>{t.brandAuthor}</div><div style={{ fontSize: 12.5, color: 'var(--on-dark-2)' }}>{t.brandRole}</div></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  const { lang } = useLang();
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--ink-3)' }}>
      <Icon name="arrow" size={16} stroke={2.2} style={{ transform: 'rotate(180deg)' }} />{SU[lang].back}
    </button>
  );
}
function SigninLine() {
  const { lang } = useLang();
  const t = SU[lang];
  return <p style={{ fontSize: 14, color: 'var(--ink-3)', textAlign: 'center', marginTop: 22, fontWeight: 600 }}>{t.signin} <a href={CRM_URL} style={{ color: 'var(--accent-deep)', fontWeight: 800 }}>{t.signinLink}</a></p>;
}

function StepMethod({ go, set }: { go: (s: Step) => void; set: (p: any) => void }) {
  const { lang } = useLang();
  const t = SU[lang].method;
  return (
    <div>
      <h2 style={{ fontSize: 27, fontWeight: 800, letterSpacing: '-.025em', margin: '0 0 8px' }}>{t.title}</h2>
      <p className="pretty" style={{ fontSize: 15.5, color: 'var(--ink-2)', margin: '0 0 26px', lineHeight: 1.5 }}>{t.sub}</p>
      <button onClick={() => { set({ via: 'telegram' }); go('telegram'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 15, background: 'var(--tg)', color: '#fff', boxShadow: '0 12px 26px -10px rgba(42,171,238,.55)', textAlign: 'left', transition: 'transform .15s' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.2)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="send" size={22} stroke={2} /></span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 16.5, fontWeight: 800 }}>{t.tg}</span>
          <span style={{ display: 'block', fontSize: 12.5, opacity: 0.9, fontWeight: 600 }}>{t.tgNote}</span>
        </span>
        <Icon name="arrow" size={20} stroke={2.4} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)' }}>{t.or}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <button onClick={() => { set({ via: 'phone' }); go('phone'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderRadius: 15, background: 'var(--bg)', border: '1.5px solid var(--line-2)', textAlign: 'left', color: 'var(--ink)', transition: 'border-color .15s' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ink-3)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line-2)')}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', display: 'grid', placeItems: 'center', flex: 'none', color: 'var(--ink-2)' }}><Icon name="phone" size={20} stroke={2} /></span>
        <span style={{ flex: 1, fontSize: 15.5, fontWeight: 800 }}>{t.phone}</span>
        <Icon name="arrow" size={19} stroke={2.2} style={{ color: 'var(--ink-3)' }} />
      </button>
      <p className="pretty" style={{ fontSize: 12.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 24, lineHeight: 1.5 }}>{t.terms}</p>
      <SigninLine />
    </div>
  );
}

function StepTelegram({ go }: { go: (s: Step) => void }) {
  const { lang } = useLang();
  const t = SU[lang].tg;
  return (
    <div>
      <BackBtn onClick={() => go('method')} />
      <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.025em', margin: '14px 0 8px' }}>{t.title}</h2>
      <p className="pretty" style={{ fontSize: 15, color: 'var(--ink-2)', margin: '0 0 22px', lineHeight: 1.5 }}>{t.sub}</p>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', padding: 18, borderRadius: 16, background: 'var(--tg-tint)', border: '1px solid color-mix(in srgb, var(--tg) 30%, transparent)', marginBottom: 22 }}>
        <QR size={116} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 800, color: 'var(--tg-deep)', background: 'var(--bg)', padding: '5px 11px', borderRadius: 999, marginBottom: 10 }}>
            <Icon name="send" size={14} stroke={2.2} />{t.bot}
          </div>
          <div className="pretty" style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, lineHeight: 1.5 }}>{t.scan}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24 }}>
        {[t.s1, t.s2, t.s3].map((s: string, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800, flex: 'none' }}>{i + 1}</span>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink-2)' }}>{s}</span>
          </div>
        ))}
      </div>
      <a href={BUSINESS_BOT_URL} target="_blank" rel="noopener" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 800, fontSize: 16, padding: '15px 22px', borderRadius: 14, background: 'var(--tg)', color: '#fff', boxShadow: '0 12px 26px -10px rgba(42,171,238,.55)', marginBottom: 12 }}>
        <Icon name="send" size={18} stroke={2.2} />{t.open}
      </a>
      <PrimaryBtn onClick={() => go('business')}>{t.done}</PrimaryBtn>
    </div>
  );
}

function StepPhone({ go, data, set }: { go: (s: Step) => void; data: any; set: (p: any) => void }) {
  const { lang } = useLang();
  const t = SU[lang].phone;
  const [sent, setSent] = useState(false);
  const codeFilled = data.code.every((c: string) => c !== '');
  const codeOk = data.code.join('') === '1111';
  const phoneOk = data.phone.replace(/\D/g, '').length >= 9;
  return (
    <div>
      <BackBtn onClick={() => go('method')} />
      <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.025em', margin: '14px 0 8px' }}>{t.title}</h2>
      <p className="pretty" style={{ fontSize: 15, color: 'var(--ink-2)', margin: '0 0 24px', lineHeight: 1.5 }}>{t.sub}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <SUField label={t.label}>
          <SUInput type="tel" placeholder="+998 90 000 00 00" value={data.phone} onChange={(e) => set({ phone: e.target.value })} />
        </SUField>
        {!sent && <PrimaryBtn icon={null} disabled={!phoneOk} onClick={() => setSent(true)}>{t.send}</PrimaryBtn>}
        {sent && (
          <div className="step-anim">
            <SUField label={t.codeTitle}>
              <div style={{ display: 'flex', gap: 10 }}>
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    inputMode="numeric"
                    maxLength={1}
                    value={data.code[i]}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      const c = [...data.code];
                      c[i] = v;
                      set({ code: c });
                      const next = e.target.nextElementSibling as HTMLInputElement | null;
                      if (v && next) next.focus();
                    }}
                    style={{ ...fieldInput, width: 56, height: 60, textAlign: 'center', fontSize: 24, fontWeight: 800, padding: 0 }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-deep)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--line-2)')}
                  />
                ))}
              </div>
            </SUField>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, margin: '10px 0 4px' }}>SMS · {data.phone || '+998 ··· ·· ··'} · {t.codeSub}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, margin: '0 0 16px', color: codeFilled && !codeOk ? 'var(--accent-deep)' : 'var(--ink-3)' }}>
              {codeFilled && !codeOk ? '✕ 1111' : 'Demo · 1111'}
            </div>
            <PrimaryBtn disabled={!codeOk} onClick={() => go('business')}>{t.verify}</PrimaryBtn>
          </div>
        )}
      </div>
      <SigninLine />
    </div>
  );
}

function StepBusiness({ go, data, set, setResult }: { go: (s: Step) => void; data: any; set: (p: any) => void; setResult: (r: SignupResult) => void }) {
  const { lang, t: landingT } = useLang();
  const t = SU[lang].biz;
  const industries: string[] = landingT.industries.list as unknown as string[];
  const cities: string[] = SU[lang].cities;
  const ok = data.bizName.trim().length > 1;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finish = async () => {
    // The Telegram path stays bot-driven (the bot creates the business) — no web write here.
    if (data.via !== 'phone') {
      go('done');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${CRM_URL}api/signup`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.bizName.trim(),
          type: TYPE_MAP[data.industry] || 'other',
          address: cities[data.city] || '',
          phone: data.phone,
          lang,
          code: '1111',
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || !payload.ok) throw new Error(payload.error || 'Could not create the account.');
      setResult({ username: payload.username, password: payload.password, businessName: payload.businessName });
      go('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the account.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <BackBtn onClick={() => go(data.via === 'telegram' ? 'telegram' : 'phone')} />
      <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.025em', margin: '14px 0 8px' }}>{t.title}</h2>
      <p className="pretty" style={{ fontSize: 15, color: 'var(--ink-2)', margin: '0 0 24px', lineHeight: 1.5 }}>{t.sub}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <SUField label={t.name}><SUInput placeholder={t.namePh} value={data.bizName} onChange={(e) => set({ bizName: e.target.value })} autoFocus /></SUField>
        <SUField label={t.industry}>
          <SUSelect value={data.industry} onChange={(e) => set({ industry: +e.target.value })}>
            {industries.map((n, i) => <option key={i} value={i}>{n}</option>)}
          </SUSelect>
        </SUField>
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <SUField label={t.city}>
              <SUSelect value={data.city} onChange={(e) => set({ city: +e.target.value })}>
                {cities.map((n, i) => <option key={i} value={i}>{n}</option>)}
              </SUSelect>
            </SUField>
          </div>
          <div style={{ flex: 1 }}>
            <SUField label={t.team}>
              <SUSelect value={data.team} onChange={(e) => set({ team: +e.target.value })}>
                {t.teamOpts.map((n: string, i: number) => <option key={i} value={i}>{n}</option>)}
              </SUSelect>
            </SUField>
          </div>
        </div>
        {error && <div style={{ fontSize: 13, color: 'var(--accent-deep)', fontWeight: 700 }}>{error}</div>}
        <PrimaryBtn disabled={!ok || submitting} icon={submitting ? null : 'check'} onClick={finish}>{submitting ? '…' : t.finish}</PrimaryBtn>
      </div>
    </div>
  );
}

function StepDone({ data, result }: { data: any; result: SignupResult | null }) {
  const { lang } = useLang();
  const t = SU[lang].done;
  const slug = ((result?.businessName ?? data.bizName).trim() || 'barber-house').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cl = ({
    uz: { title: 'CRM kirish ma’lumotlari', save: 'Bularni saqlab qo‘ying', user: 'Login', pass: 'Parol' },
    ru: { title: 'Данные для входа в CRM', save: 'Сохраните эти данные', user: 'Логин', pass: 'Пароль' },
    en: { title: 'Your CRM login', save: 'Save these credentials', user: 'Username', pass: 'Password' },
  } as const)[lang];
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="pop" style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', margin: '0 auto 22px', boxShadow: '0 14px 30px -10px var(--accent-ring)' }}>
        <Icon name="check" size={40} stroke={3} />
      </div>
      <h2 className="balance" style={{ fontSize: 27, fontWeight: 800, letterSpacing: '-.025em', margin: '0 0 10px' }}>{t.title}</h2>
      <p className="pretty" style={{ fontSize: 15.5, color: 'var(--ink-2)', margin: '0 auto 24px', maxWidth: 380, lineHeight: 1.5 }}>{t.sub}</p>
      {result && (
        <div style={{ background: 'var(--accent-tint)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)', borderRadius: 14, padding: '14px 16px', marginBottom: 16, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)', marginBottom: 10 }}>
            <Icon name="shield" size={15} stroke={2.2} />{cl.title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '6px 0' }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)' }}>{cl.user}</span>
            <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{result.username}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '6px 0', borderTop: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)' }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)' }}>{cl.pass}</span>
            <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{result.password}</span>
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--accent-deep)', marginTop: 8 }}>↳ {cl.save}</div>
        </div>
      )}

      <div style={{ background: 'var(--surface-2)', borderRadius: 14, padding: '14px 16px', marginBottom: 22, textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 5 }}>{t.link}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="globe" size={16} stroke={2} style={{ color: 'var(--accent-deep)', flex: 'none' }} />
          <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>easyq.uz/{slug}</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 800, color: 'var(--accent-deep)', background: 'var(--accent-tint)', padding: '4px 9px', borderRadius: 999, flex: 'none' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-deep)' }} />Live</span>
        </div>
      </div>
      {result ? (
        <form method="POST" action={`${CRM_URL}api/auth/session-login`} style={{ width: '100%' }}>
          <input type="hidden" name="username" value={result.username} />
          <input type="hidden" name="password" value={result.password} />
          <button type="submit" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 800, fontSize: 16, padding: '15px 22px', borderRadius: 14, background: 'var(--accent)', color: 'var(--accent-ink)', boxShadow: '0 10px 24px -10px var(--accent-ring)', cursor: 'pointer', border: 'none', fontFamily: 'var(--font)' }}>
            {t.openCrm}
            <Icon name="arrow" size={18} stroke={2.4} />
          </button>
        </form>
      ) : (
        <PrimaryBtn href={CRM_URL}>{t.openCrm}</PrimaryBtn>
      )}
      <a href={BUSINESS_BOT_URL} target="_blank" rel="noopener" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 800, fontSize: 15, padding: '13px 20px', borderRadius: 14, color: 'var(--tg-deep)', marginTop: 10 }}>
        <Icon name="send" size={17} stroke={2.2} />{t.openTg}
      </a>
      <p style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginTop: 14 }}>{t.hint}</p>
    </div>
  );
}

export function Signup() {
  const [step, setStep] = useState<Step>('method');
  const [data, setData] = useState({ phone: '', code: ['', '', '', ''], bizName: '', industry: 0, city: 0, team: 0, via: 'telegram' });
  const [result, setResult] = useState<SignupResult | null>(null);
  const set = (patch: any) => setData((d) => ({ ...d, ...patch }));
  const stepIdx = step === 'method' || step === 'telegram' || step === 'phone' ? 0 : step === 'business' ? 1 : 2;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--surface)' }}>
      <BrandPanel />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px' }}>
          <a href="/" style={{ display: 'inline-flex' }}><Logo /></a>
          <TopControls />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px 48px' }}>
          <div style={{ width: '100%', maxWidth: 440 }}>
            {step !== 'done' && <Stepper idx={stepIdx} />}
            <div className="step-anim" key={step}>
              {step === 'method' && <StepMethod go={setStep} set={set} />}
              {step === 'telegram' && <StepTelegram go={setStep} />}
              {step === 'phone' && <StepPhone go={setStep} data={data} set={set} />}
              {step === 'business' && <StepBusiness go={setStep} data={data} set={set} setResult={setResult} />}
              {step === 'done' && <StepDone data={data} result={result} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

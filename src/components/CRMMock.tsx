import { type Language, useLanguage } from '../i18n';

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

const mockCopy: Record<
  Language,
  {
    weekdays: string[];
    month: string;
    topActions: string[];
    businessType: string;
    sidebarItems: string[];
    title: string;
    metrics: Array<{ label: string; value: string; sub: string }>;
    employeeCalendar: string;
    allEmployees: string;
    service: string;
  }
> = {
  en: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: 'April 2026',
    topActions: ['Today', '‹', '›', 'Refresh'],
    businessType: 'Barbershop',
    sidebarItems: ['Calendar', 'Overview', 'Staff', 'Services', 'Clients', 'Analytics', 'Online booking'],
    title: 'Sunday, April 26',
    metrics: [
      { label: 'Bookings today', value: '12', sub: '5 already arrived' },
      { label: 'Collected today', value: '450 000 UZS', sub: 'refunds: 0 UZS' },
      { label: 'Collected this month', value: '8.2M UZS', sub: 'actual payments' },
      { label: 'Open slots', value: '8', sub: '3 employees' },
    ],
    employeeCalendar: 'Employee calendar',
    allEmployees: 'All (3)',
    service: 'Hair Cut',
  },
  uz: {
    weekdays: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'],
    month: 'Aprel 2026',
    topActions: ['Bugun', '‹', '›', 'Yangilash'],
    businessType: 'Sartaroshxona',
    sidebarItems: ['Kalendar', 'Umumiy', 'Xodimlar', 'Xizmatlar', 'Mijozlar', 'Analitika', 'Onlayn bron'],
    title: 'Yakshanba, 26 Aprel',
    metrics: [
      { label: 'Bugungi bronlar', value: '12', sub: '5 tasi keldi' },
      { label: 'Bugun yig‘ildi', value: '450 000 UZS', sub: 'qaytarish: 0 UZS' },
      { label: 'Oy bo‘yicha', value: '8.2M UZS', sub: 'real to‘lovlar' },
      { label: 'Bo‘sh vaqtlar', value: '8', sub: '3 xodim' },
    ],
    employeeCalendar: 'Xodimlar kalendari',
    allEmployees: 'Barchasi (3)',
    service: 'Soch olish',
  },
  ru: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    month: 'Апрель 2026',
    topActions: ['Сегодня', '‹', '›', 'Обновить'],
    businessType: 'Barbershop',
    sidebarItems: ['Календарь', 'Обзор', 'Сотрудники', 'Услуги', 'Клиенты', 'Аналитика', 'Онлайн-запись'],
    title: 'Воскресенье, 26 Апреля',
    metrics: [
      { label: 'Записи на сегодня', value: '12', sub: '5 уже пришли' },
      { label: 'Собрано за день', value: '450 000 UZS', sub: 'возвраты: 0 UZS' },
      { label: 'Собрано за месяц', value: '8.2M UZS', sub: 'по факт. платежам' },
      { label: 'Свободных слотов', value: '8', sub: '3 сотрудника' },
    ],
    employeeCalendar: 'Календарь сотрудников',
    allEmployees: 'Все (3)',
    service: 'Hair Cut',
  },
};

const employees = ['Jasur', 'Nilufar', 'Bobur'];

export function CRMMock() {
  const { language } = useLanguage();
  const copy = mockCopy[language];

  return (
    <div className="crm-mock" aria-label="easyQ CRM dashboard preview">
      <div className="crm-mock__topbar">
        <div className="crm-mock__brand">
          <span className="crm-mock__brand-mark">E</span>
          <span>
            <strong>Best Barber</strong>
            <small>{copy.businessType}</small>
          </span>
        </div>
        <div className="crm-mock__actions" aria-hidden="true">
          {copy.topActions.map((label, index) => (
            <span key={label} className={index === 0 ? 'is-active' : ''}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="crm-mock__body">
        <aside className="crm-mock__sidebar">
          <div className="mini-calendar">
            <p>{copy.month}</p>
            <div className="mini-calendar__grid">
              {copy.weekdays.map((day) => (
                <b key={day}>{day}</b>
              ))}
              {calendarDays.map((day) => (
                <span key={day} className={day === 26 ? 'is-selected' : day > 25 ? 'is-muted' : ''}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          <nav className="crm-mock__menu" aria-label="CRM preview menu">
            {copy.sidebarItems.map((item, index) => (
              <span key={item} className={index === 0 ? 'is-active' : ''}>
                {item}
              </span>
            ))}
          </nav>
        </aside>

        <main className="crm-mock__main">
          <h3>{copy.title}</h3>
          <div className="crm-mock__metrics">
            {copy.metrics.map((metric) => (
              <article key={metric.label}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
                <span>{metric.sub}</span>
              </article>
            ))}
          </div>

          <p className="crm-mock__label">{copy.employeeCalendar}</p>
          <div className="crm-mock__employees">
            {[copy.allEmployees, ...employees].map((employee, index) => (
              <span key={employee} className={index === 0 ? 'is-active' : ''}>
                <strong>{employee}</strong>
                <small>{copy.service}</small>
              </span>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

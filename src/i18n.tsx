import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export const LANGS: Array<{ code: Language; label: string }> = [
  { code: 'uz', label: 'O‘z' },
  { code: 'ru', label: 'Рус' },
  { code: 'en', label: 'Eng' },
];

const LANG_KEY = 'easyq_lang';
const THEME_KEY = 'easyq_theme';

const translations = {
  uz: {
    dir: 'Onlayn navbat va mijozlar bazasi',
    nav: {
      features: 'Imkoniyatlar',
      industries: 'Sohalar',
      how: 'Qanday ishlaydi',
      pricing: 'Narxlar',
      faq: 'Savollar',
      signin: 'Kirish',
      start: 'Bepul boshlash',
      demo: 'Demo ko‘rish',
    },
    hero: {
      badge: 'Telegram orqali onlayn navbat',
      title1: 'Qo‘ng‘iroqlarga javob berishni bas qiling.',
      title2: 'Mijozlar o‘zi navbat olsin.',
      sub: 'O‘zbekistondagi xizmat ko‘rsatuvchi bizneslar uchun Telegram orqali onlayn navbat va CRM tizimi.',
      ctaPrimary: 'Bepul boshlash',
      ctaSecondary: 'Demo ko‘rish',
      scribble: 'rostdan bepul!',
      note: 'Birinchi oy bepul · 30 daqiqada ishga tushadi',
    },
    heroOwner: { name: 'Sardor Karimov', role: '“Barber House” egasi, Toshkent' },
    tgChat: {
      title: 'Barber House',
      sub: 'bot · onlayn navbat',
      b1: 'Assalomu alaykum! Qaysi xizmatga yozilasiz? ✂️',
      svc: 'Soch + soqol olish',
      b2: 'Ajoyib. Qaysi vaqt qulay?',
      slot1: 'Bugun 15:00',
      slot2: 'Bugun 16:30',
      b3: 'Bandlandi ✅ Sardor sizni 16:30 da kutadi. Eslatma yuboramiz.',
      input: 'Xabar yozing…',
    },
    crmMini: {
      title: 'Bugungi jadval',
      live: 'Jonli',
      a1n: 'Jasur A.',
      a1s: 'Soch olish',
      a2n: 'Dilnoza R.',
      a2s: 'Manikyur',
      a3n: 'Otabek M.',
      a3s: 'Soqol',
      today: 'Bugun 18 ta navbat',
    },
    social: {
      title: 'O‘zbekiston bo‘ylab bizneslar ishonadi',
      sub: 'Toshkent, Samarqand, Buxoro va boshqa shaharlardagi salon, klinika va servislar.',
      s1: 'faol biznes',
      s1l: 'Platformada',
      s2: 'navbat',
      s2l: 'Har oy band qilinadi',
      s3: 'kamroq',
      s3l: 'Kelmay qolish',
      s4: 'reyting',
      s4l: 'Mijozlar bahosi',
    },
    problems: {
      eyebrow: 'Biz hal qiladigan muammolar',
      title: 'Biznes egalari CRM sotib olmaydi. Ular natija sotib oladi.',
      sub: 'EasyQ kundalik bosh og‘rig‘ini hal qiladi — funksiyalarni emas, natijani beradi.',
      items: [
        { t: 'Ko‘proq navbatlar', d: 'Mijozlar kechayu kunduz, qo‘ng‘iroqsiz o‘zi yoziladi. Siz uxlab yotganingizda ham navbat tushaveradi.' },
        { t: 'Kelmay qolishni kamaytiring', d: 'Avtomatik eslatmalar bo‘sh joylar va yo‘qotilgan daromadni kamaytiradi.' },
        { t: 'Vaqtni tejang', d: 'Kun bo‘yi telefonda gaplashish o‘rniga — bir necha bosish bilan boshqaring.' },
        { t: 'Daromadni oshiring', d: 'Oson navbat, kamroq bekor qilish va qaytib keluvchi mijozlar.' },
        { t: 'Xodimlarni tartibga soling', d: 'Har bir usta o‘z jadvalini ko‘radi. Chalkashlik yo‘q.' },
        { t: 'Eslatmalarni avtomatlashtiring', d: 'Telegram orqali tasdiq va eslatma — o‘zi yuboriladi.' },
      ],
    },
    how: {
      eyebrow: 'Qanday ishlaydi',
      title: '30 daqiqada ishga tushiring',
      sub: 'Texnik bilim shart emas. Telefon yetadi.',
      steps: [
        { t: 'Biznes profilini yarating', d: 'Nomi, manzili va ish vaqtini kiriting.' },
        { t: 'Xizmat va ustalarni qo‘shing', d: 'Narx, davomiylik va xodimlarni belgilang.' },
        { t: 'Telegram navbat sahifasini oling', d: 'O‘z nomingiz bilan tayyor havola.' },
        { t: 'Mijozlar onlayn yoziladi', d: 'Telegram orqali bir necha bosishda.' },
        { t: 'Eslatmalar avtomatik ketadi', d: 'Tasdiq va eslatmalar o‘zi yuboriladi.' },
        { t: 'Hammasini CRM’da boshqaring', d: 'Jadval, mijoz va hisobot — bir joyda.' },
      ],
    },
    industries: {
      eyebrow: 'Sizning sohangiz uchun',
      title: 'Har bir xizmat biznesi uchun yaratilgan',
      sub: 'Ish jarayoningizga moslashadi — sartaroshxonadan klinikagacha.',
      list: ['Sartaroshxonalar', 'Go‘zallik salonlari', 'Avtomoykalar', 'Stomatologiya klinikalari', 'Tibbiyot markazlari', 'Fitnes klublari', 'Massaj studiyalari', 'Veterinariya klinikalari'],
      cta: 'Sizning sohangiz ro‘yxatda yo‘qmi? EasyQ baribir mos keladi.',
      dropCap: 'Rasm qo‘shing',
    },
    tg: {
      eyebrow: 'Telegram asosidagi tajriba',
      title: 'Mijozlaringiz allaqachon Telegram’da',
      sub: 'Ilova yuklab olish shart emas. Mijozlar odatdagi Telegram’da yoziladi, siz esa biznes-botda boshqarasiz.',
      f1t: 'Mijoz uchun bot',
      f1d: 'Xizmat tanlaydi, vaqt oladi va tasdiq oladi — bir suhbatda.',
      f2t: 'Biznes uchun bot',
      f2d: 'Yangi navbatlar, bekor qilishlar va kun jadvali telefoningizga tushadi.',
      f3t: 'Navbat oqimi',
      f3d: 'Xizmat → usta → vaqt → tasdiq. Sodda va tez.',
      f4t: 'Eslatma oqimi',
      f4d: 'Avtomatik eslatma kelmay qolishni keskin kamaytiradi.',
    },
    crm: {
      eyebrow: 'CRM boshqaruv paneli',
      title: 'Hammasi bitta joyda',
      sub: 'Asosiysi skrinshotlar emas — natija. Jadval, xodimlar, xizmatlar va mijozlaringiz bitta oynada.',
      benefits: [
        { t: 'Jonli jadval', d: 'Kun, hafta va usta bo‘yicha barcha navbatlar.' },
        { t: 'Xodimlar', d: 'Har bir usta uchun ish vaqti va yuklama.' },
        { t: 'Mijozlar bazasi', d: 'Tarix, eslatma va sodiqlik bir joyda.' },
        { t: 'Tahlil va hisobot', d: 'Daromad, band qilish va kelmay qolish ko‘rsatkichlari.' },
      ],
      tabs: ['Jadval', 'Xodimlar', 'Xizmatlar', 'Tahlil'],
    },
    stories: {
      eyebrow: 'Haqiqiy mijoz hikoyalari',
      title: 'Natijalar o‘zi gapiradi',
      items: [
        { q: 'Kelmay qolishni 70% ga kamaytirdik va endi navbatlarni telefon orqali boshqarmaymiz.', n: 'Madina Yusupova', b: 'Lola Beauty', i: 'Go‘zallik saloni · Toshkent' },
        { q: 'Adminni yollashga hojat qolmadi. Mijozlar kechqurun ham o‘zi yoziladi.', n: 'Bekzod Tursunov', b: 'Royal Barber', i: 'Sartaroshxona · Samarqand' },
        { q: 'Telegram eslatmalari tufayli bo‘sh oraliqlar deyarli yo‘qoldi.', n: 'Doniyor Saidov', b: 'AutoSpa', i: 'Avtomoyka · Buxoro' },
      ],
    },
    compare: {
      eyebrow: 'EasyQ vs eski usul',
      title: 'Tartibsizlikdan tartibga',
      without: 'EasyQ’siz',
      with: 'EasyQ bilan',
      rows: [
        ['Doimiy telefon qo‘ng‘iroqlari', 'Onlayn o‘zi yoziladi'],
        ['Qog‘oz daftardagi jadval', 'Jonli raqamli jadval'],
        ['Kelmay qolgan mijozlar', 'Avtomatik eslatmalar'],
        ['Qo‘lda eslatib chiqish', 'Telegram orqali avto-eslatma'],
        ['Mijoz tarixisiz', 'To‘liq CRM bazasi'],
        ['Taxminiy hisob', 'Aniq tahlil va hisobot'],
      ],
    },
    pricing: {
      eyebrow: 'Narxlar',
      title: 'Jamoangizga mos tarif',
      sub: 'Xodimlar soniga qarab tanlang, uzoq muddatga to‘lab tejang.',
      monthly: '1 oylik',
      yearly: '12 oylik',
      save: '30%gacha tejang',
      perMonth: '/ oyiga',
      popular: 'Eng ommabop',
      cta: 'Boshlash',
      staffLabel: '{n} nafargacha xodim',
      footnote: 'Barcha tariflar birinchi oy bepul, Telegram navbat, CRM, eslatmalar, xodim jadvali, xizmatlar, sharhlar, biznes-sahifa, havola va asosiy tahlilni o‘z ichiga oladi.',
      tiers: [
        { staff: '2', m: '175 000', y: '99 000', note: 'Asosiy EasyQ imkoniyatlari', tag: 'Kichik jamoa uchun' },
        { staff: '5', m: '299 000', y: '149 000', note: 'Eng ommabop tarif', tag: 'Eng ko‘p tanlanadi' },
        { staff: '8', m: '499 000', y: '249 000', note: 'O‘suvchi jamoalar uchun', tag: 'Kengayuvchi biznes' },
        { staff: '15', m: '799 000', y: '499 000', note: 'Band jamoa va filiallar uchun', tag: 'Tarmoq va filiallar' },
      ],
    },
    faq: {
      eyebrow: 'Savol-javob',
      title: 'Tez-tez beriladigan savollar',
      items: [
        { q: 'Telegram orqali navbat qanday ishlaydi?', a: 'Mijoz biznes-botingizga kiradi, xizmat va qulay vaqtni tanlaydi va darhol tasdiq oladi. Siz uchun navbat avtomatik CRM jadvaliga tushadi.' },
        { q: 'Ilova kerakmi?', a: 'Yo‘q. Mijozlaringiz oddiy Telegram’dan foydalanadi, siz esa brauzer yoki Telegram biznes-botida boshqarasiz. Hech narsa o‘rnatish shart emas.' },
        { q: 'O‘z biznes nomimni ishlatsam bo‘ladimi?', a: 'Albatta. Navbat sahifasi va bot sizning brendingiz, logotipingiz va nomingiz bilan ishlaydi.' },
        { q: 'Bir nechta xodimni boshqara olamanmi?', a: 'Ha. Har bir usta uchun alohida jadval, xizmat va ish vaqtini sozlaysiz — tarifga qarab cheksiz.' },
        { q: 'Qancha turadi?', a: 'Tariflar oyiga 175 000 so‘mdan boshlanadi, birinchi oy bepul. Xodimlar soniga qarab tanlaysiz.' },
      ],
    },
    finalCta: {
      title: 'Bugundan navbat qabul qilishni boshlang',
      sub: 'Navbat tizimingizni 30 daqiqadan kamroq vaqtda ishga tushiring.',
      ctaPrimary: 'Bepul boshlash',
      ctaSecondary: 'Demo ko‘rish',
    },
    footer: {
      tagline: 'O‘zbekistondagi xizmat bizneslari uchun onlayn navbat va CRM.',
      product: 'Mahsulot',
      company: 'Kompaniya',
      support: 'Yordam',
      links: { features: 'Imkoniyatlar', pricing: 'Narxlar', industries: 'Sohalar', how: 'Qanday ishlaydi', about: 'Biz haqimizda', stories: 'Mijozlar', contact: 'Aloqa', faq: 'Savollar', terms: 'Shartlar', privacy: 'Maxfiylik' },
      lang: 'Til',
      rights: '© 2026 EasyQ. Barcha huquqlar himoyalangan.',
    },
    about: {
      eyebrow: 'Biz haqimizda',
      title: 'easyQ nima qiladi',
      description: 'easyQ xizmat bizneslariga Telegram botlar orqali onlayn bron qabul qilish va kundalik ishlarni qulay CRM paneldan boshqarishga yordam beradi.',
      servicesTitle: 'Biz taqdim etadigan xizmatlar',
      services: [
        'Mijozlar va biznes egalari uchun Telegram bron botlari',
        'Jadval, xodimlar, xizmatlar, mijozlar va analitika uchun CRM panel',
        'Bron asosidagi xizmat kompaniyalari uchun onlayn bron sozlash',
        'Xabarnomalar, eslatmalar va bron boshqaruvi oqimlari',
      ],
      companyTitle: 'Kompaniya ma’lumotlari',
      companyDetails: [
        ['Buyurtmachi', '“TASHKENBAYEV” MChJ'],
        ['Manzil', 'Toshkent viloyati, Bo‘stonliq tumani, Mustaqillik ko‘chasi, 46/28'],
        ['Telefon', '+998 (97) 753-94-72'],
        ['Email', 'ourdreamjj@gmail.com'],
        ['Hisob raqami', '2020 8000 3073 9227 7001'],
        ['Bank', '“NBU” AJ, Bo‘stonliq filiali'],
        ['MFO', '00450'],
        ['STIR', '312762723'],
        ['Direktor', 'Tashkenbayev N.Yu.'],
      ],
    },
  },

  ru: {
    dir: 'Онлайн-запись и база клиентов',
    nav: {
      features: 'Возможности',
      industries: 'Отрасли',
      how: 'Как работает',
      pricing: 'Цены',
      faq: 'Вопросы',
      signin: 'Войти',
      start: 'Начать бесплатно',
      demo: 'Демо',
    },
    hero: {
      badge: 'Онлайн-запись через Telegram',
      title1: 'Перестаньте отвечать на звонки.',
      title2: 'Пусть клиенты записываются сами.',
      sub: 'Онлайн-запись через Telegram и CRM для сервисного бизнеса в Узбекистане.',
      ctaPrimary: 'Начать бесплатно',
      ctaSecondary: 'Заказать демо',
      scribble: 'правда бесплатно!',
      note: 'Первый месяц бесплатно · Запуск за 30 минут',
    },
    heroOwner: { name: 'Сардор Каримов', role: 'Владелец «Barber House», Ташкент' },
    tgChat: {
      title: 'Barber House',
      sub: 'бот · онлайн-запись',
      b1: 'Здравствуйте! На какую услугу записать? ✂️',
      svc: 'Стрижка + борода',
      b2: 'Отлично. Какое время удобно?',
      slot1: 'Сегодня 15:00',
      slot2: 'Сегодня 16:30',
      b3: 'Записали ✅ Сардор ждёт вас в 16:30. Пришлём напоминание.',
      input: 'Сообщение…',
    },
    crmMini: {
      title: 'Расписание на сегодня',
      live: 'Онлайн',
      a1n: 'Жасур А.',
      a1s: 'Стрижка',
      a2n: 'Дильноза Р.',
      a2s: 'Маникюр',
      a3n: 'Отабек М.',
      a3s: 'Борода',
      today: 'Сегодня 18 записей',
    },
    social: {
      title: 'Нам доверяют по всему Узбекистану',
      sub: 'Салоны, клиники и сервисы в Ташкенте, Самарканде, Бухаре и других городах.',
      s1: 'бизнесов',
      s1l: 'На платформе',
      s2: 'записей',
      s2l: 'Каждый месяц',
      s3: 'меньше',
      s3l: 'Неявок клиентов',
      s4: 'рейтинг',
      s4l: 'Оценка клиентов',
    },
    problems: {
      eyebrow: 'Какие проблемы решаем',
      title: 'Владельцы не покупают CRM. Они покупают результат.',
      sub: 'EasyQ снимает ежедневную головную боль — это про результат, а не про функции.',
      items: [
        { t: 'Больше записей', d: 'Клиенты записываются сами круглосуточно, без звонков — даже пока вы спите.' },
        { t: 'Меньше неявок', d: 'Автоматические напоминания сокращают пустые окна и потерянную выручку.' },
        { t: 'Экономия времени', d: 'Вместо звонков весь день — управление в пару касаний.' },
        { t: 'Рост выручки', d: 'Удобная запись, меньше отмен и больше возвращающихся клиентов.' },
        { t: 'Порядок в команде', d: 'Каждый мастер видит своё расписание. Никакой путаницы.' },
        { t: 'Авто-напоминания', d: 'Подтверждения и напоминания в Telegram уходят сами.' },
      ],
    },
    how: {
      eyebrow: 'Как это работает',
      title: 'Запуск за 30 минут',
      sub: 'Без технических знаний. Достаточно телефона.',
      steps: [
        { t: 'Создайте профиль бизнеса', d: 'Название, адрес и часы работы.' },
        { t: 'Добавьте услуги и мастеров', d: 'Цена, длительность и сотрудники.' },
        { t: 'Получите страницу записи', d: 'Готовая ссылка под вашим именем.' },
        { t: 'Клиенты записываются онлайн', d: 'Через Telegram в пару касаний.' },
        { t: 'Напоминания уходят сами', d: 'Подтверждения и напоминания автоматически.' },
        { t: 'Управляйте всем в CRM', d: 'Расписание, клиенты и отчёты — в одном месте.' },
      ],
    },
    industries: {
      eyebrow: 'Для вашей отрасли',
      title: 'Создано для каждого сервисного бизнеса',
      sub: 'Подстраивается под ваш процесс — от барбершопа до клиники.',
      list: ['Барбершопы', 'Салоны красоты', 'Автомойки', 'Стоматологии', 'Медцентры', 'Фитнес-клубы', 'Массаж-студии', 'Ветклиники'],
      cta: 'Вашей отрасли нет в списке? EasyQ всё равно подойдёт.',
      dropCap: 'Добавьте фото',
    },
    tg: {
      eyebrow: 'Telegram в основе',
      title: 'Ваши клиенты уже в Telegram',
      sub: 'Не нужно скачивать приложение. Клиенты записываются в привычном Telegram, а вы управляете в бизнес-боте.',
      f1t: 'Бот для клиента',
      f1d: 'Выбирает услугу, время и получает подтверждение — за один диалог.',
      f2t: 'Бот для бизнеса',
      f2d: 'Новые записи, отмены и расписание дня приходят вам на телефон.',
      f3t: 'Поток записи',
      f3d: 'Услуга → мастер → время → подтверждение. Просто и быстро.',
      f4t: 'Поток напоминаний',
      f4d: 'Автонапоминания резко снижают неявки клиентов.',
    },
    crm: {
      eyebrow: 'CRM-панель',
      title: 'Всё в одном месте',
      sub: 'Главное не скриншоты, а результат. Расписание, сотрудники, услуги и клиенты в одном окне.',
      benefits: [
        { t: 'Живое расписание', d: 'Все записи по дню, неделе и мастеру.' },
        { t: 'Сотрудники', d: 'Часы работы и загрузка по каждому мастеру.' },
        { t: 'База клиентов', d: 'История, заметки и лояльность в одном месте.' },
        { t: 'Аналитика и отчёты', d: 'Выручка, заполняемость и неявки наглядно.' },
      ],
      tabs: ['Расписание', 'Сотрудники', 'Услуги', 'Аналитика'],
    },
    stories: {
      eyebrow: 'Истории клиентов',
      title: 'Результаты говорят сами за себя',
      items: [
        { q: 'Сократили неявки на 70% и больше не ведём записи по телефону.', n: 'Мадина Юсупова', b: 'Lola Beauty', i: 'Салон красоты · Ташкент' },
        { q: 'Отпала нужда в администраторе. Клиенты записываются даже вечером.', n: 'Бекзод Турсунов', b: 'Royal Barber', i: 'Барбершоп · Самарканд' },
        { q: 'Благодаря напоминаниям в Telegram пустые окна почти исчезли.', n: 'Дониёр Саидов', b: 'AutoSpa', i: 'Автомойка · Бухара' },
      ],
    },
    compare: {
      eyebrow: 'EasyQ против старого подхода',
      title: 'От хаоса к порядку',
      without: 'Без EasyQ',
      with: 'С EasyQ',
      rows: [
        ['Бесконечные звонки', 'Онлайн-запись без звонков'],
        ['Расписание в бумажном журнале', 'Живое цифровое расписание'],
        ['Клиенты не приходят', 'Автоматические напоминания'],
        ['Напоминания вручную', 'Авто-напоминания в Telegram'],
        ['Нет истории клиента', 'Полная CRM-база'],
        ['Учёт на глаз', 'Точная аналитика и отчёты'],
      ],
    },
    pricing: {
      eyebrow: 'Цены',
      title: 'Тариф под вашу команду',
      sub: 'Выбирайте по числу сотрудников и экономьте при оплате на длительный срок.',
      monthly: '1 месяц',
      yearly: '12 месяцев',
      save: 'Экономия до 30%',
      perMonth: '/ в месяц',
      popular: 'Популярный',
      cta: 'Начать',
      staffLabel: 'до {n} сотрудников',
      footnote: 'Все тарифы включают первый месяц бесплатно, запись через Telegram, CRM, напоминания, расписание сотрудников, услуги, отзывы, бизнес-страницу, ссылку для записи и базовую аналитику.',
      tiers: [
        { staff: '2', m: '175 000', y: '99 000', note: 'Базовые возможности EasyQ', tag: 'Для небольшой команды' },
        { staff: '5', m: '299 000', y: '149 000', note: 'Самый популярный тариф', tag: 'Выбирают чаще всего' },
        { staff: '8', m: '499 000', y: '249 000', note: 'Для растущих команд', tag: 'Растущий бизнес' },
        { staff: '15', m: '799 000', y: '499 000', note: 'Для занятых команд и филиалов', tag: 'Сеть и филиалы' },
      ],
    },
    faq: {
      eyebrow: 'Вопросы и ответы',
      title: 'Частые вопросы',
      items: [
        { q: 'Как работает запись через Telegram?', a: 'Клиент заходит в ваш бизнес-бот, выбирает услугу и удобное время и сразу получает подтверждение. Запись автоматически попадает в ваше CRM-расписание.' },
        { q: 'Нужно ли приложение?', a: 'Нет. Ваши клиенты пользуются обычным Telegram, а вы управляете в браузере или бизнес-боте. Ничего устанавливать не нужно.' },
        { q: 'Можно использовать своё название?', a: 'Конечно. Страница записи и бот работают под вашим брендом, логотипом и названием.' },
        { q: 'Можно управлять несколькими сотрудниками?', a: 'Да. Для каждого мастера настраиваете отдельное расписание, услуги и часы работы — без ограничений в зависимости от тарифа.' },
        { q: 'Сколько это стоит?', a: 'Тарифы начинаются от 175 000 сум в месяц, первый месяц бесплатно. Выбираете по числу сотрудников.' },
      ],
    },
    finalCta: {
      title: 'Начните принимать записи уже сегодня',
      sub: 'Запустите систему записи меньше чем за 30 минут.',
      ctaPrimary: 'Начать бесплатно',
      ctaSecondary: 'Заказать демо',
    },
    footer: {
      tagline: 'Онлайн-запись и CRM для сервисного бизнеса в Узбекистане.',
      product: 'Продукт',
      company: 'Компания',
      support: 'Поддержка',
      links: { features: 'Возможности', pricing: 'Цены', industries: 'Отрасли', how: 'Как работает', about: 'О нас', stories: 'Клиенты', contact: 'Контакты', faq: 'Вопросы', terms: 'Условия', privacy: 'Конфиденциальность' },
      lang: 'Язык',
      rights: '© 2026 EasyQ. Все права защищены.',
    },
    about: {
      eyebrow: 'О нас',
      title: 'Что делает easyQ',
      description: 'easyQ помогает сервисному бизнесу принимать онлайн-записи через Telegram-ботов и управлять ежедневной работой из удобной CRM-панели.',
      servicesTitle: 'Какие услуги мы предоставляем',
      services: [
        'Telegram-боты для записи клиентов и управления бизнесом',
        'CRM-панель для расписания, сотрудников, услуг, клиентов и аналитики',
        'Настройка онлайн-записи для сервисных компаний',
        'Уведомления, напоминания и сценарии управления записями',
      ],
      companyTitle: 'Реквизиты компании',
      companyDetails: [
        ['Заказчик', 'OOO «TASHKENBAYEV»'],
        ['Адрес', 'Ташкентская область, Бустонликский, ул. Мустакиллик, 46/28'],
        ['Телефон', '+998 (97) 753-94-72'],
        ['Эл. почта', 'ourdreamjj@gmail.com'],
        ['Расчетный счет №', '2020 8000 3073 9227 7001'],
        ['Банк', 'АО «НБУ» Бустонликский филиал'],
        ['МФО', '00450'],
        ['ИНН', '312762723'],
        ['Директор', 'Ташкенбаев Н.Ю.'],
      ],
    },
  },

  en: {
    dir: 'Online booking & customer base',
    nav: {
      features: 'Features',
      industries: 'Industries',
      how: 'How it works',
      pricing: 'Pricing',
      faq: 'FAQ',
      signin: 'Sign in',
      start: 'Start free',
      demo: 'Book demo',
    },
    hero: {
      badge: 'Online booking through Telegram',
      title1: 'Stop answering calls.',
      title2: 'Let customers book themselves.',
      sub: 'Online booking through Telegram and CRM management for service businesses in Uzbekistan.',
      ctaPrimary: 'Start free',
      ctaSecondary: 'Book a demo',
      scribble: 'it’s really free!',
      note: 'First month free · Live in 30 minutes',
    },
    heroOwner: { name: 'Sardor Karimov', role: 'Owner, Barber House · Tashkent' },
    tgChat: {
      title: 'Barber House',
      sub: 'bot · online booking',
      b1: 'Hi! Which service would you like to book? ✂️',
      svc: 'Haircut + beard',
      b2: 'Great. What time works for you?',
      slot1: 'Today 3:00 PM',
      slot2: 'Today 4:30 PM',
      b3: 'Booked ✅ Sardor will see you at 4:30 PM. We’ll send a reminder.',
      input: 'Message…',
    },
    crmMini: {
      title: 'Today’s schedule',
      live: 'Live',
      a1n: 'Jasur A.',
      a1s: 'Haircut',
      a2n: 'Dilnoza R.',
      a2s: 'Manicure',
      a3n: 'Otabek M.',
      a3s: 'Beard trim',
      today: '18 bookings today',
    },
    social: {
      title: 'Trusted by businesses across Uzbekistan',
      sub: 'Salons, clinics and services in Tashkent, Samarkand, Bukhara and beyond.',
      s1: 'businesses',
      s1l: 'On the platform',
      s2: 'bookings',
      s2l: 'Made every month',
      s3: 'fewer',
      s3l: 'No-shows',
      s4: 'rating',
      s4l: 'Customer score',
    },
    problems: {
      eyebrow: 'Problems we solve',
      title: 'Owners don’t buy CRM. They buy outcomes.',
      sub: 'EasyQ removes the daily headaches — it’s about results, not features.',
      items: [
        { t: 'More bookings', d: 'Customers book themselves around the clock, no calls — even while you sleep.' },
        { t: 'Reduce no-shows', d: 'Automatic reminders cut empty slots and lost revenue.' },
        { t: 'Save admin time', d: 'Manage in a few taps instead of taking calls all day.' },
        { t: 'Increase revenue', d: 'Easy booking, fewer cancellations and more returning clients.' },
        { t: 'Organize staff', d: 'Every specialist sees their own schedule. No confusion.' },
        { t: 'Automate reminders', d: 'Confirmations and reminders go out on Telegram by themselves.' },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'Go live in 30 minutes',
      sub: 'No technical skills needed. A phone is enough.',
      steps: [
        { t: 'Create a business profile', d: 'Name, address and working hours.' },
        { t: 'Add services and staff', d: 'Set prices, duration and team members.' },
        { t: 'Get your Telegram booking page', d: 'A ready link under your own name.' },
        { t: 'Clients book online', d: 'Through Telegram in a few taps.' },
        { t: 'Reminders are sent automatically', d: 'Confirmations and reminders on their own.' },
        { t: 'Manage everything in CRM', d: 'Schedule, customers and reports in one place.' },
      ],
    },
    industries: {
      eyebrow: 'Built for your industry',
      title: 'Made for every service business',
      sub: 'It adapts to your workflow — from barbershop to clinic.',
      list: ['Barbershops', 'Beauty Salons', 'Car Washes', 'Dental Clinics', 'Medical Centers', 'Fitness Clubs', 'Massage Studios', 'Veterinary Clinics'],
      cta: 'Don’t see your industry? EasyQ still fits.',
      dropCap: 'Add a photo',
    },
    tg: {
      eyebrow: 'Telegram-first experience',
      title: 'Your customers are already on Telegram',
      sub: 'No app to download. Clients book in the Telegram they already use, while you manage in the business bot.',
      f1t: 'Client bot',
      f1d: 'Picks a service, a time and gets a confirmation — in one conversation.',
      f2t: 'Business bot',
      f2d: 'New bookings, cancellations and the day’s schedule land on your phone.',
      f3t: 'Booking flow',
      f3d: 'Service → specialist → time → confirmation. Simple and fast.',
      f4t: 'Reminder flow',
      f4d: 'Auto-reminders sharply reduce no-shows.',
    },
    crm: {
      eyebrow: 'CRM dashboard',
      title: 'Everything in one place',
      sub: 'The screenshots aren’t the point — the outcome is. Schedule, staff, services and customers in one window.',
      benefits: [
        { t: 'Live schedule', d: 'Every booking by day, week and specialist.' },
        { t: 'Staff', d: 'Working hours and load for each specialist.' },
        { t: 'Customer base', d: 'History, notes and loyalty in one place.' },
        { t: 'Analytics & reports', d: 'Revenue, occupancy and no-shows at a glance.' },
      ],
      tabs: ['Schedule', 'Staff', 'Services', 'Analytics'],
    },
    stories: {
      eyebrow: 'Real customer stories',
      title: 'The results speak for themselves',
      items: [
        { q: 'We reduced no-shows by 70% and no longer manage bookings through phone calls.', n: 'Madina Yusupova', b: 'Lola Beauty', i: 'Beauty salon · Tashkent' },
        { q: 'We no longer need a front-desk admin. Clients book even late in the evening.', n: 'Bekzod Tursunov', b: 'Royal Barber', i: 'Barbershop · Samarkand' },
        { q: 'Thanks to Telegram reminders, empty slots have almost disappeared.', n: 'Doniyor Saidov', b: 'AutoSpa', i: 'Car wash · Bukhara' },
      ],
    },
    compare: {
      eyebrow: 'EasyQ vs the old way',
      title: 'From chaos to order',
      without: 'Without EasyQ',
      with: 'With EasyQ',
      rows: [
        ['Endless phone calls', 'Online self-booking'],
        ['Paper schedule book', 'Live digital schedule'],
        ['Missed appointments', 'Automatic reminders'],
        ['Reminding by hand', 'Auto-reminders on Telegram'],
        ['No customer history', 'Full CRM database'],
        ['Guesswork accounting', 'Accurate analytics & reports'],
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'A plan that fits your team',
      sub: 'Choose by number of staff and save with longer billing.',
      monthly: '1 month',
      yearly: '12 months',
      save: 'Save up to 30%',
      perMonth: '/ month',
      popular: 'Most popular',
      cta: 'Get started',
      staffLabel: 'Up to {n} staff',
      footnote: 'All plans include the first month free, Telegram booking, CRM, reminders, staff schedule, services, reviews, a business page, a booking link and basic analytics.',
      tiers: [
        { staff: '2', m: '175,000', y: '99,000', note: 'Core EasyQ features', tag: 'For a small team' },
        { staff: '5', m: '299,000', y: '149,000', note: 'Most popular plan', tag: 'Chosen most often' },
        { staff: '8', m: '499,000', y: '249,000', note: 'For growing teams', tag: 'Growing business' },
        { staff: '15', m: '799,000', y: '499,000', note: 'For busy teams and branches', tag: 'Network & branches' },
      ],
    },
    faq: {
      eyebrow: 'Q&A',
      title: 'Frequently asked questions',
      items: [
        { q: 'How does Telegram booking work?', a: 'A customer opens your business bot, picks a service and a convenient time and gets an instant confirmation. The booking lands automatically in your CRM schedule.' },
        { q: 'Do I need an app?', a: 'No. Your customers use the regular Telegram, and you manage in a browser or the business bot. Nothing to install.' },
        { q: 'Can I use my own business name?', a: 'Absolutely. The booking page and bot run under your own brand, logo and name.' },
        { q: 'Can I manage multiple employees?', a: 'Yes. You set a separate schedule, services and working hours for each specialist — unlimited depending on your plan.' },
        { q: 'How much does it cost?', a: 'Plans start at 175,000 UZS per month, with the first month free. You choose by the number of staff.' },
      ],
    },
    finalCta: {
      title: 'Start accepting bookings today',
      sub: 'Launch your booking system in less than 30 minutes.',
      ctaPrimary: 'Start free',
      ctaSecondary: 'Book a demo',
    },
    footer: {
      tagline: 'Online booking and CRM for service businesses in Uzbekistan.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      links: { features: 'Features', pricing: 'Pricing', industries: 'Industries', how: 'How it works', about: 'About', stories: 'Customers', contact: 'Contact', faq: 'FAQ', terms: 'Terms', privacy: 'Privacy Policy' },
      lang: 'Language',
      rights: '© 2026 EasyQ. All rights reserved.',
    },
    about: {
      eyebrow: 'About us',
      title: 'What easyQ does',
      description: 'easyQ helps service businesses accept online bookings through Telegram bots and manage daily operations from a clean CRM dashboard.',
      servicesTitle: 'Services we provide',
      services: [
        'Telegram booking bots for clients and business owners',
        'CRM dashboard for schedules, staff, services, clients, and analytics',
        'Online booking setup for appointment-based service companies',
        'Notifications, reminders, and booking management flows',
      ],
      companyTitle: 'Company details',
      companyDetails: [
        ['Customer', 'LLC “TASHKENBAYEV”'],
        ['Address', 'Tashkent region, Bustonliq district, Mustaqillik street, 46/28'],
        ['Phone', '+998 (97) 753-94-72'],
        ['Email', 'ourdreamjj@gmail.com'],
        ['Settlement account', '2020 8000 3073 9227 7001'],
        ['Bank', 'JSC “NBU”, Bustonliq branch'],
        ['MFO', '00450'],
        ['TIN', '312762723'],
        ['Director', 'Tashkenbayev N.Yu.'],
      ],
    },
  },
} as const;

export type Translation = (typeof translations)['en'];

function applyAccent(theme: Theme) {
  const accent = '#b4d94e';
  const r = document.documentElement;
  const dark = theme === 'dark';
  const pct = dark ? 17 : 20; // "Balanced" intensity
  const tintBase = dark ? '#0F1726' : 'white';
  r.style.setProperty('--accent', accent);
  r.style.setProperty(
    '--accent-deep',
    dark ? `color-mix(in srgb, ${accent} 88%, white)` : `color-mix(in srgb, ${accent} 80%, black)`,
  );
  r.style.setProperty('--accent-tint', `color-mix(in srgb, ${accent} ${pct}%, ${tintBase})`);
  r.style.setProperty('--accent-ring', `color-mix(in srgb, ${accent} 45%, transparent)`);
}

type AppContextValue = {
  lang: Language;
  t: Translation;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === 'uz' || value === 'ru' || value === 'en';
}

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'uz';
  const stored = window.localStorage.getItem(LANG_KEY);
  if (isLanguage(stored)) return stored;
  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('ru')) return 'ru';
  if (browserLanguage.startsWith('en')) return 'en';
  return 'uz';
}

function detectInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage);
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme);

  const setLang = (next: Language) => {
    setLangState(next);
    window.localStorage.setItem(LANG_KEY, next);
  };
  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_KEY, next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    applyAccent(theme);
  }, [theme]);

  const value = useMemo<AppContextValue>(
    () => ({ lang, t: translations[lang] as Translation, setLang, theme, setTheme }),
    [lang, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useLang() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useLang must be used within AppProvider');
  return value;
}

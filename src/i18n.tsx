import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'uz' | 'ru';

export const languageOptions: Array<{ code: Language; label: string; name: string }> = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uz', label: 'UZ', name: 'O‘zbekcha' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

const STORAGE_KEY = 'easyq-language';

const industriesMeta = [
  { icon: '✂️', color: '#2d4a1e' },
  { icon: '💅', color: '#4a1e3c' },
  { icon: '🚗', color: '#1e2e4a' },
  { icon: '🦷', color: '#1e4a3a' },
  { icon: '💆', color: '#3a1e4a' },
  { icon: '💉', color: '#4a2e1e' },
  { icon: '🏋️', color: '#2e4a1e' },
  { icon: '🐾', color: '#1e3a4a' },
];

const featureMeta = [
  { icon: '🤖', tone: 'blue' as const },
  { icon: '📊', tone: 'accent' as const, highlight: true },
  { icon: '🖥️', tone: 'violet' as const },
];

const mobileFeatureIcons = ['🎁', '⭐', '🎨', '📍', '🔔', '📊'];
const botFeatureIcons = ['⚡', '🔔', '📱'];

const nearbyServiceColors = ['#2d4a1e', '#4a1e3c', '#1e2e4a'];

const translations = {
  en: {
    nav: [
      { label: 'Features', href: '#features' },
      { label: 'How it Works', href: '#how' },
      { label: 'Industries', href: '#industries' },
      { label: 'Pricing', href: '#pricing' },
    ],
    header: {
      login: 'Log In',
      tryFree: 'Try Free',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      languageLabel: 'Language',
      primaryNavLabel: 'Primary navigation',
    },
    hero: {
      pill: 'Now available in Uzbekistan',
      titleLine1: 'Smart Booking',
      titleLine2: 'for Every Service',
      leadPrefix: 'Online bookings via ',
      leadStrong: 'Telegram bots',
      leadSuffix: ' + a full CRM — for barbershops, beauty salons, car washes, dentists and more across Uzbekistan.',
      primaryCta: 'Start Free — No Credit Card',
      secondaryCta: 'See how it works',
      note: 'No setup fees · Free 30-day trial · Cancel anytime',
      statsAria: 'easyQ landing page statistics',
      stats: [
        { value: '500+', label: 'businesses onboarded' },
        { value: '99.9%', label: 'uptime' },
        { value: '2 min', label: 'avg. booking time' },
      ],
      badgeTitle: 'New booking via Telegram',
      badgeText: 'Aziz T. → Haircut at 14:00',
    },
    marquee: [
      '✂️ Barbershops',
      '💅 Beauty Salons',
      '🚗 Car Wash',
      '🦷 Dentists',
      '💆 Massage',
      '🏋️ Fitness',
      '💉 Medical',
      '🐾 Vet Clinics',
      '💇 Hair Studios',
      '🧴 Cosmetology',
    ],
    features: {
      eyebrow: 'Everything You Need',
      title: 'Three products. One platform.',
      subtitle: "A complete ecosystem built for Uzbekistan's service industry",
      businessBadge: 'FOR BUSINESS',
      cards: [
        {
          title: 'Client Telegram Bot',
          subtitle: 'Book in 2 minutes',
          description:
            'Clients discover your business, browse services, pick a time slot, and confirm — all without leaving Telegram.',
          features: [
            'Search nearby services',
            'See real-time availability',
            'Instant booking confirmation',
            'Reminder notifications',
            'Reschedule & cancel easily',
          ],
        },
        {
          title: 'Business Telegram Bot',
          subtitle: 'Manage from your phone',
          description:
            'Get notified of new bookings, daily summaries, and manage your schedule — right from Telegram.',
          features: [
            'Instant booking alerts',
            'Daily revenue reports',
            'Confirm / cancel bookings',
            'Staff schedule overview',
            'Client history at a glance',
          ],
        },
        {
          title: 'CRM Dashboard',
          subtitle: 'Full business control',
          description:
            'A powerful web-based CRM to manage staff, services, clients, analytics, and online booking settings.',
          features: [
            'Staff & schedule management',
            'Service catalog',
            'Client database & history',
            'Revenue analytics',
            'Online booking page',
          ],
        },
      ],
    },
    telegram: {
      eyebrow: 'Telegram-First',
      title: 'Your customers are already on Telegram',
      subtitle: 'No app downloads. No friction. Book and manage — all through Telegram.',
      bots: [
        {
          label: 'EasyQueue Client Bot',
          title: 'Client Booking Bot',
          description: 'Clients browse services, pick a master and time slot — all inside Telegram. No calls needed.',
        },
        {
          label: 'EasyQueue Business Bot',
          title: 'Business Management Bot',
          description: 'Manage bookings, staff, finances and your full profile — right from your Telegram.',
        },
      ],
      features: [
        { title: 'Instant Booking', description: 'Clients book in under 2 minutes without calling.' },
        { title: 'Auto Reminders', description: 'Reduce no-shows with automatic Telegram reminders.' },
        { title: 'No App Needed', description: "Uzbekistan's most-used messaging app — already on every phone." },
      ],
    },
    how: {
      eyebrow: 'Simple Setup',
      title: 'Go live in 30 minutes',
      steps: [
        { step: '01', title: 'Create Account', description: 'Sign up and set up your business profile in the CRM.' },
        {
          step: '02',
          title: 'Add Services & Staff',
          description: 'Define your services, prices, and working schedules.',
        },
        {
          step: '03',
          title: 'Get Your Bot',
          description: 'Receive your unique Telegram bot link to share with clients.',
        },
        {
          step: '04',
          title: 'Start Accepting Bookings',
          description: 'Clients book 24/7. You manage from anywhere.',
        },
      ],
    },
    crm: {
      eyebrow: 'CRM Dashboard',
      title: 'Full control of your business',
      description:
        'The easyQ CRM gives you a real-time view of your appointments, revenue, staff, and clients — all in one clean dashboard.',
      features: [
        'Employee calendar with available slots',
        'Client database with visit history',
        'Revenue analytics & reports',
        'Service management & pricing',
        'Online booking page controls',
      ],
      cta: 'Open CRM Demo',
    },
    industries: {
      eyebrow: 'Industries',
      title: 'Built for every service',
      subtitle: 'easyQ works for any appointment-based business in Uzbekistan',
      items: [
        'Barbershops',
        'Beauty Salons',
        'Car Wash',
        'Dentists',
        'Spas & Massage',
        'Medical Clinics',
        'Gyms & Fitness',
        'Vet Clinics',
      ],
    },
    stats: [
      { to: 500, suffix: '+', label: 'Active businesses' },
      { to: 12000, suffix: '+', label: 'Bookings per month' },
      { to: 99, suffix: '%', label: 'Uptime SLA' },
      { to: 2, suffix: ' min', label: 'Average booking time' },
    ],
    comparison: {
      title: 'Why easyQ vs. the old way?',
      subtitle: 'Stop losing clients to phone tag and missed calls',
      withoutTitle: 'Without easyQ',
      withTitle: 'With easyQ ✓',
      without: [
        'Phone calls to book an appointment',
        'Clients forget & no-shows happen',
        'Manual schedule in notebooks/Excel',
        'No visibility into revenue or staff',
        'Clients find competitors elsewhere',
      ],
      with: [
        'Clients book 24/7 via Telegram bot',
        'Auto reminders slash no-shows',
        'Real-time calendar in your CRM',
        'Live analytics & revenue dashboard',
        'Your own booking link, no competitors shown',
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Simple, transparent pricing',
      subtitle: 'Start free. Scale as you grow.',
      badge: 'MOST POPULAR',
      cta: 'Get Started',
      note: 'All prices in Uzbekistani Soum. No hidden fees. Cancel anytime.',
      plans: [
        {
          plan: 'Starter',
          price: 'Free',
          period: '30 days',
          features: [
            '1 staff member',
            'Telegram client bot',
            'Up to 50 bookings/mo',
            'Basic CRM dashboard',
            'Email support',
          ],
        },
        {
          plan: 'Business',
          price: '99,000 UZS',
          period: 'month',
          highlighted: true,
          features: [
            'Up to 5 staff members',
            'Both Telegram bots',
            'Unlimited bookings',
            'Full CRM + analytics',
            'Priority support',
            'Custom booking page',
          ],
        },
        {
          plan: 'Pro',
          price: '199,000 UZS',
          period: 'month',
          features: [
            'Unlimited staff',
            'Both Telegram bots',
            'Unlimited bookings',
            'Advanced analytics',
            'Dedicated support',
            'API access',
            'Multi-location',
          ],
        },
      ],
    },
    testimonials: {
      title: 'Loved by business owners',
      items: [
        {
          name: 'Jasur Karimov',
          business: 'Best Barber, Tashkent',
          text:
            'Our bookings doubled in the first month. Clients love that they can book through Telegram without calling. The CRM is clean and easy to use.',
        },
        {
          name: 'Nilufar Rashidova',
          business: 'Beauty Studio N, Samarkand',
          text:
            'No more missed calls or double bookings. The automated reminders cut our no-shows by 70%. easyQ paid for itself in the first week.',
        },
        {
          name: 'Bobur Tashmatov',
          business: 'CleanCar, Tashkent',
          text:
            'I manage 4 staff from my phone now. The business bot updates me in real time. Setup took less than an hour.',
        },
      ],
    },
    mobile: {
      pill: 'In Development',
      titlePrefix: 'Mobile App — ',
      titleHighlight: 'Coming Soon',
      description:
        "We're building native apps for Android & iOS that unlock even more powerful features for both businesses and clients.",
      features: [
        { title: 'Loyalty Bonuses', description: 'Reward returning clients with points & perks' },
        { title: 'Ratings & Reviews', description: 'Build trust with verified client reviews' },
        { title: 'Personalization', description: 'Tailored recommendations for every client' },
        { title: 'Nearby Discovery', description: 'Find top-rated services around you on a map' },
        { title: 'Push Notifications', description: 'Instant alerts for bookings & special offers' },
        { title: 'Advanced Analytics', description: 'Deep insights for business owners' },
      ],
      stores: [
        { label: 'App Store', sub: 'Download on the', icon: '🍎' },
        { label: 'Google Play', sub: 'Get it on', icon: '▶' },
      ],
      soon: 'SOON',
      phone: {
        nearby: 'Nearby Services',
        bookNow: 'Book Now',
        bonusTitle: 'My Bonuses',
        points: 'points',
        nextReward: 'Next reward at 1,500 pts',
        services: [
          { name: 'Best Barber', category: 'Barbershop', rating: '4.9', distance: '0.3km' },
          { name: 'Glam Studio', category: 'Beauty Salon', rating: '4.8', distance: '0.7km' },
          { name: 'SpeedWash', category: 'Car Wash', rating: '4.7', distance: '1.2km' },
        ],
        bonuses: [
          { label: 'Haircut', points: '+120', date: 'Apr 24' },
          { label: 'Beard Trim', points: '+80', date: 'Apr 18' },
          { label: 'Redeemed', points: '-200', date: 'Apr 10' },
        ],
      },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions before you start?',
      subtitle: 'Short answers for service teams planning to launch easyQ.',
      items: [
        {
          question: 'Do clients need to download another app?',
          answer:
            'No. Booking happens inside Telegram, so clients can choose a service, master, and time slot without installing anything new.',
        },
        {
          question: 'Can my staff manage bookings from their phones?',
          answer:
            'Yes. The business Telegram bot sends new booking alerts, daily summaries, and quick actions for appointment management.',
        },
        {
          question: 'Is the CRM included?',
          answer:
            'Yes. The CRM dashboard is part of the platform and includes staff schedules, services, clients, revenue analytics, and booking settings.',
        },
        {
          question: 'How fast can a business go live?',
          answer: 'Most businesses can configure services, staff, schedules, and their Telegram booking flow in about 30 minutes.',
        },
        {
          question: 'Is this built for Uzbekistan?',
          answer:
            'Yes. The product positioning, Telegram-first flow, Uzbekistani Soum pricing, and service categories are tailored for local businesses.',
        },
      ],
    },
    finalCta: {
      title: 'Ready to grow your business?',
      description:
        'Join 500+ service businesses in Uzbekistan already using easyQ. Start your free 14-day trial today.',
      primary: 'Start Free Trial',
      secondary: 'Try on Telegram',
      note: 'No credit card required · Setup in 30 minutes · Cancel anytime',
    },
    footer: {
      description: 'Smart booking and CRM platform for service businesses in Uzbekistan.',
      columns: [
        { title: 'Product', links: ['Features', 'CRM Dashboard', 'Telegram Bots', 'Pricing', 'Demo'] },
        { title: 'Industries', links: ['Barbershops', 'Beauty Salons', 'Car Wash', 'Dentists', 'More'] },
        { title: 'Company', links: ['About', 'Blog', 'Contact', 'Privacy', 'Terms'] },
      ],
      copyright: '© 2026 easyQ. All rights reserved.',
      made: 'Made with care in Tashkent, Uzbekistan 🇺🇿',
    },
  },
  uz: {
    nav: [
      { label: 'Imkoniyatlar', href: '#features' },
      { label: 'Qanday ishlaydi', href: '#how' },
      { label: 'Sohalar', href: '#industries' },
      { label: 'Narxlar', href: '#pricing' },
    ],
    header: {
      login: 'Kirish',
      tryFree: 'Bepul sinash',
      openMenu: 'Menyuni ochish',
      closeMenu: 'Menyuni yopish',
      languageLabel: 'Til',
      primaryNavLabel: 'Asosiy navigatsiya',
    },
    hero: {
      pill: 'Endi O‘zbekistonda mavjud',
      titleLine1: 'Aqlli bron',
      titleLine2: 'har qanday xizmat uchun',
      leadPrefix: 'Telegram botlar orqali ',
      leadStrong: 'onlayn bron',
      leadSuffix:
        ' va to‘liq CRM — sartaroshxona, go‘zallik saloni, avtomoyka, stomatologiya va boshqa xizmat bizneslari uchun.',
      primaryCta: 'Bepul boshlash — karta kerak emas',
      secondaryCta: 'Qanday ishlashini ko‘rish',
      note: 'Ulanish bepul · 30 kunlik bepul sinov · Istalgan payt bekor qiling',
      statsAria: 'easyQ landing sahifasi ko‘rsatkichlari',
      stats: [
        { value: '500+', label: 'ulangan biznes' },
        { value: '99.9%', label: 'barqaror ishlash' },
        { value: '2 daq', label: 'o‘rtacha bron vaqti' },
      ],
      badgeTitle: 'Telegram orqali yangi bron',
      badgeText: 'Aziz T. → Soch olish 14:00',
    },
    marquee: [
      '✂️ Sartaroshxonalar',
      '💅 Go‘zallik salonlari',
      '🚗 Avtomoykalar',
      '🦷 Stomatologlar',
      '💆 Massaj',
      '🏋️ Fitness',
      '💉 Tibbiyot',
      '🐾 Veterinariya',
      '💇 Hair studiyalar',
      '🧴 Kosmetologiya',
    ],
    features: {
      eyebrow: 'Kerakli hammasi',
      title: 'Uch mahsulot. Bitta platforma.',
      subtitle: 'O‘zbekiston xizmat bizneslari uchun to‘liq ekotizim',
      businessBadge: 'BIZNES UCHUN',
      cards: [
        {
          title: 'Mijozlar uchun Telegram bot',
          subtitle: '2 daqiqada bron',
          description: 'Mijozlar biznesingizni topadi, xizmatlarni ko‘radi, vaqt tanlaydi va Telegramdan chiqmasdan bron qiladi.',
          features: [
            'Yaqindagi xizmatlarni qidirish',
            'Bo‘sh vaqtlarni real vaqtda ko‘rish',
            'Darhol bron tasdiqlovi',
            'Avtomatik eslatmalar',
            'Oson ko‘chirish va bekor qilish',
          ],
        },
        {
          title: 'Biznes uchun Telegram bot',
          subtitle: 'Telefondan boshqaring',
          description: 'Yangi bronlar, kunlik hisobotlar va jadval boshqaruvi — hammasi Telegram ichida.',
          features: [
            'Darhol bron xabarlari',
            'Kunlik daromad hisobotlari',
            'Bronni tasdiqlash / bekor qilish',
            'Xodimlar jadvali ko‘rinishi',
            'Mijoz tarixi bir qarashda',
          ],
        },
        {
          title: 'CRM panel',
          subtitle: 'To‘liq biznes nazorati',
          description: 'Xodimlar, xizmatlar, mijozlar, analitika va onlayn bron sozlamalarini boshqarish uchun kuchli web CRM.',
          features: [
            'Xodimlar va jadval boshqaruvi',
            'Xizmatlar katalogi',
            'Mijozlar bazasi va tarixi',
            'Daromad analitikasi',
            'Onlayn bron sahifasi',
          ],
        },
      ],
    },
    telegram: {
      eyebrow: 'Telegram asosida',
      title: 'Mijozlaringiz allaqachon Telegramda',
      subtitle: 'Ilova yuklash shart emas. Ortiqcha qadam yo‘q. Bron va boshqaruv — Telegram ichida.',
      bots: [
        {
          label: 'EasyQueue mijozlar boti',
          title: 'Mijoz bron boti',
          description: 'Mijozlar xizmat, usta va vaqtni Telegram ichida tanlaydi. Qo‘ng‘iroq kerak emas.',
        },
        {
          label: 'EasyQueue biznes boti',
          title: 'Biznes boshqaruv boti',
          description: 'Bronlar, xodimlar, moliya va profilingizni Telegram orqali boshqaring.',
        },
      ],
      features: [
        { title: 'Tez bron', description: 'Mijozlar qo‘ng‘iroqsiz 2 daqiqadan kam vaqtda bron qiladi.' },
        { title: 'Avto eslatmalar', description: 'Telegram eslatmalari kelmaslik holatlarini kamaytiradi.' },
        { title: 'Ilova shart emas', description: 'O‘zbekistonda eng ko‘p ishlatiladigan messenjer — har telefonda bor.' },
      ],
    },
    how: {
      eyebrow: 'Oddiy sozlash',
      title: '30 daqiqada ishga tushiring',
      steps: [
        { step: '01', title: 'Akkaunt yarating', description: 'CRMda biznes profilingizni yarating va sozlang.' },
        { step: '02', title: 'Xizmat va xodimlarni qo‘shing', description: 'Xizmatlar, narxlar va ish jadvallarini belgilang.' },
        { step: '03', title: 'Bot havolasini oling', description: 'Mijozlarga ulashish uchun Telegram bot havolasini oling.' },
        { step: '04', title: 'Bronlarni qabul qiling', description: 'Mijozlar 24/7 bron qiladi. Siz istalgan joydan boshqarasiz.' },
      ],
    },
    crm: {
      eyebrow: 'CRM panel',
      title: 'Biznesingiz to‘liq nazoratda',
      description:
        'easyQ CRM bronlar, daromad, xodimlar va mijozlarni real vaqtda bitta toza panelda ko‘rsatadi.',
      features: [
        'Bo‘sh vaqtlar bilan xodimlar kalendari',
        'Tashrif tarixi bilan mijozlar bazasi',
        'Daromad analitikasi va hisobotlar',
        'Xizmatlar va narxlarni boshqarish',
        'Onlayn bron sahifasi sozlamalari',
      ],
      cta: 'CRM demoni ochish',
    },
    industries: {
      eyebrow: 'Sohalar',
      title: 'Har qanday xizmat uchun',
      subtitle: 'easyQ O‘zbekistondagi har qanday bron asosidagi biznesga mos',
      items: [
        'Sartaroshxonalar',
        'Go‘zallik salonlari',
        'Avtomoykalar',
        'Stomatologlar',
        'Spa va massaj',
        'Tibbiy klinikalar',
        'Sport zallari',
        'Veterinariya klinikalari',
      ],
    },
    stats: [
      { to: 500, suffix: '+', label: 'Faol bizneslar' },
      { to: 12000, suffix: '+', label: 'Oyiga bronlar' },
      { to: 99, suffix: '%', label: 'Uptime SLA' },
      { to: 2, suffix: ' daq', label: 'O‘rtacha bron vaqti' },
    ],
    comparison: {
      title: 'Nega easyQ eski usuldan yaxshiroq?',
      subtitle: 'Qo‘ng‘iroqlar va o‘tkazib yuborilgan mijozlardan voz keching',
      withoutTitle: 'easyQsiz',
      withTitle: 'easyQ bilan ✓',
      without: [
        'Bron qilish uchun telefon qo‘ng‘iroqlari',
        'Mijozlar unutadi va kelmay qoladi',
        'Daftar yoki Excelda qo‘lda jadval',
        'Daromad va xodimlar bo‘yicha ko‘rinish yo‘q',
        'Mijozlar raqobatchilarga ketadi',
      ],
      with: [
        'Mijozlar Telegram bot orqali 24/7 bron qiladi',
        'Avto eslatmalar kelmaslikni kamaytiradi',
        'CRMda real vaqt kalendari',
        'Jonli analitika va daromad paneli',
        'O‘z bron havolangiz, raqobatchilar ko‘rsatilmaydi',
      ],
    },
    pricing: {
      eyebrow: 'Narxlar',
      title: 'Oddiy va shaffof narxlar',
      subtitle: 'Bepul boshlang. O‘sishingiz bilan kengaytiring.',
      badge: 'ENG MASHHUR',
      cta: 'Boshlash',
      note: 'Barcha narxlar O‘zbekiston so‘mida. Yashirin to‘lovlar yo‘q. Istalgan payt bekor qiling.',
      plans: [
        {
          plan: 'Starter',
          price: 'Bepul',
          period: '30 kun',
          features: ['1 xodim', 'Mijoz Telegram boti', 'Oyiga 50 tagacha bron', 'Oddiy CRM panel', 'Email yordam'],
        },
        {
          plan: 'Business',
          price: '99 000 UZS',
          period: 'oy',
          highlighted: true,
          features: [
            '5 tagacha xodim',
            'Ikkala Telegram bot',
            'Cheksiz bronlar',
            'To‘liq CRM + analitika',
            'Ustuvor yordam',
            'Maxsus bron sahifasi',
          ],
        },
        {
          plan: 'Pro',
          price: '199 000 UZS',
          period: 'oy',
          features: [
            'Cheksiz xodimlar',
            'Ikkala Telegram bot',
            'Cheksiz bronlar',
            'Kengaytirilgan analitika',
            'Alohida yordam',
            'API kirish',
            'Ko‘p filial',
          ],
        },
      ],
    },
    testimonials: {
      title: 'Biznes egalari yaxshi ko‘radi',
      items: [
        {
          name: 'Jasur Karimov',
          business: 'Best Barber, Toshkent',
          text:
            'Birinchi oydayoq bronlarimiz ikki baravar oshdi. Mijozlar qo‘ng‘iroqsiz Telegram orqali bron qilishni yoqtirishdi. CRM juda qulay.',
        },
        {
          name: 'Nilufar Rashidova',
          business: 'Beauty Studio N, Samarqand',
          text:
            'Endi o‘tkazib yuborilgan qo‘ng‘iroqlar va ikki marta bron qilish yo‘q. Avto eslatmalar kelmaslikni 70% ga kamaytirdi.',
        },
        {
          name: 'Bobur Tashmatov',
          business: 'CleanCar, Toshkent',
          text:
            'Hozir 4 nafar xodimni telefondan boshqaraman. Biznes bot real vaqtda yangilik beradi. Sozlash bir soatdan kam vaqt oldi.',
        },
      ],
    },
    mobile: {
      pill: 'Ishlab chiqilmoqda',
      titlePrefix: 'Mobil ilova — ',
      titleHighlight: 'tez kunda',
      description:
        'Android va iOS uchun bizneslar va mijozlarga yanada kuchli imkoniyatlar beradigan native ilovalar yaratmoqdamiz.',
      features: [
        { title: 'Sodiqlik bonuslari', description: 'Qaytgan mijozlarga ball va sovg‘alar bering' },
        { title: 'Reyting va izohlar', description: 'Tasdiqlangan sharhlar bilan ishonch yarating' },
        { title: 'Shaxsiylashtirish', description: 'Har mijoz uchun mos tavsiyalar' },
        { title: 'Yaqindagini topish', description: 'Xaritada yaqin xizmatlarni topish' },
        { title: 'Push xabarlar', description: 'Bron va aksiyalar haqida tezkor xabarlar' },
        { title: 'Keng analitika', description: 'Biznes egalari uchun chuqur ko‘rsatkichlar' },
      ],
      stores: [
        { label: 'App Store', sub: 'Yuklab olish', icon: '🍎' },
        { label: 'Google Play', sub: 'Yuklab olish', icon: '▶' },
      ],
      soon: 'TEZ KUNDA',
      phone: {
        nearby: 'Yaqin xizmatlar',
        bookNow: 'Bron qilish',
        bonusTitle: 'Bonuslarim',
        points: 'ball',
        nextReward: 'Keyingi sovg‘a 1 500 ballda',
        services: [
          { name: 'Best Barber', category: 'Sartaroshxona', rating: '4.9', distance: '0.3km' },
          { name: 'Glam Studio', category: 'Go‘zallik saloni', rating: '4.8', distance: '0.7km' },
          { name: 'SpeedWash', category: 'Avtomoyka', rating: '4.7', distance: '1.2km' },
        ],
        bonuses: [
          { label: 'Soch olish', points: '+120', date: '24 Apr' },
          { label: 'Soqol tartiblash', points: '+80', date: '18 Apr' },
          { label: 'Ishlatildi', points: '-200', date: '10 Apr' },
        ],
      },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Boshlashdan oldin savollar bormi?',
      subtitle: 'easyQ ishga tushirmoqchi bo‘lgan xizmat jamoalari uchun qisqa javoblar.',
      items: [
        {
          question: 'Mijozlar boshqa ilova yuklashi kerakmi?',
          answer: 'Yo‘q. Bron Telegram ichida bo‘ladi, mijoz xizmat, usta va vaqtni yangi ilovasiz tanlaydi.',
        },
        {
          question: 'Xodimlar bronlarni telefondan boshqara oladimi?',
          answer: 'Ha. Biznes bot yangi bronlar, kunlik hisobotlar va tezkor boshqaruv tugmalarini yuboradi.',
        },
        {
          question: 'CRM ham kiritilganmi?',
          answer: 'Ha. CRM panelga xodim jadvali, xizmatlar, mijozlar, daromad analitikasi va bron sozlamalari kiradi.',
        },
        {
          question: 'Biznes qanchalik tez ishga tushadi?',
          answer: 'Ko‘p bizneslar xizmat, xodim, jadval va Telegram bron oqimini taxminan 30 daqiqada sozlaydi.',
        },
        {
          question: 'Bu O‘zbekiston uchunmi?',
          answer: 'Ha. Telegram-first oqim, so‘mdagi narxlar va xizmat kategoriyalari mahalliy bizneslarga moslangan.',
        },
      ],
    },
    finalCta: {
      title: 'Biznesingizni o‘stirishga tayyormisiz?',
      description: 'O‘zbekistonda easyQ ishlatayotgan 500+ xizmat biznesiga qo‘shiling. 14 kunlik bepul sinovni boshlang.',
      primary: 'Bepul sinovni boshlash',
      secondary: 'Telegramda sinash',
      note: 'Karta kerak emas · 30 daqiqada sozlash · Istalgan payt bekor qilish',
    },
    footer: {
      description: 'O‘zbekistondagi xizmat bizneslari uchun aqlli bron va CRM platformasi.',
      columns: [
        { title: 'Mahsulot', links: ['Imkoniyatlar', 'CRM panel', 'Telegram botlar', 'Narxlar', 'Demo'] },
        { title: 'Sohalar', links: ['Sartaroshxona', 'Go‘zallik saloni', 'Avtomoyka', 'Stomatologiya', 'Boshqa'] },
        { title: 'Kompaniya', links: ['Biz haqimizda', 'Blog', 'Aloqa', 'Maxfiylik', 'Shartlar'] },
      ],
      copyright: '© 2026 easyQ. Barcha huquqlar himoyalangan.',
      made: 'Toshkent, O‘zbekistonda mehr bilan yaratildi 🇺🇿',
    },
  },
  ru: {
    nav: [
      { label: 'Возможности', href: '#features' },
      { label: 'Как работает', href: '#how' },
      { label: 'Сферы', href: '#industries' },
      { label: 'Цены', href: '#pricing' },
    ],
    header: {
      login: 'Войти',
      tryFree: 'Попробовать',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      languageLabel: 'Язык',
      primaryNavLabel: 'Основная навигация',
    },
    hero: {
      pill: 'Уже доступно в Узбекистане',
      titleLine1: 'Умная запись',
      titleLine2: 'для любого сервиса',
      leadPrefix: 'Онлайн-запись через ',
      leadStrong: 'Telegram-ботов',
      leadSuffix: ' + полноценная CRM — для барбершопов, салонов красоты, автомоек, стоматологий и других сервисов.',
      primaryCta: 'Начать бесплатно — без карты',
      secondaryCta: 'Посмотреть как работает',
      note: 'Без платы за подключение · 30 дней бесплатно · Отмена в любой момент',
      statsAria: 'Статистика лендинга easyQ',
      stats: [
        { value: '500+', label: 'подключенных бизнесов' },
        { value: '99.9%', label: 'доступность' },
        { value: '2 мин', label: 'среднее время записи' },
      ],
      badgeTitle: 'Новая запись через Telegram',
      badgeText: 'Aziz T. → Стрижка в 14:00',
    },
    marquee: [
      '✂️ Барбершопы',
      '💅 Салоны красоты',
      '🚗 Автомойки',
      '🦷 Стоматологии',
      '💆 Массаж',
      '🏋️ Фитнес',
      '💉 Медицина',
      '🐾 Ветклиники',
      '💇 Hair-студии',
      '🧴 Косметология',
    ],
    features: {
      eyebrow: 'Все что нужно',
      title: 'Три продукта. Одна платформа.',
      subtitle: 'Полная экосистема для сервисного бизнеса в Узбекистане',
      businessBadge: 'ДЛЯ БИЗНЕСА',
      cards: [
        {
          title: 'Telegram-бот для клиентов',
          subtitle: 'Запись за 2 минуты',
          description: 'Клиенты находят бизнес, выбирают услугу, слот и подтверждают запись, не выходя из Telegram.',
          features: [
            'Поиск ближайших услуг',
            'Актуальные свободные слоты',
            'Мгновенное подтверждение',
            'Автоматические напоминания',
            'Легкий перенос и отмена',
          ],
        },
        {
          title: 'Telegram-бот для бизнеса',
          subtitle: 'Управление с телефона',
          description: 'Уведомления о новых записях, ежедневные отчеты и управление расписанием прямо в Telegram.',
          features: [
            'Мгновенные уведомления о записях',
            'Ежедневные отчеты по выручке',
            'Подтверждение / отмена записей',
            'Обзор расписания сотрудников',
            'История клиента под рукой',
          ],
        },
        {
          title: 'CRM-панель',
          subtitle: 'Полный контроль бизнеса',
          description: 'Мощная web CRM для управления сотрудниками, услугами, клиентами, аналитикой и онлайн-записью.',
          features: [
            'Управление сотрудниками и расписанием',
            'Каталог услуг',
            'База клиентов и история',
            'Аналитика выручки',
            'Страница онлайн-записи',
          ],
        },
      ],
    },
    telegram: {
      eyebrow: 'Telegram-first',
      title: 'Ваши клиенты уже в Telegram',
      subtitle: 'Без установки приложения. Без лишних шагов. Запись и управление — внутри Telegram.',
      bots: [
        {
          label: 'EasyQueue Client Bot',
          title: 'Бот записи для клиентов',
          description: 'Клиенты выбирают услугу, мастера и время прямо в Telegram. Звонки больше не нужны.',
        },
        {
          label: 'EasyQueue Business Bot',
          title: 'Бот управления бизнесом',
          description: 'Управляйте записями, сотрудниками, финансами и профилем прямо из Telegram.',
        },
      ],
      features: [
        { title: 'Мгновенная запись', description: 'Клиенты записываются меньше чем за 2 минуты без звонка.' },
        { title: 'Автонапоминания', description: 'Автоматические Telegram-напоминания снижают неявки.' },
        { title: 'Без приложения', description: 'Самый привычный мессенджер в Узбекистане уже есть на телефоне.' },
      ],
    },
    how: {
      eyebrow: 'Простая настройка',
      title: 'Запуститесь за 30 минут',
      steps: [
        { step: '01', title: 'Создайте аккаунт', description: 'Зарегистрируйтесь и настройте профиль бизнеса в CRM.' },
        { step: '02', title: 'Добавьте услуги и сотрудников', description: 'Укажите услуги, цены и рабочие графики.' },
        { step: '03', title: 'Получите бота', description: 'Получите ссылку на Telegram-бота и поделитесь ей с клиентами.' },
        { step: '04', title: 'Принимайте записи', description: 'Клиенты записываются 24/7, а вы управляете из любого места.' },
      ],
    },
    crm: {
      eyebrow: 'CRM-панель',
      title: 'Полный контроль бизнеса',
      description:
        'CRM easyQ показывает записи, выручку, сотрудников и клиентов в реальном времени в одной понятной панели.',
      features: [
        'Календарь сотрудников со свободными слотами',
        'База клиентов с историей визитов',
        'Аналитика выручки и отчеты',
        'Управление услугами и ценами',
        'Настройки страницы онлайн-записи',
      ],
      cta: 'Открыть демо CRM',
    },
    industries: {
      eyebrow: 'Сферы',
      title: 'Для любого сервиса',
      subtitle: 'easyQ подходит любому бизнесу с записью в Узбекистане',
      items: [
        'Барбершопы',
        'Салоны красоты',
        'Автомойки',
        'Стоматологии',
        'SPA и массаж',
        'Медицинские клиники',
        'Фитнес-клубы',
        'Ветклиники',
      ],
    },
    stats: [
      { to: 500, suffix: '+', label: 'Активных бизнесов' },
      { to: 12000, suffix: '+', label: 'Записей в месяц' },
      { to: 99, suffix: '%', label: 'Uptime SLA' },
      { to: 2, suffix: ' мин', label: 'Среднее время записи' },
    ],
    comparison: {
      title: 'Почему easyQ лучше старого подхода?',
      subtitle: 'Хватит терять клиентов из-за звонков и пропущенных сообщений',
      withoutTitle: 'Без easyQ',
      withTitle: 'С easyQ ✓',
      without: [
        'Звонки для записи на услугу',
        'Клиенты забывают и не приходят',
        'Расписание вручную в тетради или Excel',
        'Нет видимости по выручке и сотрудникам',
        'Клиенты уходят к конкурентам',
      ],
      with: [
        'Клиенты записываются 24/7 через Telegram-бота',
        'Автонапоминания уменьшают неявки',
        'Календарь в CRM в реальном времени',
        'Живая аналитика и панель выручки',
        'Своя ссылка на запись без конкурентов',
      ],
    },
    pricing: {
      eyebrow: 'Цены',
      title: 'Простые и прозрачные тарифы',
      subtitle: 'Начните бесплатно. Масштабируйтесь по мере роста.',
      badge: 'ПОПУЛЯРНЫЙ',
      cta: 'Начать',
      note: 'Все цены в узбекских сумах. Без скрытых платежей. Отмена в любой момент.',
      plans: [
        {
          plan: 'Starter',
          price: 'Бесплатно',
          period: '30 дней',
          features: ['1 сотрудник', 'Telegram-бот для клиентов', 'До 50 записей/мес', 'Базовая CRM', 'Поддержка по email'],
        },
        {
          plan: 'Business',
          price: '99 000 UZS',
          period: 'месяц',
          highlighted: true,
          features: [
            'До 5 сотрудников',
            'Оба Telegram-бота',
            'Неограниченные записи',
            'Полная CRM + аналитика',
            'Приоритетная поддержка',
            'Своя страница записи',
          ],
        },
        {
          plan: 'Pro',
          price: '199 000 UZS',
          period: 'месяц',
          features: [
            'Неограниченно сотрудников',
            'Оба Telegram-бота',
            'Неограниченные записи',
            'Продвинутая аналитика',
            'Выделенная поддержка',
            'Доступ к API',
            'Несколько филиалов',
          ],
        },
      ],
    },
    testimonials: {
      title: 'Нас любят владельцы бизнеса',
      items: [
        {
          name: 'Jasur Karimov',
          business: 'Best Barber, Ташкент',
          text:
            'За первый месяц записей стало в два раза больше. Клиентам нравится записываться через Telegram без звонков. CRM чистая и понятная.',
        },
        {
          name: 'Nilufar Rashidova',
          business: 'Beauty Studio N, Самарканд',
          text:
            'Больше нет пропущенных звонков и двойных записей. Автоматические напоминания сократили неявки на 70%.',
        },
        {
          name: 'Bobur Tashmatov',
          business: 'CleanCar, Ташкент',
          text:
            'Теперь управляю 4 сотрудниками с телефона. Бизнес-бот присылает обновления в реальном времени. Настройка заняла меньше часа.',
        },
      ],
    },
    mobile: {
      pill: 'В разработке',
      titlePrefix: 'Мобильное приложение — ',
      titleHighlight: 'скоро',
      description:
        'Мы создаем native-приложения для Android и iOS, которые откроют еще больше возможностей для бизнеса и клиентов.',
      features: [
        { title: 'Бонусы лояльности', description: 'Награждайте постоянных клиентов баллами и привилегиями' },
        { title: 'Рейтинги и отзывы', description: 'Стройте доверие на проверенных отзывах' },
        { title: 'Персонализация', description: 'Рекомендации под каждого клиента' },
        { title: 'Поиск рядом', description: 'Лучшие сервисы поблизости на карте' },
        { title: 'Push-уведомления', description: 'Мгновенные уведомления о записях и акциях' },
        { title: 'Расширенная аналитика', description: 'Глубокие инсайты для владельцев бизнеса' },
      ],
      stores: [
        { label: 'App Store', sub: 'Загрузите в', icon: '🍎' },
        { label: 'Google Play', sub: 'Доступно в', icon: '▶' },
      ],
      soon: 'СКОРО',
      phone: {
        nearby: 'Сервисы рядом',
        bookNow: 'Записаться',
        bonusTitle: 'Мои бонусы',
        points: 'баллов',
        nextReward: 'Следующая награда на 1 500 баллах',
        services: [
          { name: 'Best Barber', category: 'Барбершоп', rating: '4.9', distance: '0.3km' },
          { name: 'Glam Studio', category: 'Салон красоты', rating: '4.8', distance: '0.7km' },
          { name: 'SpeedWash', category: 'Автомойка', rating: '4.7', distance: '1.2km' },
        ],
        bonuses: [
          { label: 'Стрижка', points: '+120', date: '24 Apr' },
          { label: 'Борода', points: '+80', date: '18 Apr' },
          { label: 'Списано', points: '-200', date: '10 Apr' },
        ],
      },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Есть вопросы перед стартом?',
      subtitle: 'Короткие ответы для сервисных команд, которые планируют запустить easyQ.',
      items: [
        {
          question: 'Клиентам нужно скачивать другое приложение?',
          answer: 'Нет. Запись проходит внутри Telegram: клиент выбирает услугу, мастера и время без новой установки.',
        },
        {
          question: 'Сотрудники могут управлять записями с телефона?',
          answer: 'Да. Бизнес-бот отправляет новые записи, ежедневные сводки и быстрые действия для управления.',
        },
        {
          question: 'CRM входит в платформу?',
          answer: 'Да. В CRM есть расписание сотрудников, услуги, клиенты, аналитика выручки и настройки записи.',
        },
        {
          question: 'Как быстро можно запуститься?',
          answer: 'Большинство бизнесов настраивают услуги, сотрудников, расписание и Telegram-запись примерно за 30 минут.',
        },
        {
          question: 'Это сделано для Узбекистана?',
          answer: 'Да. Telegram-first сценарий, цены в сумах и категории услуг адаптированы под местный бизнес.',
        },
      ],
    },
    finalCta: {
      title: 'Готовы развивать бизнес?',
      description: 'Присоединяйтесь к 500+ сервисным бизнесам в Узбекистане, которые уже используют easyQ.',
      primary: 'Начать бесплатно',
      secondary: 'Попробовать в Telegram',
      note: 'Без карты · Настройка за 30 минут · Отмена в любой момент',
    },
    footer: {
      description: 'Платформа умной записи и CRM для сервисного бизнеса в Узбекистане.',
      columns: [
        { title: 'Продукт', links: ['Возможности', 'CRM-панель', 'Telegram-боты', 'Цены', 'Демо'] },
        { title: 'Сферы', links: ['Барбершопы', 'Салоны красоты', 'Автомойки', 'Стоматологии', 'Еще'] },
        { title: 'Компания', links: ['О нас', 'Блог', 'Контакты', 'Приватность', 'Условия'] },
      ],
      copyright: '© 2026 easyQ. Все права защищены.',
      made: 'Сделано с заботой в Ташкенте, Узбекистан 🇺🇿',
    },
  },
} as const;

export type Translation = (typeof translations)['en'];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'uz' || value === 'ru';
}

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) return stored;

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('uz')) return 'uz';
  if (browserLanguage.startsWith('ru')) return 'ru';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language] as Translation,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}

export function getTranslatedIndustries(t: Translation) {
  return t.industries.items.map((name, index) => ({
    ...industriesMeta[index],
    name,
  }));
}

export function getTranslatedFeatures(t: Translation) {
  return t.features.cards.map((card, index) => ({
    ...featureMeta[index],
    ...card,
  }));
}

export function getTranslatedBotFeatures(t: Translation) {
  return t.telegram.features.map((feature, index) => ({
    icon: botFeatureIcons[index],
    ...feature,
  }));
}

export function getTranslatedMobileFeatures(t: Translation) {
  return t.mobile.features.map((feature, index) => ({
    icon: mobileFeatureIcons[index],
    ...feature,
  }));
}

export function getTranslatedNearbyServices(t: Translation) {
  return t.mobile.phone.services.map((service, index) => ({
    color: nearbyServiceColors[index],
    ...service,
  }));
}

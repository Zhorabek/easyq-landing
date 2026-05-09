import { useEffect, useState } from 'react';
import { AboutUs } from './components/AboutUs';
import { BotScreenshots } from './components/BotScreenshots';
import { Comparison } from './components/Comparison';
import { ContactPanel } from './components/ContactPanel';
import { CRMShowcase } from './components/CRMShowcase';
import { FAQ } from './components/FAQ';
import { Features } from './components/Features';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Industries } from './components/Industries';
import { Marquee } from './components/Marquee';
import { MobileAppTeaser } from './components/MobileAppTeaser';
import { Payments } from './components/Payments';
import { Pricing } from './components/Pricing';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { LanguageProvider, useLanguage } from './i18n';

function useCurrentPath() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return path;
}

function LandingPage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `easyQ — ${t.hero.titleLine1}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.hero.leadPrefix + t.hero.leadStrong + t.hero.leadSuffix;
  }, [language, t]);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <BotScreenshots />
        <HowItWorks />
        <CRMShowcase />
        <Industries />
        <Stats />
        <Comparison />
        <Payments />
        <Pricing />
        <Testimonials />
        <MobileAppTeaser />
        <FAQ />
        <ContactPanel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `easyQ — ${t.about.eyebrow}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.about.description;
  }, [language, t]);

  return (
    <>
      <Header />
      <main className="page-main">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const path = useCurrentPath();

  if (path === '/about' || path === '/about/') {
    return <AboutPage />;
  }

  return <LandingPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}

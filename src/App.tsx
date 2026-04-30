import { useEffect } from 'react';
import { BotScreenshots } from './components/BotScreenshots';
import { Comparison } from './components/Comparison';
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
import { Pricing } from './components/Pricing';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { LanguageProvider, useLanguage } from './i18n';

function LandingPage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `easyQ — ${t.hero.titleLine1}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.hero.leadPrefix + t.hero.leadStrong + t.hero.leadSuffix;
  }, [language, t]);

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
        <Pricing />
        <Testimonials />
        <MobileAppTeaser />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}

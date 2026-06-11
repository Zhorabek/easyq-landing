import { useEffect, useState } from 'react';
import { AppProvider, useLang } from './i18n';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Problems } from './components/Problems';
import { HowItWorks } from './components/HowItWorks';
import { Industries } from './components/Industries';
import { TelegramSection } from './components/TelegramSection';
import { CrmSection } from './components/CrmSection';
import { Stories } from './components/Stories';
import { Comparison } from './components/Comparison';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AboutUs } from './components/AboutUs';
import { Signup } from './components/Signup';

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
  const { lang, t } = useLang();

  useEffect(() => {
    document.title = `EasyQ — ${t.hero.title1}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.hero.sub;
  }, [lang, t]);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Problems />
        <HowItWorks />
        <Industries />
        <TelegramSection />
        <CrmSection />
        <Stories />
        <Comparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  const { lang, t } = useLang();

  useEffect(() => {
    document.title = `EasyQ — ${t.about.eyebrow}`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.about.description;
  }, [lang, t]);

  return (
    <>
      <Nav />
      <main>
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
  if (path === '/signup' || path === '/signup/') {
    return <Signup />;
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

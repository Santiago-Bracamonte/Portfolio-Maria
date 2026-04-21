import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const lenisRef = useRef<Lenis | null>(null);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed Navigation */}
      <Navigation lang={lang} onLangToggle={toggleLang} />

      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
        <Footer />
      </div>
    </div>
  );
}

import { useCallback, useState } from 'react';

interface NavigationProps {
  lang: 'es' | 'en';
  onLangToggle: () => void;
}

export default function Navigation({ lang, onLangToggle }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="site-nav" style={{ position: 'fixed', top: 'clamp(10px, 1.8vh, 16px)', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'min(1500px, calc(100vw - 8vw))', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div className="nav-scrapbook" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(8px, 1.4vw, 20px)', width: '100%', borderRadius: '22px', padding: '10px clamp(10px, 1.5vw, 18px)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', pointerEvents: 'auto' }}>
        
        {/* Brooch */}
        <img src="/images/brooch.png" alt="" aria-hidden="true" className="nav-brooch" style={{ position: 'absolute', width: 'clamp(22px, 2.5vw, 32px)', top: '-10px', right: 'clamp(60px, 9vw, 110px)', transform: 'rotate(-20deg)', filter: 'drop-shadow(0 3px 6px rgba(212, 132, 156, 0.3))', pointerEvents: 'none', zIndex: 10 }} />

        <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="font-display" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
          María Sol
        </button>

        <div className="nav-links nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.6vw, 26px)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button onClick={() => handleNavClick('projects')} className="font-body" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'es' ? 'Proyectos' : 'Projects'}</button>
          <button onClick={() => handleNavClick('about')} className="font-body" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'es' ? 'Acerca de' : 'About'}</button>
          <button onClick={() => handleNavClick('contact')} className="font-body" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang === 'es' ? 'Contacto' : 'Contact'}</button>
          <button onClick={onLangToggle} className="font-body" style={{ fontSize: '10px', fontWeight: 500, color: 'var(--ink)', background: 'rgba(255, 255, 255, 0.58)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', padding: '6px 12px', borderRadius: '6px' }}>{lang === 'es' ? 'ES / EN' : 'EN / ES'}</button>
        </div>

        <div className="nav-mobile-actions" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <button onClick={onLangToggle} className="font-body" style={{ fontSize: '10px', fontWeight: 500, color: 'var(--ink)', background: 'rgba(255, 255, 255, 0.58)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', padding: '6px 10px', borderRadius: '6px' }}>{lang === 'es' ? 'ES / EN' : 'EN / ES'}</button>
          <button onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="nav-menu-toggle font-body" style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ink)', background: 'rgba(255, 255, 255, 0.58)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', padding: '6px 10px', borderRadius: '6px' }}>{isMobileMenuOpen ? (lang === 'es' ? 'Cerrar' : 'Close') : 'Menu'}</button>
        </div>

        <div className="nav-links-mobile" style={{ display: isMobileMenuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(61, 43, 31, 0.16)', paddingTop: '10px' }}>
          <button onClick={() => handleNavClick('projects')} className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', background: 'rgba(255,255,255,0.48)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px', padding: '8px 10px' }}>{lang === 'es' ? 'Proyectos' : 'Projects'}</button>
          <button onClick={() => handleNavClick('about')} className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', background: 'rgba(255,255,255,0.48)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px', padding: '8px 10px' }}>{lang === 'es' ? 'Acerca de' : 'About'}</button>
          <button onClick={() => handleNavClick('contact')} className="font-body" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', background: 'rgba(255,255,255,0.48)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px', padding: '8px 10px' }}>{lang === 'es' ? 'Contacto' : 'Contact'}</button>
        </div>
      </div>
    </nav>
  );
}
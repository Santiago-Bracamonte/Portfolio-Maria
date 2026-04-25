import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  lang: 'es' | 'en';
}

export default function About({ lang }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(dividerRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: dividerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(imageRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(textRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-scrapbook" style={{ position: 'relative', zIndex: 2, padding: 'clamp(42px, 7vw, 82px) 4vw clamp(18px, 3vw, 36px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 ref={titleRef} className="font-display" style={{ fontSize: 'clamp(28px, 3vw, 48px)', textAlign: 'center', color: 'var(--ink)', marginBottom: '24px', opacity: 0 }}>
          {lang === 'es' ? 'ACERCA DE' : 'ABOUT'}
        </h2>

        <div ref={dividerRef} style={{ width: '100%', maxWidth: '400px', height: '1px', backgroundColor: 'var(--ink)', opacity: 0.2, margin: '0 auto clamp(34px, 5vw, 52px)', transformOrigin: 'center', transform: 'scaleX(0)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(22px, 3.5vw, 44px)', alignItems: 'start' }}>
          
          {/* Polaroid con foto */}
          <div style={{ position: 'relative' }}>
            <div className="washi-tape washi-tape-pink" style={{ top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 10 }} />
            
            <div
              ref={imageRef}
              className="polaroid"
              style={{
                '--rotation': '-3deg',
                opacity: 0,
                position: 'relative',
              } as React.CSSProperties}
            >
              <img
                src="/images/MaruFOTO.jpeg"
                alt={lang === 'es' ? 'Retrato de Maru' : 'Portrait of Maru'}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
              />
              
              <img
                src="/images/star.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: 'clamp(40px, 6vw, 60px)',
                  top: '-20px',
                  right: '-15px',
                  transform: 'rotate(20deg)',
                  filter: 'drop-shadow(0 6px 10px rgba(61,43,31,0.2))',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Texto estilo nota - EXTENDIDO */}
          <div ref={textRef} style={{ opacity: 0, paddingTop: '8px', position: 'relative' }}>
            <div className="washi-tape washi-tape-blue" style={{ top: '-10px', right: '20px', transform: 'rotate(5deg)', zIndex: 10 }} />
            
            <div
              style={{
                background: 'var(--cream)',
                padding: 'clamp(24px, 3vw, 40px)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(61, 43, 31, 0.1)',
                position: 'relative',
                transform: 'rotate(1deg)',
              }}
            >
              {/* Párrafo 1 - Introducción*/}
              <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink)', marginBottom: '20px' }}>
                {lang === 'es'
                  ? 'Soy María Sol Goldenberg, licenciada en Marketing con una gran pasión por crear estrategias que conectan marcas con personas. A lo largo de mi trayectoria, he tenido el privilegio de trabajar con diversos emprendedores, ayudándolos a construir presencias digitales sólidas, auténticas y que realmente generan impacto. Mi enfoque no se trata solo de números y métricas, sino de entender el alma de cada marca y traducirla en contenido que resuene con su audiencia ideal.'
                  : 'My name is María Sol Goldenberg. I hold a degree in Marketing and have a deep passion for creating strategies that connect brands with people. Throughout my career, I’ve had the privilege of working with a wide range of entrepreneurs, helping them build strong, authentic digital presences that truly make an impact. My approach isn’t just about numbers and metrics; it’s about understanding the essence of each brand and translating that into content that resonates with its ideal audience.'}
              </p>

              {/* Párrafo 2 - Experiencia*/}
              <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink)', marginBottom: '20px' }}>
                {lang === 'es'
                  ? 'Transformo ideas abstractas en campañas concretas que no solo lucen increíbles, sino que generan resultados medibles y reales. He liderado equipos creativos, gestionado comunidades de miles de seguidores, y creado embudos de conversión que han multiplicado las ventas de mis clientes. Cada proyecto es un nuevo desafío que abrazo con entusiasmo y dedicación total.'
                  : 'I turn abstract ideas into concrete campaigns that not only look amazing but also deliver measurable, real results. I’ve led creative teams, managed communities with thousands of followers, and built conversion funnels that have multiplied my clients’ sales. Every project is a new challenge that I embrace with enthusiasm and total dedication.'}
              </p>

              {/* Párrafo 3 - Filosofía*/}
              <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink)', marginBottom: '24px' }}>
                {lang === 'es'
                  ? 'Desde el branding estratégico hasta el performance marketing de alta conversión, cada proyecto que abordo es una oportunidad única para contar historias que inspiran acción, generan conexiones genuinas y construyen legados duraderos. No creo en las soluciones genéricas: cada marca merece una estrategia tan única como su historia. Mi misión es ayudarte a descubrir esa historia y compartirla con el mundo de una manera que no solo sea vista, sino recordada. ¿Estás listo para llevar tu marca al siguiente nivel? Conectemos y hagamos magia juntos.'
                  : 'From strategic branding to high-conversion performance marketing, every project I undertake is a unique opportunity to tell stories that inspire action, generate genuine connections, and build lasting legacies. I do not believe in generic solutions: every brand deserves a strategy as unique as its story. My mission is to help you discover that story and share it with the world in a way that is not only seen but remembered. Are you ready to take your brand to the next level? Let us connect and make magic together.'}
              </p>

              <div style={{ display: 'flex', gap: '24px' }}>
                <a href="https://www.instagram.com/marugoldenberg/" target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--blue)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Instagram
                </a>
                <a href="https://www.linkedin.com/in/maría-sol-goldenberg/" target="_blank" rel="noreferrer" className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--blue)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
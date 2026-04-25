import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lang: 'es' | 'en';
}

export default function Hero({ lang }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const tape1Ref = useRef<HTMLDivElement>(null);
  const tape2Ref = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'back.out(1.6)' } });

      // 1. Polaroid cae desde arriba
      tl.fromTo(
        polaroidRef.current,
        { opacity: 0, y: -120, rotation: -12, scale: 0.8 },
        { opacity: 1, y: 0, rotation: -4, scale: 1, duration: 1.1 }
      )
      // 2. Washi tapes se "pegan"
      .fromTo(
        [tape1Ref.current, tape2Ref.current],
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
      // 3. Nombre aparece con rebote
      .fromTo(
        nameRef.current,
        { opacity: 0, x: 60, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 },
        '-=0.3'
      )
      // 4. Tagline
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      // 5. Ticket se desliza
      .fromTo(
        ticketRef.current,
        { opacity: 0, x: -40, rotation: -8 },
        { opacity: 1, x: 0, rotation: -2, duration: 0.8 },
        '-=0.5'
      )
      // 6. Decoraciones de esquina entran
      .fromTo(
        '.hero-corner',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' },
        '-=0.6'
      )
      // 7. Scroll
      .fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );

      // Flotación continua decoraciones
      gsap.to('.hero-float', {
        y: '+=10',
        rotation: '+=1.5',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: 'random' },
      });

      // Parallax suave con mouse
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to('.hero-parallax-slow', {
          x: x * 8,
          y: y * 8,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to('.hero-parallax-fast', {
          x: x * 18,
          y: y * 18,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to('.hero-parallax-reverse', {
          x: -x * 12,
          y: -y * 12,
          duration: 1.1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(90px, 12vh, 140px) 4vw clamp(70px, 10vh, 100px)',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: '#F9F3ED',
      }}
    >
      {/* Patrón de papel cuadriculado sutil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(196, 120, 138, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 120, 138, 0.04) 1px, transparent 1px)',
          backgroundSize: 'clamp(30px, 4vw, 50px) clamp(30px, 4vw, 50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ===== ELEMENTOS DE ESQUINA ===== */}
      {/* Moño arriba izquierda */}
      <div
        className="hero-corner hero-float hero-parallax-slow"
        style={{
          position: 'absolute',
          top: 'clamp(70px, 12vh, 140px)',
          left: 'clamp(10px, 4vw, 50px)',
          zIndex: 4,
        }}
      >
        <img
          src="/images/bun.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 'clamp(55px, 9vw, 110px)',
            transform: 'rotate(-12deg)',
            filter: 'drop-shadow(3px 6px 12px rgba(107, 78, 61, 0.22))',
            opacity: 0.92,
          }}
        />
      </div>

      {/* Estrella grande arriba derecha */}
      <div
        className="hero-corner hero-float hero-parallax-fast"
        style={{
          position: 'absolute',
          top: 'clamp(60px, 10vh, 120px)',
          right: 'clamp(20px, 6vw, 80px)',
          zIndex: 4,
        }}
      >
        <img
          src="/images/star.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 'clamp(50px, 7vw, 95px)',
            transform: 'rotate(22deg)',
            filter: 'drop-shadow(2px 4px 10px rgba(180, 140, 80, 0.3))',
            opacity: 0.88,
          }}
        />
      </div>

      {/* Lámpara abajo izquierda */}
      <div
        className="hero-corner hero-float hero-parallax-reverse"
        style={{
          position: 'absolute',
          bottom: 'clamp(50px, 10vh, 110px)',
          left: 'clamp(10px, 4vw, 45px)',
          zIndex: 4,
        }}
      >
        <img
          src="/images/lamp.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 'clamp(60px, 10vw, 115px)',
            transform: 'rotate(10deg)',
            filter: 'drop-shadow(2px 6px 14px rgba(200, 180, 100, 0.28))',
            opacity: 0.88,
          }}
        />
      </div>

      {/* Sello año abajo derecha */}
      <div
        className="hero-corner hero-parallax-slow"
        style={{
          position: 'absolute',
          bottom: 'clamp(60px, 11vh, 120px)',
          right: 'clamp(20px, 5vw, 60px)',
          zIndex: 4,
          padding: '10px 20px',
          background: '#fff',
          borderRadius: '50%',
          border: '2.5px dashed var(--pastel-pink)',
          boxShadow: '3px 4px 0 rgba(61,43,31,0.1)',
          transform: 'rotate(6deg)',
          width: 'clamp(56px, 7vw, 76px)',
          height: 'clamp(56px, 7vw, 76px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: 'var(--ink)',
            opacity: 0.55,
          }}
        >
          2026
        </span>
      </div>

      {/* Sparkles sueltos */}
      <div
        className="hero-corner hero-float hero-parallax-fast"
        style={{ position: 'absolute', top: '22%', left: '18%', fontSize: 'clamp(14px, 1.8vw, 20px)', opacity: 0.3 }}
      >
        <span>✦</span>
      </div>
      <div
        className="hero-corner hero-float hero-parallax-reverse"
        style={{ position: 'absolute', top: '18%', right: '22%', fontSize: 'clamp(16px, 2vw, 24px)', opacity: 0.25, animationDelay: '0.7s' }}
      >
        <span>✧</span>
      </div>
      <div
        className="hero-corner hero-float"
        style={{ position: 'absolute', bottom: '28%', right: '18%', fontSize: 'clamp(18px, 2.4vw, 26px)', opacity: 0.28, animationDelay: '1.1s' }}
      >
        <span>🌸</span>
      </div>
      <div
        className="hero-corner hero-float hero-parallax-slow"
        style={{ position: 'absolute', bottom: '32%', left: '14%', fontSize: 'clamp(14px, 1.6vw, 20px)', opacity: 0.22, animationDelay: '1.5s' }}
      >
        <span>💫</span>
      </div>

      {/* ===== COLLAGE CENTRAL ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '900px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
          padding: '0 clamp(10px, 3vw, 30px)',
        }}
      >
        {/* COLUMNA IZQUIERDA: Polaroid */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Washi tape superior */}
          <div
            ref={tape1Ref}
            className="washi-tape washi-tape-pink"
            style={{
              position: 'absolute',
              top: '-16px',
              left: '20%',
              width: 'clamp(70px, 10vw, 100px)',
              height: '22px',
              transform: 'rotate(-8deg)',
              zIndex: 10,
              opacity: 0,
              transformOrigin: 'left center',
            }}
          />
          <div
            ref={tape2Ref}
            className="washi-tape washi-tape-blue"
            style={{
              position: 'absolute',
              top: '-12px',
              right: '18%',
              width: 'clamp(50px, 7vw, 75px)',
              height: '18px',
              transform: 'rotate(6deg)',
              zIndex: 10,
              opacity: 0,
              transformOrigin: 'right center',
            }}
          />

          <div
            ref={polaroidRef}
            className="hero-parallax-slow"
            style={{
              opacity: 0,
              padding: 'clamp(10px, 1.3vw, 14px)',
              paddingBottom: 'clamp(14px, 2vw, 20px)',
              background: '#fff',
              borderRadius: '3px',
              boxShadow: '4px 8px 30px rgba(61, 43, 31, 0.18), 1px 2px 6px rgba(61, 43, 31, 0.1)',
              transform: 'rotate(-4deg)',
              maxWidth: 'clamp(200px, 26vw, 280px)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1.05',
                borderRadius: '2px',
                overflow: 'hidden',
                background: '#F5EDE0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/images/MG-Favicon.png"
                alt="MG"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span style="font-size: clamp(40px, 6vw, 64px); color: var(--rose); opacity: 0.4;">✦</span>';
                  }
                }}
              />
            </div>
            <p
              className="font-handwritten"
              style={{
                textAlign: 'center',
                margin: 'clamp(8px, 1.2vw, 12px) 0 0',
                fontSize: 'clamp(13px, 1.5vw, 17px)',
                color: 'var(--ink)',
                opacity: 0.65,
                transform: 'rotate(-1deg)',
              }}
            >
              Maru ✨
            </p>

            {/* Estrellita pegada en la polaroid */}
            <div
              className="hero-float"
              style={{
                position: 'absolute',
                top: '-18px',
                right: '-22px',
                zIndex: 5,
              }}
            >
              <img
                src="/images/star.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: 'clamp(32px, 4vw, 48px)',
                  transform: 'rotate(15deg)',
                  filter: 'drop-shadow(1px 3px 6px rgba(180, 140, 80, 0.35))',
                }}
              />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Texto */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vh, 22px)' }}>
          {/* Nombre como título de revista */}
          <div
            ref={nameRef}
            className="hero-parallax-fast"
            style={{
              opacity: 0,
              position: 'relative',
              transform: 'rotate(1deg)',
            }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(38px, 5.5vw, 72px)',
                lineHeight: 1.05,
                color: 'var(--ink)',
                margin: 0,
                letterSpacing: '1.5px',
                textShadow: '4px 4px 0px rgba(196, 120, 138, 0.12)',
              }}
            >
              María Sol
            </h1>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(38px, 5.5vw, 72px)',
                lineHeight: 1.05,
                color: 'var(--rose)',
                margin: 0,
                letterSpacing: '1.5px',
                textShadow: '4px 4px 0px rgba(196, 120, 138, 0.18)',
              }}
            >
              Goldenberg
            </h1>
          </div>

          {/* Tagline en nota */}
          <div
            ref={taglineRef}
            className="hero-parallax-slow"
            style={{
              opacity: 0,
              background: '#fff',
              padding: 'clamp(14px, 2vw, 20px) clamp(18px, 2.5vw, 26px)',
              borderRadius: '3px 16px 3px 16px',
              boxShadow: '3px 5px 16px rgba(61, 43, 31, 0.1)',
              border: '1.5px solid rgba(61, 43, 31, 0.08)',
              transform: 'rotate(-1deg)',
              maxWidth: '480px',
              position: 'relative',
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: 'clamp(14px, 1.7vw, 19px)',
                lineHeight: 1.6,
                color: 'var(--ink)',
                margin: 0,
                opacity: 0.85,
              }}
            >
              {lang === 'es'
                ? 'Estrategia, contenido y comunidades que crecen'
                : 'Strategy, content, and growing communities'}
            </p>
            {/* Pin decorativo */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '20px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--rose)',
                boxShadow: '0 2px 4px rgba(196, 120, 138, 0.4)',
              }}
            />
          </div>

          {/* Ticket de servicios */}
          <div
            ref={ticketRef}
            className="hero-parallax-reverse"
            style={{
              opacity: 0,
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              transform: 'rotate(-2deg)',
            }}
          >
            {[
              lang === 'es' ? 'Branding' : 'Branding',
              lang === 'es' ? 'Social Media' : 'Social Media',
              lang === 'es' ? 'Estrategia' : 'Strategy',
            ].map((chip, i) => (
              <span
                key={chip}
                className="font-body"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '2px solid rgba(196, 120, 138, 0.25)',
                  background: '#fff',
                  color: 'var(--rose)',
                  boxShadow: '2px 3px 0 rgba(196, 120, 138, 0.15)',
                  transform: `rotate(${i === 1 ? 1 : i === 2 ? -1 : 0}deg)`,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 3.5vh, 36px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0,
          zIndex: 5,
          cursor: 'pointer',
        }}
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '2.5px',
            color: 'var(--ink)',
            textTransform: 'uppercase',
            opacity: 0.45,
          }}
        >
          {lang === 'es' ? 'Scroll' : 'Scroll'}
        </span>
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '1.5px solid var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.35,
            animation: 'bounce 2.2s infinite',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--ink)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
          60% { transform: translateY(-3px); }
        }
        @media (max-width: 720px) {
          #hero > div:nth-of-type(3) {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero > div:nth-of-type(3) > div:first-child {
            justify-content: center;
          }
          #hero > div:nth-of-type(3) > div:last-child {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
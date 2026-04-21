import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lang: 'es' | 'en';
}

export default function Hero({ lang }: HeroProps) {
  const [coverSrc, setCoverSrc] = useState('/images/cover-maru.png');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.1'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '4vw',
        paddingTop: 'clamp(82px, 12vh, 132px)',
        paddingBottom: 'clamp(30px, 6vh, 70px)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {/* Moño decorativo - regalo creativo */}
      <img
        src="/images/bun.png"
        alt=""
        aria-hidden="true"
        className="hero-bun"
        style={{
          position: 'absolute',
          width: 'clamp(45px, 8vw, 100px)',
          top: 'clamp(60px, 8vh, 100px)',
          left: 'clamp(8px, 2vw, 30px)',
          transform: 'rotate(-8deg)',
          filter: 'drop-shadow(0 8px 16px rgba(107, 78, 61, 0.2))',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.9,
        }}
      />

      {/* Estrella flotante sobre el título */}
      <img
        src="/images/star.png"
        alt=""
        aria-hidden="true"
        className="hero-star-float"
        style={{
          position: 'absolute',
          width: 'clamp(40px, 6vw, 80px)',
          top: 'clamp(80px, 14vh, 160px)',
          right: 'clamp(10px, 15vw, 200px)',
          transform: 'rotate(25deg)',
          filter: 'drop-shadow(0 6px 12px rgba(180, 140, 80, 0.3))',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'starFloat 3s ease-in-out infinite',
        }}
      />

      <div style={{ width: '100%', pointerEvents: 'auto', marginBottom: 'clamp(10px, 2vw, 24px)' }}>
        <div
          className="hero-cover"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1500px',
            aspectRatio: '1365 / 323',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(61, 43, 31, 0.24)',
            border: '1px solid rgba(255,255,255,0.45)',
            margin: '0 auto clamp(18px, 2.5vw, 28px)',
          }}
        >
          <img
            className="hero-cover-image"
            src={coverSrc}
            alt={lang === 'es' ? 'Portada de Maria Sol Goldenberg' : 'Maria Sol Goldenberg cover'}
            onError={() => setCoverSrc('/images/photo-wide.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'contrast(1.07) saturate(1.08) brightness(1.02)',
              transform: 'scale(1.01)',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(100deg, rgba(232,195,209,0.26) 0%, rgba(255,255,255,0.08) 28%, rgba(200,222,250,0.22) 72%, rgba(90,40,60,0.2) 100%)',
            }}
          />
        </div>

        <h1
          ref={titleRef}
          className="font-display hero-title"
          style={{
            fontSize: 'clamp(24px, 2.9vw, 44px)',
            lineHeight: 1.08,
            textAlign: 'center',
            color: 'var(--ink)',
            opacity: 0,
            margin: '0 auto clamp(24px, 5vh, 66px)',
            maxWidth: '1500px',
          }}
        >
          {lang === 'es'
            ? 'Estrategia, contenido y comunidades que crecen'
            : 'Strategy, content, and growing communities'}
        </h1>
      </div>

      {/* Year label */}
      <div
        style={{
          position: 'absolute',
          bottom: '4vw',
          right: '4vw',
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '2px',
            color: 'var(--ink)',
            opacity: 0.5,
          }}
        >
          2026
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '4vw',
          left: '50vw',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
        }}
      >
        <span
          className="font-body"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2px',
            color: 'var(--ink)',
            textTransform: 'uppercase',
          }}
        >
          {lang === 'es' ? 'Scroll' : 'Scroll'}
        </span>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '1.5px solid var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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

      {/* Foco de idea - iluminando el camino */}
      <img
        src="/images/lamp.png"
        alt=""
        aria-hidden="true"
        className="hero-lamp"
        style={{
          position: 'absolute',
          width: 'clamp(55px, 10vw, 120px)',
          bottom: 'clamp(60px, 12vh, 140px)',
          right: 'clamp(8px, 4vw, 50px)',
          transform: 'rotate(12deg)',
          filter: 'drop-shadow(0 8px 16px rgba(200, 180, 100, 0.25))',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.85,
        }}
      />
    </section>
  );
}
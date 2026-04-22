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
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-overlay"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(42px, 7vw, 82px) 4vw clamp(18px, 3vw, 36px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            textAlign: 'center',
            color: 'var(--ink)',
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          {lang === 'es' ? 'ACERCA DE' : 'ABOUT'}
        </h2>

        <div
          ref={dividerRef}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            backgroundColor: 'var(--ink)',
            opacity: 0.2,
            margin: '0 auto clamp(34px, 5vw, 52px)',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(22px, 3.5vw, 44px)',
            alignItems: 'start',
          }}
        >
          {/* Image */}
          <div
            ref={imageRef}
            className="about-image-wrap"
            style={{
              position: 'relative',
              opacity: 0,
              aspectRatio: '4 / 3',
              maxHeight: '500px',
              borderRadius: '8px',
              overflow: 'visible',
              backgroundColor: 'var(--warm-gray)',
            }}
          >
  
           <img
              src="/images/Clip.png"
              alt=""
              aria-hidden="true"
              className="about-clip"
              style={{
                position: 'absolute',
                width: 'clamp(32px, 5vw, 56px)',
                top: '-10px',
                left: '10px', // DENTRO del área visible, no afuera
                transform: 'rotate(-30deg)',
                filter: 'drop-shadow(0 4px 8px rgba(61,43,31,0.25))',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />


            <img
              src="/images/descarga (7).jpeg"
              alt={lang === 'es' ? 'Retrato de Maru' : 'Portrait of Maru'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                borderRadius: '8px',
              }}
            />

            {/* Estrella dorada decorativa */}
            <img
              src="/images/star.png"
              alt=""
              aria-hidden="true"
              className="about-star"
              style={{
                position: 'absolute',
                width: 'clamp(45px, 8vw, 92px)',
                top: 'clamp(-10px, -2vw, -10px)',
                right: 'clamp(-8px, -2vw, -8px)',
                transform: 'rotate(14deg)',
                filter: 'drop-shadow(0 10px 16px rgba(61,43,31,0.18))',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Bio text */}
          <div ref={textRef} className="about-text-wrap" style={{ opacity: 0, paddingTop: '8px', position: 'relative' }}>
            <p
              className="font-body"
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--ink)',
                marginBottom: '20px',
              }}
            >
              {lang === 'es'
                ? 'Soy María Sol, licenciada en Marketing apasionada por crear estrategias que conectan marcas con personas. Con años de experiencia en community management y direccion creativa, transformo ideas en campanas que generan resultados reales.'
                : 'I am María Sol, a Marketing graduate passionate about creating strategies that connect brands with people. With years of experience in community management and creative direction, I transform ideas into campaigns that generate real results.'}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--ink)',
                marginBottom: '20px',
              }}
            >
              {lang === 'es'
                ? 'Mi enfoque combina datos y creatividad: analizo el comportamiento del consumidor para diseñar embudos de conversion, gestiono comunidades con voz autentica, y dirijo equipos creativos hacia objetivos medibles.'
                : 'My approach combines data and creativity: I analyze consumer behavior to design conversion funnels, manage communities with an authentic voice, and direct creative teams toward measurable goals.'}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--ink)',
                marginBottom: '32px',
              }}
            >
              {lang === 'es'
                ? 'Desde el branding hasta el performance marketing, cada proyecto es una oportunidad para contar historias que inspiran accion.'
                : 'From branding to performance marketing, every project is an opportunity to tell stories that inspire action.'}
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '24px' }}>
              <a
                href="https://www.instagram.com/marugoldenberg/"
                target="_blank"
                rel="noreferrer"
                className="font-body"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--blue)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/maría-sol-goldenberg/"
                target="_blank"
                rel="noreferrer"
                className="font-body"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--blue)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
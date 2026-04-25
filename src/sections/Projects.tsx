import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  lang: 'es' | 'en';
}

interface ProjectItem {
  id: string;
  title: string;
  tags: string;
  image: string;
  video?: string;
  href?: string;
  featured?: boolean;
}

const projects = {
  es: [
    {
      id: 'launch-web',
      title: 'Plan de Lanzamiento y Sitio Web',
      tags: 'Estrategia, RRSS, Performance',
      image: '/images/SATYA.png',
      href: 'https://canva.link/yjifuq5h2n626g3',
      featured: true,
    },
    {
      id: 'content-campaign',
      title: 'Campaña de Contenido',
      tags: 'Community, Creatividad, Marca',
      image: '/images/Patisserie2.png',
      video: '/images/PatisserieVideo.mp4',
      href: 'https://canva.link/5ebuag34j8f8ka7',
      featured: true,
    },
  ] as ProjectItem[],
  en: [
    {
      id: 'launch-web',
      title: 'Launch Plan and Website',
      tags: 'Strategy, Social, Performance',
      image: '/images/SATYA.png',
      href: 'https://canva.link/yjifuq5h2n626g3',
      featured: true,
    },
    {
      id: 'content-campaign',
      title: 'Content Campaign',
      tags: 'Community, Creativity, Brand',
      image: '/images/Patisserie2.png',
      video: '/images/PatisserieVideo.mp4',
      href: 'https://canva.link/5ebuag34j8f8ka7',
      featured: true,
    },
  ] as ProjectItem[],
};

export default function Projects({ lang }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from(dividerRef.current, {
        scaleX: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: dividerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0, y: 50, duration: 0.7, delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentProjects = projects[lang];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-scrapbook"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(16px, 3vw, 34px) 4vw clamp(24px, 4vw, 42px)',
      }}
    >
      {/* Megáfono */}
      <img
        src="/images/megaphone.png"
        alt=""
        aria-hidden="true"
        className="projects-megaphone"
        style={{
          position: 'absolute',
          width: 'clamp(60px, 11vw, 148px)',
          right: 'clamp(5px, 4vw, 72px)',
          top: 'clamp(4px, 2vw, 26px)',
          transform: 'rotate(35deg)',
          opacity: 0.92,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 10px 14px rgba(212, 132, 156, 0.25))',
          zIndex: 1,
          animation: 'megaphoneShake 4s ease-in-out infinite',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <h2
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            textAlign: 'center',
            color: 'var(--ink)',
            marginBottom: '24px',
          }}
        >
          {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
        </h2>

        <div
          className="font-body"
          style={{
            textAlign: 'center',
            fontSize: '12px',
            letterSpacing: '0.7px',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.72,
            marginBottom: '24px',
          }}
        >
          {lang === 'es' ? 'Proyectos reales destacados' : 'Featured real projects'}
        </div>

        <div
          ref={dividerRef}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            backgroundColor: 'var(--ink)',
            opacity: 0.2,
            margin: '0 auto clamp(28px, 5vw, 48px)',
            transformOrigin: 'center',
          }}
        />

        {/* Grid de celulares */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
            justifyItems: 'center',
          }}
        >
          {currentProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.href}
              target={project.href ? '_blank' : undefined}
              rel={project.href ? 'noreferrer' : undefined}
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{
                position: 'relative',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                const phone = e.currentTarget.querySelector('.phone-mockup');
                if (phone) {
                  gsap.to(phone, { y: -8, rotateY: 5, duration: 0.4, ease: 'power2.out' });
                }
              }}
              onMouseLeave={(e) => {
                const phone = e.currentTarget.querySelector('.phone-mockup');
                if (phone) {
                  gsap.to(phone, { y: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
                }
              }}
            >
              {/* === MOCKUP DE CELULAR === */}
              <div
                className="phone-mockup"
                style={{
                  width: 'clamp(220px, 28vw, 280px)',
                  background: '#1a1a1a',
                  borderRadius: '36px',
                  padding: '10px 10px 14px 10px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2)',
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Notch */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '22px',
                    background: '#1a1a1a',
                    borderRadius: '0 0 14px 14px',
                    zIndex: 10,
                  }}
                />

                {/* Botones laterales */}
                <div style={{ position: 'absolute', right: '-3px', top: '80px', width: '4px', height: '40px', background: '#2a2a2a', borderRadius: '0 2px 2px 0' }} />
                <div style={{ position: 'absolute', left: '-3px', top: '60px', width: '4px', height: '25px', background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />
                <div style={{ position: 'absolute', left: '-3px', top: '95px', width: '4px', height: '25px', background: '#2a2a2a', borderRadius: '2px 0 0 2px' }} />

                {/* Pantalla */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '9/19',
                    background: '#000',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {project.video ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={project.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />
                  )}

                  {/* Indicador de home bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100px',
                      height: '4px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '2px',
                    }}
                  />
                </div>

                {/* Reflejo de luz */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    right: '10px',
                    bottom: '14px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                    pointerEvents: 'none',
                    zIndex: 5,
                  }}
                />
              </div>

              {/* Info debajo del celular */}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <h3
                  className="font-body"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--ink)',
                    marginBottom: '4px',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: '10px',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'var(--ink)',
                    opacity: 0.5,
                    marginBottom: '8px',
                  }}
                >
                  {project.tags}
                </p>
                {project.href && (
                  <p
                    className="font-body"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      color: 'var(--blue)',
                    }}
                  >
                    {lang === 'es' ? 'Ver proyecto' : 'View project'}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
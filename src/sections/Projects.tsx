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
  href?: string;
  featured?: boolean;
}

const projects = {
  es: [
    {
      id: 'launch-web',
      title: 'Plan de Lanzamiento y Sitio Web',
      tags: 'Estrategia, RRSS, Performance',
      image: '/images/project-canva-web.png',
      href: 'https://canva.link/yjifuq5h2n626g3',
      featured: true,
    },
    {
      id: 'content-campaign',
      title: 'Campaña de Contenido',
      tags: 'Community, Creatividad, Marca',
      image: '/images/project-canva-social.png',
      href: 'https://canva.link/5ebuag34j8f8ka7',
      featured: true,
    },
  ] as ProjectItem[],
  en: [
    {
      id: 'launch-web',
      title: 'Launch Plan and Website',
      tags: 'Strategy, Social, Performance',
      image: '/images/project-canva-web.png',
      href: 'https://canva.link/yjifuq5h2n626g3',
      featured: true,
    },
    {
      id: 'content-campaign',
      title: 'Content Campaign',
      tags: 'Community, Creativity, Brand',
      image: '/images/project-canva-social.png',
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
      gsap.from(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.from(
        dividerRef.current,
        {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(
          card,
          {
            opacity: 0,
            y: 50,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentProjects = projects[lang];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-overlay"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(16px, 3vw, 34px) 4vw clamp(24px, 4vw, 42px)',
      }}
    >
      {/* Megáfono animado - "¡Escucha esto!" */}
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

      {/* Cursor invitando al click */}
      <img
        src="/images/click.png"
        alt=""
        aria-hidden="true"
        className="projects-click"
        style={{
          position: 'absolute',
          width: 'clamp(30px, 5vw, 60px)',
          top: 'clamp(120px, 25vw, 300px)',
          left: 'clamp(15px, 10vw, 150px)',
          transform: 'rotate(-10deg)',
          filter: 'drop-shadow(0 4px 8px rgba(61, 43, 31, 0.2))',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0.85,
          animation: 'clickPulse 2s ease-in-out infinite',
        }}
      />

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative' }}>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(14px, 2.5vw, 24px)',
            alignItems: 'stretch',
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
                backgroundColor: project.featured ? 'rgba(255, 255, 255, 0.56)' : 'rgba(255, 255, 255, 0.38)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: project.featured ? '1px solid rgba(181, 101, 118, 0.45)' : '1px solid rgba(61, 43, 31, 0.12)',
                borderRadius: '14px',
                padding: '14px',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) {
                  gsap.to(img, { scale: 1.03, duration: 0.4, ease: 'power2.out' });
                }
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) {
                  gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
                }
              }}
            >
              {project.featured && (
                <div
                  className="font-body"
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: '#8A445D',
                    marginBottom: '10px',
                  }}
                >
                  {lang === 'es' ? 'Proyecto realizado' : 'Completed project'}
                </div>
              )}

              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  backgroundColor: 'var(--warm-gray)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    imageRendering: 'auto',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.65, 0.05, 0.36, 1)',
                  }}
                />
              </div>
              <h3
                className="font-body"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--ink)',
                  marginBottom: '6px',
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
                    marginTop: '10px',
                  }}
                >
                  {lang === 'es' ? 'Ver proyecto completo' : 'View full project'}
                </p>
              )}
            </a>
          ))}
        </div>

        
      
      </div>

      {/* Año 2026 como sello temporal */}
      <img
        src="/images/2026.png"
        alt=""
        aria-hidden="true"
        className="projects-2026"
        style={{
          position: 'absolute',
          width: 'clamp(35px, 7vw, 80px)',
          bottom: 'clamp(10px, 3vw, 40px)',
          right: 'clamp(10px, 4vw, 60px)',
          transform: 'rotate(-5deg)',
          filter: 'drop-shadow(0 6px 10px rgba(61, 43, 31, 0.15))',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.7,
        }}
      />
    </section>
  );
}
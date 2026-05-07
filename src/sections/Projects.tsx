import { useEffect, useRef, useState, type MouseEvent } from 'react';
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
  videoPlaylist?: string[];
  href?: string;
  featured?: boolean;
  stories?: {
    id: string;
    title: string;
    image: string;
  }[];
}

const projects = {
  es: [
    {
      id: 'maru-stories',
      title: 'Proyecto Maru',
      tags: 'Stories, Motion, Branding',
      image: '/images/ProyectoMaru1.png',
      stories: [
        { id: 'maru-1', title: 'Blaze And Fire', image: '/images/ProyectoMaru1.png' },
        { id: 'maru-2', title: 'Blaze And Fire', image: '/images/ProyectoMaru2.png' },
        { id: 'maru-3', title: 'Blaze And Fire', image: '/images/ProyectoMaru3.png' },
        { id: 'maru-4', title: 'Blaze And Fire', image: '/images/ProyectoMaru4.png' },
        { id: 'maru-5', title: 'Blaze And Fire', image: '/images/ProyectoMaru5.png' },
      ],
      featured: true,
    },
    {
      id: 'blaze-video',
      title: 'Blaze and Fire Eyeshadow',
      tags: 'Video, Social, Lookbook',
      image: '/images/ProyectoMaru2.png',
      videoPlaylist: [
        '/images/Blaze and Fire Eyeshado (1) (1).mp4',
      ],
      featured: true,
    },
    {
      id: 'patisserie-video',
      title: 'Proyecto Patisserie',
      tags: 'Video, Social, Reels',
      image: '/images/ProyectoMaru2.png',
      videoPlaylist: [
        '/images/PatisserieVideo.mp4',
        '/images/Proyecto Patisserie.mp4',
      ],
      featured: true,
    },
  ] as ProjectItem[],
  en: [
    {
      id: 'maru-stories',
      title: 'Maru Project',
      tags: 'Stories, Motion, Branding',
      image: '/images/ProyectoMaru1.png',
      stories: [
        { id: 'maru-1', title: 'ProyectoMaru1', image: '/images/ProyectoMaru1.png' },
        { id: 'maru-2', title: 'ProyectoMaru2', image: '/images/ProyectoMaru2.png' },
        { id: 'maru-3', title: 'ProyectoMaru3', image: '/images/ProyectoMaru3.png' },
        { id: 'maru-4', title: 'ProyectoMaru4', image: '/images/ProyectoMaru4.png' },
        { id: 'maru-5', title: 'ProyectoMaru5', image: '/images/ProyectoMaru5.png' },
      ],
      featured: true,
    },
    {
      id: 'blaze-video',
      title: 'Blaze and Fire Eyeshadow',
      tags: 'Video, Social, Lookbook',
      image: '/images/ProyectoMaru2.png',
      videoPlaylist: [
        '/images/Blaze and Fire Eyeshado (1) (1).mp4',
      ],
      featured: true,
    },
    {
      id: 'patisserie-video',
      title: 'Patisserie Project',
      tags: 'Video, Social, Reels',
      image: '/images/ProyectoMaru2.png',
      videoPlaylist: [
        '/images/PatisserieVideo.mp4',
        '/images/Proyecto Patisserie.mp4',
      ],
      featured: true,
    },
  ] as ProjectItem[],
};

export default function Projects({ lang }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [storyIndices, setStoryIndices] = useState<Record<string, number>>({});
  const [videoIndices, setVideoIndices] = useState<Record<string, number>>({});
  const instagramAvatar = '/images/MaruFOTO.jpeg';
  const instagramUser = 'maru';

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

  useEffect(() => {
    const nextStoryIndices: Record<string, number> = {};
    const nextVideoIndices: Record<string, number> = {};
    currentProjects.forEach((project) => {
      if (project.stories?.length) {
        nextStoryIndices[project.id] = 0;
      }
      if (project.videoPlaylist?.length) {
        nextVideoIndices[project.id] = 0;
      }
    });
    setStoryIndices(nextStoryIndices);
    setVideoIndices(nextVideoIndices);
  }, [currentProjects]);

  useEffect(() => {
    const storyTimers = currentProjects
      .filter((project) => project.stories?.length)
      .map((project) => setInterval(() => {
        setStoryIndices((prev) => {
          const total = project.stories?.length ?? 0;
          if (!total) return prev;
          const current = prev[project.id] ?? 0;
          return { ...prev, [project.id]: (current + 1) % total };
        });
      }, 5000));

    return () => {
      storyTimers.forEach((timer) => clearInterval(timer));
    };
  }, [currentProjects]);

  const handleStoryAdvance = (projectId: string, direction: 'prev' | 'next') => {
    const project = currentProjects.find((p) => p.id === projectId);
    if (!project?.stories?.length) return;
    setStoryIndices((prev) => {
      const total = project.stories?.length ?? 0;
      const current = prev[projectId] ?? 0;
      const delta = direction === 'next' ? 1 : -1;
      const nextIndex = (current + delta + total) % total;
      return { ...prev, [projectId]: nextIndex };
    });
  };

  const handleVideoAdvance = (projectId: string, direction: 'prev' | 'next') => {
    const project = currentProjects.find((p) => p.id === projectId);
    if (!project?.videoPlaylist?.length) return;
    setVideoIndices((prev) => {
      const total = project.videoPlaylist?.length ?? 0;
      const current = prev[projectId] ?? 0;
      const delta = direction === 'next' ? 1 : -1;
      const nextIndex = (current + delta + total) % total;
      return { ...prev, [projectId]: nextIndex };
    });
  };

  const HeartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const CommentIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

  const ShareIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );

  const BookmarkIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );

  const ChevronLeft = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  const ChevronRight = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  const ReelsIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );

  const renderPostHeader = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 12px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      flexShrink: 0,
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        padding: '2px',
      }}>
        <img
          src={instagramAvatar}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #000',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{instagramUser}</span>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Original audio</span>
      </div>
      <span style={{ marginLeft: 'auto', fontSize: '16px', color: '#fff', opacity: 0.7, letterSpacing: '1px' }}>⋯</span>
    </div>
  );

  const renderPostFooter = (title: string, totalStories: number, currentIndex: number) => (
    <div style={{ padding: '10px 12px', flexShrink: 0 }}>
      {totalStories > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
          marginBottom: '10px',
        }}>
          {Array.from({ length: totalStories }).map((_, i) => (
            <div key={i} style={{
              width: i === currentIndex ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === currentIndex ? '#0095f6' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '14px', marginBottom: '8px' }}>
        <HeartIcon />
        <CommentIcon />
        <ShareIcon />
        <div style={{ marginLeft: 'auto' }}>
          <BookmarkIcon />
        </div>
      </div>

      <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#fff', fontWeight: 600 }}>
        128 likes
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: '#fff', lineHeight: 1.4 }}>
        <span style={{ fontWeight: 600, marginRight: '6px' }}>{instagramUser}</span>
        <span style={{ opacity: 0.9 }}>{title}</span>
      </p>
      <p style={{ margin: '4px 0 0', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        2 hours ago
      </p>
    </div>
  );

  const renderPhoneMockup = (
    project: ProjectItem,
    index: number,
    isLink: boolean
  ) => {
    const activeStory = project.stories?.[storyIndices[project.id] ?? 0] ?? project.stories?.[0];
    const activeVideo = project.videoPlaylist
      ? project.videoPlaylist[videoIndices[project.id] ?? 0]
      : project.video;
    const hasStories = Boolean(project.stories?.length);
    const hasVideo = Boolean(activeVideo);
    const currentStoryIndex = storyIndices[project.id] ?? 0;
    const totalStories = project.stories?.length ?? 0;
    const isSingleVideo = !project.videoPlaylist || project.videoPlaylist.length <= 1;

    const phoneContent = (
      <div
        className="phone-mockup"
        style={{
          width: 'clamp(280px, 34vw, 340px)',
          background: '#000',
          borderRadius: '44px',
          padding: '12px 12px 16px 12px',
          boxShadow: '0 28px 72px rgba(0,0,0,0.4), 0 10px 28px rgba(0,0,0,0.3)',
          position: 'relative',
          transition: 'transform 0.3s ease',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '26px',
          background: '#000',
          borderRadius: '0 0 18px 18px',
          zIndex: 30,
        }} />

        {/* Botones laterales */}
        <div style={{ position: 'absolute', right: '-3px', top: '100px', width: '4px', height: '48px', background: '#1a1a1a', borderRadius: '0 2px 2px 0' }} />
        <div style={{ position: 'absolute', left: '-3px', top: '80px', width: '4px', height: '32px', background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: '-3px', top: '120px', width: '4px', height: '32px', background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />

        {/* Pantalla */}
        <div
          style={{
            width: '100%',
            aspectRatio: '9/18.5',
            background: '#000',
            borderRadius: '36px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {hasStories ? (
            <>
              {renderPostHeader()}

              <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
                <img
                  key={activeStory?.id}
                  src={activeStory?.image}
                  alt={activeStory?.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />

                {totalStories > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStoryAdvance(project.id, 'prev');
                      }}
                      style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        padding: 0,
                      }}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStoryAdvance(project.id, 'next');
                      }}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        padding: 0,
                      }}
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}

                {totalStories > 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#fff',
                    fontWeight: 600,
                    zIndex: 15,
                  }}>
                    {currentStoryIndex + 1} / {totalStories}
                  </div>
                )}
              </div>

              {renderPostFooter(activeStory?.title ?? '', totalStories, currentStoryIndex)}
            </>
          ) : hasVideo ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', padding: '12px', background: '#000', boxSizing: 'border-box' }}>
              {/* Header de Reels */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                padding: '12px 14px 40px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '24px 24px 0 0',
              }}>
                <ReelsIcon />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>Reels</span>
              </div>

              {/* Contenedor del video */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#0a0a0a',
              }}>
                <video
                  key={activeVideo}
                  src={activeVideo}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={(e) => {
                    if (isSingleVideo) {
                      const vid = e.currentTarget;
                      vid.currentTime = 0;
                      vid.play();
                    } else {
                      handleVideoAdvance(project.id, 'next');
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    background: '#0a0a0a',
                  }}
                />
              </div>

              {/* Zonas táctiles para navegación */}
              {project.videoPlaylist && project.videoPlaylist.length > 1 ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '40px',
                      height: '80px',
                      zIndex: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => handleVideoAdvance(project.id, 'prev')}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ChevronLeft />
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '40px',
                      height: '80px',
                      zIndex: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => handleVideoAdvance(project.id, 'next')}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ChevronRight />
                    </div>
                  </div>
                </>
              ) : null}

              {/* Indicadores de video */}
              {project.videoPlaylist && project.videoPlaylist.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '5px',
                  zIndex: 12,
                }}>
                  {project.videoPlaylist.map((_, i) => (
                    <div key={i} style={{
                      width: i === (videoIndices[project.id] ?? 0) ? '18px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === (videoIndices[project.id] ?? 0) ? '#fff' : 'rgba(255,255,255,0.35)',
                      transition: 'all 0.3s ease',
                    }} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Home bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              background: 'rgba(255,255,255,0.4)',
              borderRadius: '2px',
              zIndex: 20,
            }}
          />
        </div>

        {/* Reflejo de luz */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '16px',
            borderRadius: '36px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.03) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      </div>
    );

    const infoContent = (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3
          className="font-body"
          style={{
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
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
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--ink)',
            opacity: 0.55,
            marginBottom: '10px',
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
            {lang === 'es' ? 'Ver proyecto ->' : 'View project ->'}
          </p>
        )}
      </div>
    );

    const cardProps = {
      ref: (el: HTMLElement | null) => { cardsRef.current[index] = el; },
      style: {
        position: 'relative' as const,
        cursor: project.href ? 'pointer' : 'default',
        textDecoration: 'none',
        display: 'block',
      },
      onMouseEnter: (e: MouseEvent<HTMLElement>) => {
        const phone = e.currentTarget.querySelector('.phone-mockup');
        if (phone) {
          gsap.to(phone, { y: -8, rotateY: 5, duration: 0.4, ease: 'power2.out' });
        }
      },
      onMouseLeave: (e: MouseEvent<HTMLElement>) => {
        const phone = e.currentTarget.querySelector('.phone-mockup');
        if (phone) {
          gsap.to(phone, { y: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
        }
      },
    };

    if (isLink && project.href) {
      return (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          {...cardProps}
        >
          {phoneContent}
          {infoContent}
        </a>
      );
    }

    return (
      <div key={project.id} {...cardProps}>
        {phoneContent}
        {infoContent}
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="paper-texture"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(60px, 8vw, 100px) 4vw clamp(40px, 6vw, 80px)',
        backgroundColor: 'var(--cream)',
      }}
    >
      {/* Decoracion scrapbook */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="floating-heart" style={{ position: 'absolute', top: '10%', left: '6%', fontSize: 'clamp(16px, 2vw, 22px)', opacity: 0.25 }}>✦</div>
        <div className="floating-heart" style={{ position: 'absolute', top: '20%', right: '8%', fontSize: 'clamp(18px, 2.2vw, 26px)', opacity: 0.2, animationDelay: '0.6s' }}>◌</div>
        <div className="floating-heart" style={{ position: 'absolute', bottom: '15%', left: '4%', fontSize: 'clamp(20px, 2.5vw, 28px)', opacity: 0.22, animationDelay: '1.2s' }}>🌸</div>
        <div className="floating-heart" style={{ position: 'absolute', bottom: '25%', right: '6%', fontSize: 'clamp(14px, 1.6vw, 20px)', opacity: 0.18, animationDelay: '0.9s' }}>💫</div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            textAlign: 'center',
            color: 'var(--ink)',
            marginBottom: '16px',
            textShadow: '2px 2px 0px rgba(196, 120, 138, 0.1)',
          }}
        >
          {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
        </h2>

        <p
          className="font-body"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(12px, 1.3vw, 14px)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.65,
            marginBottom: '20px',
          }}
        >
          {lang === 'es' ? 'Proyectos reales destacados' : 'Featured real projects'}
        </p>

        <div
          ref={dividerRef}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '2px',
            backgroundColor: 'var(--pastel-pink)',
            opacity: 0.35,
            margin: '0 auto clamp(32px, 5vw, 56px)',
            borderRadius: '2px',
            transformOrigin: 'center',
          }}
        />

        {/* Grid de proyectos */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
            justifyItems: 'center',
          }}
        >
          {currentProjects.map((project, index) =>
            renderPhoneMockup(project, index, Boolean(project.href))
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .phone-mockup {
            width: clamp(280px, 75vw, 320px) !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
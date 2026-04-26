import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  lang: 'es' | 'en';
}

const content = {
  es: {
    title: 'ESCRIBIME',
    subtitle: 'Hagamos que tu marca se sienta viva.',
    namePlaceholder: 'Nombre',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Contame tu idea, proyecto o lo que quieras...',
    sendButton: 'Enviar mensaje',
    sending: 'Enviando...',
    successMessage: '¡Mensaje enviado!',
    errorMessage: 'Ups, algo salió mal. Intenta de nuevo!',
    emailLabel: 'mi email:',
    directContact: 'Contacto directo',
    ctaTitle: 'Contame tu idea y la bajamos a estrategia',
    ctaBody:
      'Brief, campaña, lanzamiento o marca personal: te respondo con una propuesta clara y accionable.',
    chips: ['Branding', 'Social Media', 'Estrategia'],
    thanks: '¡Gracias por escribirme!',
  },
  en: {
    title: 'WRITE TO ME',
    subtitle: "Let's make your brand feel alive.",
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Tell me your idea, project, or anything...',
    sendButton: 'Send message',
    sending: 'Sending...',
    successMessage: 'Message sent!',
    errorMessage: 'Oops, something went wrong. Try again!',
    emailLabel: 'my email:',
    directContact: 'Direct contact',
    ctaTitle: 'Share your idea and we shape the strategy',
    ctaBody:
      'Brief, campaign, launch, or personal brand: I will reply with a clear and actionable proposal.',
    chips: ['Branding', 'Social Media', 'Strategy'],
    thanks: 'Thanks for writing to me!',
  },
};

export default function Contact({ lang }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const t = content[lang];

  const launchConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#C4788A', '#E8B4C0', '#B8A9C9', '#A8C5A8', '#F5C6A5', '#FFD700'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#C4788A', '#E8B4C0', '#B8A9C9', '#A8C5A8', '#F5C6A5', '#FFD700'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    if (!heartsRef.current) return;
    const hearts = heartsRef.current.querySelectorAll('.floating-heart');
    hearts.forEach((heart, i) => {
      gsap.to(heart, {
        y: `-=${30 + Math.random() * 40}`,
        x: `+=${Math.sin(i) * 20}`,
        rotation: Math.random() * 20 - 10,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        envelopeRef.current,
        { opacity: 0, y: 80, rotateX: -15, scale: 0.9 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: envelopeRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.3,
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', delay: 0.6,
          scrollTrigger: { trigger: btnRef.current, start: 'top 95%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || sending) return;
    setSending(true);
    setErrorMessage('');
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let apiError = t.errorMessage;
        try {
          const data = (await response.json()) as { error?: string };
          if (data?.error) apiError = data.error;
        } catch { /* keep generic */ }
        throw new Error(apiError);
      }

      setSubmitted(true);
      launchConfetti();
      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { scale: 0.5, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
        );
      }
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : t.errorMessage;
      setErrorMessage(message);
      if (formRef.current) {
        const tl = gsap.timeline();
        tl.to(formRef.current, { x: -10, duration: 0.05 })
          .to(formRef.current, { x: 10, duration: 0.05 })
          .to(formRef.current, { x: -8, duration: 0.05 })
          .to(formRef.current, { x: 8, duration: 0.05 })
          .to(formRef.current, { x: -5, duration: 0.05 })
          .to(formRef.current, { x: 5, duration: 0.05 })
          .to(formRef.current, { x: 0, duration: 0.05 });
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="paper-texture"
      style={{
        position: 'relative',
        padding: 'clamp(44px, 7vw, 96px) 4vw',
        overflow: 'hidden',
        minHeight: '96vh',
        backgroundColor: 'var(--cream)',
      }}
    >
      {/* ===== DECORACIÓN SCRAPBOOK FLOTANTE ===== */}
      <div ref={heartsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="floating-heart" style={{ position: 'absolute', top: '8%', left: '5%', fontSize: 'clamp(18px, 2.4vw, 28px)', opacity: 0.36 }}>✦</div>
        <div className="floating-heart" style={{ position: 'absolute', top: '18%', right: '8%', fontSize: 'clamp(18px, 2.6vw, 30px)', opacity: 0.32, animationDelay: '0.5s' }}>◌</div>
        <div className="floating-heart" style={{ position: 'absolute', top: '52%', left: '3%', fontSize: 'clamp(16px, 2vw, 24px)', opacity: 0.28, animationDelay: '1s' }}>✧</div>
        <div className="floating-heart" style={{ position: 'absolute', bottom: '14%', right: '10%', fontSize: 'clamp(20px, 2.8vw, 32px)', opacity: 0.26, animationDelay: '1.2s' }}>✶</div>
        <div className="floating-heart" style={{ position: 'absolute', top: '30%', right: '4%', fontSize: 'clamp(24px, 3vw, 36px)', opacity: 0.22, animationDelay: '0.8s' }}>🌸</div>
        <div className="floating-heart" style={{ position: 'absolute', bottom: '30%', left: '8%', fontSize: 'clamp(20px, 2.5vw, 28px)', opacity: 0.24, animationDelay: '1.5s' }}>💫</div>
      </div>

      {/* ===== POST-IT CON EMAIL ===== */}
      <div
        className="post-it font-handwritten contact-postit"
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3vw, 40px)',
          right: 'clamp(12px, 3vw, 44px)',
          padding: 'clamp(10px, 1.8vw, 16px) clamp(14px, 2.5vw, 22px)',
          zIndex: 10,
          cursor: 'pointer',
          transform: 'rotate(2deg)',
          background: '#fff9c4',
          boxShadow: '3px 3px 0 rgba(61,43,31,0.12)',
        }}
      >
        <p style={{ margin: 0, fontSize: 'clamp(11px, 1.4vw, 14px)', color: 'var(--ink)', lineHeight: 1.4 }}>
          <span style={{ opacity: 0.6 }}>{t.emailLabel}</span>
          <br />
          <strong>mariasolgoldenberg8@gmail.com</strong>
        </p>
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* ===== TÍTULO ===== */}
        <h2
          ref={titleRef}
          className="font-display contact-title"
          style={{
            fontSize: 'clamp(42px, 7.5vw, 88px)',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: '12px',
            letterSpacing: '2px',
            lineHeight: 1.1,
            textAlign: 'center',
            textShadow: '3px 3px 0px rgba(196, 120, 138, 0.15)',
          }}
        >
          {t.title}
        </h2>

        <p
          ref={subtitleRef}
          className="font-body"
          style={{
            maxWidth: '700px',
            margin: '0 auto clamp(28px, 3.5vw, 40px)',
            textAlign: 'center',
            fontSize: 'clamp(14px, 1.7vw, 18px)',
            lineHeight: 1.7,
            color: 'var(--ink)',
            opacity: 0.82,
            letterSpacing: '0.3px',
          }}
        >
          {t.subtitle}
        </p>

        {/* ===== CONTENEDOR PRINCIPAL ===== */}
        <div
          ref={envelopeRef}
          style={{ position: 'relative', margin: '0 auto', maxWidth: '1040px' }}
        >
          

          {/* WASHI TAPE */}
          <div
            className="washi-tape"
            style={{
              position: 'absolute',
              top: '-9px',
              left: '15%',
              right: '15%',
              zIndex: 15,
            }}
          />

          {/* ===== TARJETA PRINCIPAL ===== */}
          <div
            className="contact-card"
            style={{
              background: '#FDF8F0',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 44px)',
              boxShadow:
                '0 18px 52px rgba(61, 43, 31, 0.12), 0 2px 12px rgba(61, 43, 31, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '2px dashed rgba(61, 43, 31, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 0.9fr) minmax(0, 1.1fr)',
              gap: 'clamp(18px, 3.4vw, 40px)',
            }}
          >
            {/* ESQUINAS DECORATIVAS */}
            <div className="animate-sparkle" style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '18px', opacity: 0.35 }}>✦</div>
            <div className="animate-sparkle" style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '18px', opacity: 0.35, animationDelay: '0.6s' }}>✦</div>
            <div className="animate-sparkle" style={{ position: 'absolute', bottom: '14px', left: '14px', fontSize: '18px', opacity: 0.35, animationDelay: '1.2s' }}>✦</div>
            <div className="animate-sparkle" style={{ position: 'absolute', bottom: '14px', right: '14px', fontSize: '18px', opacity: 0.35, animationDelay: '1.8s' }}>✦</div>

            {/* ===== COLUMNA IZQUIERDA: CTA ===== */}
            <div
              className="contact-cta-col"
              style={{
                borderRadius: '18px',
                background: '#FFF5F7',
                border: '2px solid rgba(196, 120, 138, 0.18)',
                padding: 'clamp(18px, 2.6vw, 26px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* SELLO DECORATIVO */}
              <div
                className="contact-seal"
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: 'clamp(44px, 5vw, 60px)',
                  height: 'clamp(44px, 5vw, 60px)',
                  borderRadius: '50%',
                  background: 'var(--rose)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(196, 120, 138, 0.35)',
                  transform: 'rotate(12deg)',
                }}
              >
                <span style={{ fontSize: 'clamp(18px, 2.2vw, 26px)' }}>📩</span>
              </div>

              <p
                className="font-body"
                style={{
                  margin: '0 0 10px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'var(--rose)',
                  fontWeight: 600,
                }}
              >
                {t.directContact}
              </p>
              <h3
                className="font-display"
                style={{
                  margin: '0 0 14px',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  lineHeight: 1.2,
                  color: 'var(--ink)',
                }}
              >
                {t.ctaTitle}
              </h3>
              <p
                className="font-body"
                style={{
                  margin: '0 0 20px',
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  lineHeight: 1.7,
                  color: 'var(--ink)',
                  opacity: 0.75,
                }}
              >
                {t.ctaBody}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {t.chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-body"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: '1.5px solid rgba(196, 120, 138, 0.25)',
                      background: '#fff',
                      color: 'var(--rose)',
                      fontWeight: 600,
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* ===== COLUMNA DERECHA: FORMULARIO ===== */}
            <div className="contact-form-col" style={{ position: 'relative' }}>
              {submitted ? (
                <div
                  ref={successRef}
                  className="contact-success"
                  style={{
                    background: '#FDF8F0',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '420px',
                    padding: '24px',
                    border: '2px dashed rgba(61, 43, 31, 0.1)',
                  }}
                >
                  <div style={{ fontSize: 'clamp(48px, 7vw, 72px)', marginBottom: '12px' }}>💌</div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(28px, 4vw, 42px)',
                      color: 'var(--rose)',
                      marginBottom: '6px',
                      fontWeight: 700,
                    }}
                  >
                    {t.successMessage}
                  </h3>
                  <p className="font-caveat" style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--ink)', opacity: 0.7 }}>
                    {t.thanks}
                  </p>
                  <img
                    src="/images/wax-seal.png"
                    alt=""
                    style={{
                      width: 'clamp(60px, 10vw, 90px)',
                      marginTop: '18px',
                      filter: 'drop-shadow(2px 4px 8px rgba(196,120,138,0.3))',
                    }}
                    className="animate-stamp"
                  />
                </div>
              ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ position: 'relative' }}>
                {/* NOMBRE + EMAIL */}
                <div
                  className="form-field"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'clamp(12px, 2vw, 16px)',
                    marginBottom: 'clamp(12px, 2vw, 16px)',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '15px',
                        opacity: 0.5,
                        pointerEvents: 'none',
                      }}
                    >
                      ✎
                    </span>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      required
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-body"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 42px',
                        fontSize: 'clamp(13px, 1.5vw, 15px)',
                        borderRadius: '14px',
                        border: '2px solid rgba(61, 43, 31, 0.1)',
                        backgroundColor: '#fff',
                        color: 'var(--ink)',
                        outline: 'none',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(196, 120, 138, 0.45)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(196, 120, 138, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(61, 43, 31, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '15px',
                        opacity: 0.5,
                        pointerEvents: 'none',
                      }}
                    >
                      @
                    </span>
                    <input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      required
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-body"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 42px',
                        fontSize: 'clamp(13px, 1.5vw, 15px)',
                        borderRadius: '14px',
                        border: '2px solid rgba(61, 43, 31, 0.1)',
                        backgroundColor: '#fff',
                        color: 'var(--ink)',
                        outline: 'none',
                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(196, 120, 138, 0.45)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(196, 120, 138, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(61, 43, 31, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* MENSAJE */}
                <div className="form-field" style={{ position: 'relative', marginBottom: 'clamp(16px, 3vw, 22px)' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '16px',
                      fontSize: '15px',
                      opacity: 0.5,
                      pointerEvents: 'none',
                    }}
                  >
                    ✉
                  </span>
                  <textarea
                    placeholder={t.messagePlaceholder}
                    value={formData.message}
                    required
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="font-body"
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 42px',
                      fontSize: 'clamp(13px, 1.5vw, 15px)',
                      borderRadius: '14px',
                      border: '2px solid rgba(61, 43, 31, 0.1)',
                      backgroundColor: '#fff',
                      color: 'var(--ink)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                      lineHeight: 1.6,
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(196, 120, 138, 0.45)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(196, 120, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(61, 43, 31, 0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* ERROR */}
                {errorMessage && (
                  <div
                    className="form-field animate-shake"
                    style={{
                      marginBottom: '16px',
                      padding: '12px 16px',
                      backgroundColor: '#FFF0F3',
                      borderRadius: '12px',
                      border: '2px solid rgba(196, 120, 138, 0.25)',
                    }}
                  >
                    <p className="font-body" style={{ margin: 0, color: 'var(--rose-dark)', fontSize: 'clamp(12px, 1.4vw, 14px)', fontWeight: 500 }}>
                      ⚠️ {errorMessage}
                    </p>
                  </div>
                )}

                {/* ===== BOTÓN DE ENVÍO ===== */}
                <div className="form-field" style={{ textAlign: 'center', position: 'relative' }}>
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={sending}
                    className="font-body"
                    style={{
                      padding: 'clamp(16px, 2.6vw, 20px) clamp(40px, 7vw, 64px)',
                      fontSize: 'clamp(14px, 1.8vw, 17px)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2.5px',
                      background: '#C4788A',
                      color: '#fff',
                      border: '3px solid #A85D6F',
                      borderRadius: '16px',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 0 #A85D6F, 0 10px 24px rgba(168, 93, 111, 0.35)',
                      position: 'relative',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                    }}
                    onMouseDown={(e) => {
                      if (!sending) {
                        e.currentTarget.style.transform = 'translateY(4px)';
                        e.currentTarget.style.boxShadow = '0 2px 0 #A85D6F, 0 4px 12px rgba(168, 93, 111, 0.35)';
                      }
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 0 #A85D6F, 0 10px 24px rgba(168, 93, 111, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 0 #A85D6F, 0 10px 24px rgba(168, 93, 111, 0.35)';
                    }}
                  >
                    {sending ? (
                      <>
                        <span style={{ display: 'inline-block', animation: 'spin 1.2s linear infinite' }}>💫</span>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '1.3em' }}>💌</span>
                        {t.sendButton}
                      </>
                    )}
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>

          {/* SOMBRA BAJO LA TARJETA */}
          <div
            style={{
              position: 'absolute',
              bottom: '-14px',
              left: '5%',
              right: '5%',
              height: '28px',
              background: 'rgba(61, 43, 31, 0.08)',
              filter: 'blur(14px)',
              borderRadius: '50%',
              zIndex: -1,
            }}
          />
        </div>
      </div>

      {/* ===== CSS RESPONSIVE ===== */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* MOBILE: hasta 768px */
        @media (max-width: 768px) {
          .contact-postit {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            margin: 0 auto 20px !important;
            width: fit-content !important;
            transform: rotate(-1deg) !important;
          }
          .contact-title {
            margin-top: 8px !important;
          }
          .contact-clothespin,
          .contact-envelope-float {
            display: none !important;
          }
          .contact-card {
            grid-template-columns: 1fr !important;
            padding: 20px 16px !important;
          }
          .contact-cta-col {
            order: -1;
          }
          .contact-seal {
            top: -10px !important;
            right: -6px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .contact-seal span {
            font-size: 18px !important;
          }
          .contact-success {
            min-height: 300px !important;
          }
        }

        /* TABLET: 769px - 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-card {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
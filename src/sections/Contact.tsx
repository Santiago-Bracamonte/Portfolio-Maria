import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  lang: 'es' | 'en';
}

export default function Contact({ lang }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        emailRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: emailRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || sending) {
      return;
    }

    setSending(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || 'Failed to send message');
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage(
        lang === 'es'
          ? 'No se pudo enviar el mensaje. Intenta nuevamente.'
          : 'Message could not be sent. Please try again.'
      );
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-overlay"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(14px, 3vw, 28px) 4vw clamp(38px, 7vw, 74px)',
      }}
    >
      {/* Cerebro pensando en colaborar */}
      <img
        src="/images/brain.png"
        alt=""
        aria-hidden="true"
        className="contact-brain"
        style={{
          position: 'absolute',
          width: 'clamp(60px, 10vw, 130px)',
          top: 'clamp(40px, 8vw, 100px)',
          left: 'clamp(5px, 3vw, 40px)',
          transform: 'rotate(-8deg)',
          filter: 'drop-shadow(0 8px 16px rgba(212, 132, 156, 0.2))',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.8,
        }}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            color: 'var(--ink)',
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          {lang === 'es' ? 'CONTACTO' : 'CONTACT'}
        </h2>

        <div
          ref={dividerRef}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            backgroundColor: 'var(--ink)',
            opacity: 0.2,
            margin: '0 auto clamp(28px, 5vw, 44px)',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
          }}
        />

        <a
          ref={emailRef}
          href="mailto:mariasolgoldenberg8@gmail.com"
          className="font-body"
          style={{
            display: 'block',
            fontSize: 'clamp(20px, 2vw, 32px)',
            fontWeight: 500,
            color: 'var(--rose)',
            textDecoration: 'none',
            marginBottom: '48px',
            opacity: 0,
          }}
        >
          mariasolgoldenberg8@gmail.com
        </a>

        {/* Contact form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '32px', position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <input
              type="text"
              placeholder={lang === 'es' ? 'Nombre' : 'Name'}
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="font-body"
              style={{
                padding: '14px 18px',
                fontSize: '13px',
                border: '1px solid rgba(61, 43, 31, 0.15)',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                color: 'var(--ink)',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="font-body"
              style={{
                padding: '14px 18px',
                fontSize: '13px',
                border: '1px solid rgba(61, 43, 31, 0.15)',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                color: 'var(--ink)',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>
          <textarea
            placeholder={lang === 'es' ? 'Mensaje' : 'Message'}
            value={formData.message}
            required
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="font-body"
            style={{
              width: '100%',
              padding: '14px 18px',
              fontSize: '13px',
              border: '1px solid rgba(61, 43, 31, 0.15)',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.6)',
              color: 'var(--ink)',
              outline: 'none',
              resize: 'vertical',
              marginBottom: '20px',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          {errorMessage && (
            <p
              className="font-body"
              style={{
                marginBottom: '16px',
                color: '#A13E4E',
                fontSize: '12px',
                letterSpacing: '0.2px',
              }}
            >
              {errorMessage}
            </p>
          )}
          
          {/* Beso como sello de cariño */}
          <img
            src="/images/kiss.png"
            alt=""
            aria-hidden="true"
            className="contact-kiss"
            style={{
              position: 'absolute',
              width: 'clamp(35px, 5vw, 60px)',
              bottom: 'clamp(50px, 9vw, 100px)',
              right: 'clamp(50px, 10vw, 70px)',
              transform: 'rotate(15deg) translateY(-30px)',
              filter: 'drop-shadow(0 4px 8px rgba(107, 78, 61, 0.2))',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.7,
            }}
          />
          
          <button
            ref={btnRef}
            type="submit"
            disabled={sending}
            className="font-body"
            style={{
              padding: '14px 36px',
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              backgroundColor: 'var(--warm-gray)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: '6px',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#dcd5cc';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--warm-gray)';
            }}
          >
            {sending
              ? lang === 'es'
                ? 'Enviando...'
                : 'Sending...'
              : submitted
              ? lang === 'es'
                ? '¡Mensaje enviado!'
                : 'Message sent!'
              : lang === 'es'
                ? 'Enviar mensaje'
                : 'Send message'}
          </button>
        </form>
      </div>
      
    </section>
  );
}